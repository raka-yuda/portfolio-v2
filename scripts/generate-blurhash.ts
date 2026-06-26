import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { loadBlurhash } from '../lib/blurhash'

const contentDir = path.join(process.cwd(), 'content')

type ContentType = 'project' | 'blog'

interface Args {
  force: boolean
  skipExisting: boolean
  content: ContentType[]
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    force: false,
    skipExisting: true,
    content: ['project', 'blog'],
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--force' || arg === '-f') {
      args.force = true
      args.skipExisting = false
    } else if (arg === '--skip-existing' || arg === '-s') {
      args.skipExisting = true
    } else if ((arg === '--content' || arg === '-c') && argv[i + 1]) {
      const value = argv[++i]
      if (value === 'all') {
        args.content = ['project', 'blog']
      } else if (value === 'project' || value === 'blog') {
        args.content = [value]
      } else {
        console.error(`Unknown content type: ${value}`)
        process.exit(1)
      }
    }
  }

  return args
}

function getFileSlugs(folder: string): string[] {
  const dir = path.join(contentDir, folder)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', ''))
}

async function generateForFolder(folder: ContentType, args: Args) {
  const slugs = getFileSlugs(folder)
  let generated = 0
  let skipped = 0
  let failed = 0

  for (const slug of slugs) {
    const filePath = path.join(contentDir, folder, `${slug}.mdx`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = matter(raw)
    const data = parsed.data as Record<string, unknown>
    const image = data.image as string | undefined

    if (!image) {
      console.log(`[${folder}/${slug}] skipped — no image`)
      skipped++
      continue
    }

    if (args.skipExisting && data.blurhash && !args.force) {
      console.log(`[${folder}/${slug}] skipped — blurhash already exists`)
      skipped++
      continue
    }

    const hash = await loadBlurhash(image)
    if (!hash) {
      console.error(`[${folder}/${slug}] failed — could not generate blurhash`)
      failed++
      continue
    }

    data.blurhash = hash
    const output = matter.stringify(parsed.content, data)
    fs.writeFileSync(filePath, output)
    console.log(`[${folder}/${slug}] generated blurhash`)
    generated++
  }

  console.log(`\n${folder}: ${generated} generated, ${skipped} skipped, ${failed} failed`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  console.log(`Running blurhash generator (force=${args.force}, content=${args.content.join(',')})\n`)

  for (const folder of args.content) {
    await generateForFolder(folder, args)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
