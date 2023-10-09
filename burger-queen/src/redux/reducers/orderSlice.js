import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        productos: [],
    },
    reducers:{
        addProducto : (state, action) => {
            console.log(action);
            state.productos.push(action.payload)
          },

    }
    
})

export const { addProducto } = orderSlice.actions

export default orderSlice.reducer

