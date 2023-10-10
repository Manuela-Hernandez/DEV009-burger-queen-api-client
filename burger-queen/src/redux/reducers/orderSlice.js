import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        productos: [],
    },
    reducers: {
        addProducto: (state, action) => {
            console.log("action", action);
            console.log("state", state.productos);
            
            const productExist = state.productos.find((product) => {
                console.log("product parametro", product)
                product.id === action.payload.product.id
                console.log("product id en find", product.id)
                console.log("action en find", action.payload.product.id)
            })
            console.log("productExist antes del if", productExist)
            if (productExist) {
                console.log("productExist en if", productExist)
                productExist.quantity += 1;
            } else {
                state.productos.push(action.payload)
            }
        },

    }

})

export const { addProducto } = orderSlice.actions

export default orderSlice.reducer

