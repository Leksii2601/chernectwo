import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  if (payload && req) console.log('Up')
  try {
      // payload usually snake_cases fields. 'channelID' -> 'channel_i_d' or 'channel_id' depending on strategy.
      // Based on previous 'thumbnail_u_r_l', it seems capital letters trigger underscores.
      // Let's assume 'channelID' -> 'channel_i_d'
      await db.run(sql`ALTER TABLE \`live_stream\` ADD COLUMN \`channel_i_d\` text DEFAULT 'UC...';`);
  } catch (e) {
      // Ignore if exists
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  if (payload && req) console.log('Down')
  try {
    await db.run(sql`ALTER TABLE \`live_stream\` DROP COLUMN \`channel_i_d\`;`);
  } catch (e) {
      // Ignore
  }
}
