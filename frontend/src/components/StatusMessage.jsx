export function Loader({ text = 'Loading…' }) {
  return <div className="status">{text}</div>
}

export function ErrorMessage({ error, onRetry }) {
  const detail = error?.status ? `HTTP ${error.status}` : error?.error || 'Unknown error'
  return (
    <div className="status error">
      <p>Could not load products ({detail}). Is the API Gateway running on port 8080?</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  )
}
