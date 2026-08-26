export default {
  extends: 'semantic-release-monorepo',

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],

  preset: 'angular',
};
