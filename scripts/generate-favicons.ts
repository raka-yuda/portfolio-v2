import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const source = path.join(process.cwd(), 'app', 'favicon.png')
const outDir = path.join(process.cwd(), 'public')

async function main() {
  if (!fs.existsSync(source)) {
    console.error('Source favicon.png not found at app/favicon.png')
    process.exit(1)
  }

  await sharp(source).resize(48, 48).toFile(path.join(outDir, 'favicon-48x48.png'))
  await sharp(source).resize(96, 96).toFile(path.join(outDir, 'favicon-96x96.png'))
  await sharp(source).resize(180, 180).toFile(path.join(outDir, 'apple-touch-icon.png'))

  const tmp = path.join(outDir, 'favicon-180-tmp.png')
  await sharp(source).resize(180, 180).toFile(tmp)
  const icoBuf = await pngToIco([tmp])
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuf)
  fs.unlinkSync(tmp)

  console.log('Generated favicon assets from app/favicon.png:')
  console.log('  - public/favicon.ico')
  console.log('  - public/favicon-48x48.png')
  console.log('  - public/favicon-96x96.png')
  console.log('  - public/apple-touch-icon.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
