import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import dotenv from 'dotenv'
import { resendAdapter } from '@payloadcms/email-resend'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { MissionaryProjects } from './collections/MissionaryProjects'
import { PhotoReports } from './collections/PhotoReports'
import { PrayerRequests } from './collections/PrayerRequests'
import { JoinRequests } from './collections/JoinRequests'
import { Questions } from './collections/Questions'
import { LiveStream } from './globals/LiveStream'
// import { PrintPrayersLink } from './components/admin/PrintPrayersLink'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, '../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    /* components: {
        afterNavLinks: [
            PrintPrayersLink
        ]
    } */
  },
  collections: [Users, Media, News, MissionaryProjects, PhotoReports, PrayerRequests, JoinRequests, Questions],
  globals: [LiveStream],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: 'onboarding@resend.dev',
    defaultFromName: 'Monastery Admin',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: [],
})
