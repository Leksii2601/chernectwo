import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  if (payload && req) console.log('Up')
  await db.run(sql`CREATE TABLE \`prayer_requests_names\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`prayer_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`prayer_requests_names_order_idx\` ON \`prayer_requests_names\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`prayer_requests_names_parent_id_idx\` ON \`prayer_requests_names\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`prayer_requests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`service\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`amount\` numeric,
  	\`status\` text DEFAULT 'pending',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`prayer_requests_updated_at_idx\` ON \`prayer_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`prayer_requests_created_at_idx\` ON \`prayer_requests\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`prayer_requests_id\` integer REFERENCES prayer_requests(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_prayer_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`prayer_requests_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  if (payload && req) console.log('Down')
  await db.run(sql`DROP TABLE \`prayer_requests_names\`;`)
  await db.run(sql`DROP TABLE \`prayer_requests\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`news_id\` integer,
  	\`missionary_projects_id\` integer,
  	\`photo_reports_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`missionary_projects_id\`) REFERENCES \`missionary_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`photo_reports_id\`) REFERENCES \`photo_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "news_id", "missionary_projects_id", "photo_reports_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "news_id", "missionary_projects_id", "photo_reports_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_missionary_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`missionary_projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_photo_reports_id_idx\` ON \`payload_locked_documents_rels\` (\`photo_reports_id\`);`)
}
