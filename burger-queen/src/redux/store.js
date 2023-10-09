import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './reducers/orderSlice'

export default configureStore({
  reducer: {
    order: orderSlice
  },
})