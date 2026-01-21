import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // We try to add columns. If they exist, it might fail, but since we know they don't...
  // SQLite doesn't support IF NOT EXISTS for ADD COLUMN easily in one statement.
  
  // We will run these one by one. If live_stream table doesn't exist, we create it.
  // If it exists, we add columns.
  
  // However, simpler approach for this "fix" migration:
  // Just add the missing columns.

  if(payload && req) {
      console.log('Migration context loaded')
  }
  
  try {
      await db.run(sql`ALTER TABLE \`live_stream\` ADD COLUMN \`planned_event_start_time\` text;`);
  } catch (e) {
      // Ignore if column exists
  }

  
  try {
      await db.run(sql`ALTER TABLE \`live_stream\` ADD COLUMN \`planned_event_end_time\` text;`);
  } catch (e) {
      // Ignore
  }

  try {
      await db.run(sql`ALTER TABLE \`live_stream\` ADD COLUMN \`sunday_start_time\` text DEFAULT '09:30';`);
  } catch (e) {
      // Ignore
  }

  try {
      await db.run(sql`ALTER TABLE \`live_stream\` ADD COLUMN \`sunday_end_time\` text DEFAULT '12:30';`);
  } catch (e) {
      // Ignore
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // SQLite doesn't support DROP COLUMN in older versions, and often requires table recreation.
  // For dev environment fix, we can skip complex down migration or just leave columns.
  // But strictly:

  if(payload && req) {
    console.log('Migration down context loaded')
  }

  try {
    await db.run(sql`ALTER TABLE \`live_stream\` DROP COLUMN \`planned_event_start_time\`;`);
    await db.run(sql`ALTER TABLE \`live_stream\` DROP COLUMN \`planned_event_end_time\`;`);
    await db.run(sql`ALTER TABLE \`live_stream\` DROP COLUMN \`sunday_start_time\`;`);
    await db.run(sql`ALTER TABLE \`live_stream\` DROP COLUMN \`sunday_end_time\`;`);
  } catch (e) {
      // Ignore
  }
}
