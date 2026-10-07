import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="status">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <Link to="/">Go to products</Link>
    </div>
  )
}
