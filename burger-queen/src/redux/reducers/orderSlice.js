import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        productos: [],
    },
    reducers: {
        addProducto: (state, action) => {
            const productExist = state.productos.find((product) => {
                return product.product.id === action.payload.product.id    
            });
            if (productExist) {
                state.productos[state.productos.indexOf(productExist)].quantity += 1;
            } else {
                state.productos.push(action.payload)
            }
        },

    }

})

export const { addProducto } = orderSlice.actions

export default orderSlice.reducer

