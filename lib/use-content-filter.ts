'use client'

import { useState } from 'react'

interface UseContentFilterOptions<T> {
  /** Which field on each item to build tabs from. Defaults to 'tags'. */
  filterKey?: keyof T
  /** Override the derived tab list entirely (e.g. a fixed category set). */
  extraTabs?: string[]
}

interface UseContentFilterResult<T> {
  tabs: string[]
  activeTab: string
  setActiveTab: (tab: string) => void
  filtered: T[]
}

export function useContentFilter<T extends object>(
  items: T[],
  options: UseContentFilterOptions<T> = {}
): UseContentFilterResult<T> {
  const key = (options.filterKey ?? 'tags') as string

  const getField = (item: T): string[] => {
    const val = (item as Record<string, unknown>)[key]
    return Array.isArray(val) ? (val as string[]) : []
  }

  const derivedTabs = Array.from(new Set(items.flatMap(getField)))
  const tabs = ['All', ...(options.extraTabs ?? derivedTabs)]
  const [activeTab, setActiveTab] = useState('All')

  const filtered = items.filter((item) =>
    activeTab === 'All' || getField(item).includes(activeTab)
  )

  return { tabs, activeTab, setActiveTab, filtered }
}
