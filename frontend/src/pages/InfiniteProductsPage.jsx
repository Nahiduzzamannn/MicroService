import CacheInfo from '../components/CacheInfo'
import ProductGrid from '../components/ProductGrid'
import { ErrorMessage, Loader } from '../components/StatusMessage'
import { useProductFeedInfiniteQuery } from '../features/products/productsApi'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

const FEED_PAGE_SIZE = 12

export default function InfiniteProductsPage() {
  const { data, error, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, fulfilledTimeStamp, refetch } =
    useProductFeedInfiniteQuery(FEED_PAGE_SIZE)

  const sentinelRef = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  })

  if (isLoading) return <Loader />
  if (error && !data) return <ErrorMessage error={error} onRetry={refetch} />

  // data.pages holds every page fetched so far; flatten them into one list.
  const products = data.pages.flatMap((page) => page.content)
  const total = data.pages[0]?.totalElements ?? 0

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p className="muted">
            Showing {products.length} of {total} products · {data.pages.length} page(s) loaded
          </p>
        </div>
        <CacheInfo fulfilledTimeStamp={fulfilledTimeStamp} isFetching={isFetching} />
      </div>

      <ProductGrid products={products} />

      <div ref={sentinelRef} className="sentinel">
        {isFetchingNextPage && <Loader text="Loading more…" />}
        {error && data && <ErrorMessage error={error} onRetry={fetchNextPage} />}
        {!hasNextPage && <p className="muted">You've reached the end 🎉</p>}
      </div>
    </section>
  )
}
