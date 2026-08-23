/* AUTO-GENERATED from oxc docs — rule eslint/no-await-in-loop. Do not edit. */

async function bad() {
    for (const user of users) {
      const userRecord = await getUserRecord(user);
    }
}
