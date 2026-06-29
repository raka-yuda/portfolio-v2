'use client'

import { Blurhash } from 'react-blurhash'

export function BlurhashCanvas({ hash }: { hash: string }) {
  return (
    <Blurhash
      hash={hash}
      width={32}
      height={32}
      resolutionX={32}
      resolutionY={32}
      punch={1}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
