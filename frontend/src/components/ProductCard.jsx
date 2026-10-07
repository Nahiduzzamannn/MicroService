import { Link } from 'react-router-dom'
import { usePrefetch } from '../features/products/productsApi'
import { formatPrice } from '../utils/format'

export default function ProductCard({ product }) {
  // Hovering a card warms the cache, so the detail page opens instantly.
  const prefetchProduct = usePrefetch('getProductById')

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card"
      onMouseEnter={() => prefetchProduct(product.id)}
    >
      <img src={product.imageUrl} alt={product.name} loading="lazy" />
      <div className="product-card-body">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
