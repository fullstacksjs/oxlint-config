import { execFile, execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { wrapStep } from 'semantic-release-plugin-decorators';

const exec = promisify(execFile);

const toPosix = (p) => p.split(path.sep).join('/');

const git = async (args, cwd) => {
  const { stdout } = await exec('git', args, { cwd });
  return stdout.trim();
};

/** Files touched by a commit, memoized since every step re-filters the same list. */
const commitFilesCache = new Map();
const getCommitFiles = (hash, cwd) => {
  if (!commitFilesCache.has(hash)) {
    commitFilesCache.set(
      hash,
      git(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', hash], cwd).then((stdout) => stdout.split('\n').filter(Boolean)),
    );
  }
  return commitFilesCache.get(hash);
};

const isUnder = (file, dir) => file === dir || file.startsWith(`${dir}/`);

/**
 * Keep only the commits that touched one of `paths`, so each package releases
 * on its own changes instead of on every commit in the repository.
 */
const onlyRelevantCommits = async (commits, paths, cwd) => {
  const withFiles = await Promise.all(commits.map(async (commit) => [commit, await getCommitFiles(commit.hash, cwd)]));

  return withFiles
    .filter(([, files]) => files.some((file) => paths.some((dir) => isUnder(toPosix(path.normalize(file)), dir))))
    .map(([commit]) => commit);
};

const withRelevantCommits = (paths, name) => (step) => async (pluginConfig, context) => {
  const commits = await onlyRelevantCommits(context.commits, paths, context.cwd);
  context.logger.log('Found %s commits for package %s since last release', commits.length, name);
  return step(pluginConfig, { ...context, commits });
};

/**
 * Release notes and issue comments all land in the same repository, so the
 * version heading has to be namespaced the same way the git tag is.
 */
const withNamespacedVersion = (toTag) => (step) => async (pluginConfig, context) => {
  if (!context.nextRelease?.version) return step(pluginConfig, context);

  return step(pluginConfig, {
    ...context,
    nextRelease: { ...context.nextRelease, version: toTag(context.nextRelease.version) },
  });
};

/**
 * @param {object} [options]
 * @param {string[]} [options.dependsOn]
 *   Extra repository-relative directories whose changes should also release this
 *   package. Use it for packages that are bundled into this one at build time:
 *   their changes ship inside this package's `dist`, but they live outside the
 *   package directory so they would otherwise never trigger a release here.
 */
export function defineReleaseConfig({ dependsOn = [] } = {}) {
  const cwd = process.cwd();
  const gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8' }).trim();
  const packageDir = toPosix(path.relative(gitRoot, cwd));
  const { name } = JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf8'));

  const paths = [packageDir, ...dependsOn];
  const toTag = (version) => `${name}-v${version}`;
  const wrap = (stepName, ...wrappers) =>
    wrapStep(stepName, (step) => wrappers.reduceRight((acc, wrapper) => wrapper(acc), step), {
      wrapperName: '@fullstacksjs/release',
    });

  const relevantCommits = withRelevantCommits(paths, name);
  const namespacedVersion = withNamespacedVersion(toTag);

  return {
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/npm',
      '@semantic-release/github',
    ],

    preset: 'angular',
    tagFormat: toTag('${version}'),

    analyzeCommits: wrap('analyzeCommits', relevantCommits),
    generateNotes: wrap('generateNotes', relevantCommits, namespacedVersion),
    success: wrap('success', relevantCommits, namespacedVersion),
    fail: wrap('fail', relevantCommits, namespacedVersion),
  };
}
