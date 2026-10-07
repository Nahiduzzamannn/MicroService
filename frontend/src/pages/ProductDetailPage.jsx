import { Link, useNavigate, useParams } from 'react-router-dom'
import CacheInfo from '../components/CacheInfo'
import { ErrorMessage, Loader } from '../components/StatusMessage'
import { useGetProductByIdQuery } from '../features/products/productsApi'
import { formatPrice } from '../utils/format'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, error, isLoading, isFetching, fulfilledTimeStamp, refetch } = useGetProductByIdQuery(Number(id))

  if (isLoading) return <Loader />
  if (error?.status === 404) {
    return (
      <div className="status">
        <p>Product not found.</p>
        <Link to="/">Back to products</Link>
      </div>
    )
  }
  if (error) return <ErrorMessage error={error} onRetry={refetch} />

  return (
    <section className="product-detail">
      <button className="link-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="detail-layout">
        <img src={product.imageUrl} alt={product.name} />
        <div>
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="price large">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <CacheInfo fulfilledTimeStamp={fulfilledTimeStamp} isFetching={isFetching} />
        </div>
      </div>
    </section>
  )
}
