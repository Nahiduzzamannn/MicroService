import { useEffect, useRef } from 'react'

/**
 * Calls onLoadMore when the returned ref'd element scrolls into view.
 * Attach the ref to a "sentinel" div placed after the last item.
 */
export function useInfiniteScroll({ onLoadMore, enabled, rootMargin = '300px' }) {
  const sentinelRef = useRef(null)
  const onLoadMoreRef = useRef(onLoadMore)

  // Keep the latest callback without re-creating the observer.
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore
  }, [onLoadMore])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMoreRef.current()
      },
      { rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, rootMargin])

  return sentinelRef
}
