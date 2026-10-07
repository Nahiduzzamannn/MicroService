// Shows when the data on screen was fetched from the server.
// If the time doesn't change after navigating back, the data came from the cache.
export default function CacheInfo({ fulfilledTimeStamp, isFetching }) {
  if (isFetching) return <span className="cache-info fetching">Fetching from server…</span>
  if (!fulfilledTimeStamp) return null

  const time = new Date(fulfilledTimeStamp).toLocaleTimeString()
  return <span className="cache-info">Fetched at {time} · cached for 5 min</span>
}
