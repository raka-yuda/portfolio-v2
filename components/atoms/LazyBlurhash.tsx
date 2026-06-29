'use client'

import dynamic from 'next/dynamic'

const BlurhashCanvas = dynamic(() => import('./BlurhashCanvas').then(m => m.BlurhashCanvas), { ssr: false })

export function LazyBlurhash({ hash }: { hash: string }) {
  return <BlurhashCanvas hash={hash} />
}
