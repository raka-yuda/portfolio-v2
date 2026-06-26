import { encode } from 'blurhash'
import sharp from 'sharp'

export async function loadBlurhash(src: string): Promise<string | undefined> {
  try {
    const res = await fetch(src, { next: { revalidate: false } })
    if (!res.ok) return undefined
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data, info } = await sharp(buffer)
      .resize(32, 32, { fit: 'cover', position: 'center' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const clamped = new Uint8ClampedArray(data)
    return encode(clamped, info.width, info.height, 4, 4)
  } catch {
    return undefined
  }
}
