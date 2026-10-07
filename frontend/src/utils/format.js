const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const formatPrice = (value) => priceFormatter.format(Number(value))
