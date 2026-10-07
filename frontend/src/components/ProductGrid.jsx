import ProductCard from './ProductCard'

export default function ProductGrid({ products, dimmed = false }) {
  return (
    <div className={`product-grid${dimmed ? ' dimmed' : ''}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
