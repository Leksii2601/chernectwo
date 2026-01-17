const fs = require('fs')
const path = require('path')

const files = [
  'src/components/social/SocialProjectsFeed.tsx',
  'src/components/landing/Hero.tsx',
  'src/components/landing/SocialInitiatives.tsx',
  'src/utils/serializeRichText.tsx',
  'src/components/news/NewsGallery.tsx',
  'src/components/news/NewsFeed.tsx',
  'src/components/PageHeader.tsx',
  'src/components/landing/Footer.tsx',
  'src/app/(frontend)/header-variations/page.tsx',
  'src/app/(frontend)/join/page.tsx',
  'src/app/(frontend)/donate/page.tsx',
  'src/app/(frontend)/search/page.tsx',
  'src/app/(frontend)/news/[id]/page.tsx',
  'src/components/news/NewsSearch.tsx', // checking if I missed any
]

const workspaceRoot = 'd:/monastery_test/my-monastery-test/'

files.forEach((file) => {
  const fullPath = path.join(workspaceRoot, file)
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8')
    if (content.includes('font-molodo')) {
      const newContent = content.replace(/font-molodo/g, 'font-montserrat')
      fs.writeFileSync(fullPath, newContent, 'utf8')
      console.log(`Updated ${file}`)
    } else {
      console.log(`No font-molodo found in ${file}`)
    }
  } else {
    console.log(`File not found: ${fullPath}`)
  }
})
