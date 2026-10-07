import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from '../features/products/productsApi'

export const store = configureStore({
  reducer: {
    // RTK Query cache lives under state.productsApi
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // The api middleware handles cache lifetimes, invalidation and polling.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})

// Enables refetchOnFocus / refetchOnReconnect behaviour.
setupListeners(store.dispatch)
