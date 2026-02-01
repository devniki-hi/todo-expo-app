import { type SQLiteDatabase } from "expo-sqlite";
async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  if (result === undefined) {
    return;
  }
  let currentDbVersion = result ? result.user_version : 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL);
        `);
    await db.runAsync(
      "INSERT INTO todos (title, content) VALUES (?, ?)",
      "hello",
      "This is the first todo item",
    );
    await db.runAsync(
      "INSERT INTO todos (title, content) VALUES (?, ?)",
      "world",
      "This is the second todo item",
    );
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
export { migrateDbIfNeeded };
