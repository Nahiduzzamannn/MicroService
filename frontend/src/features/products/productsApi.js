import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Cached data stays in the store this long (seconds) after no component uses it.
const CACHE_SECONDS = 300

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Product'],
  keepUnusedDataFor: CACHE_SECONDS,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    // Infinite scrolling: one cache entry (per page size) that holds every
    // loaded page in data.pages. Re-visiting the page restores them all.
    productFeed: build.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) =>
          lastPage.last ? undefined : lastPageParam + 1,
      },
      query: ({ queryArg: size, pageParam }) => `/products?page=${pageParam}&size=${size}`,
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: build.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // Creating a product invalidates the list tag, so every cached list refetches.
    createProduct: build.mutation({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const {
  useProductFeedInfiniteQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  usePrefetch,
} = productsApi
