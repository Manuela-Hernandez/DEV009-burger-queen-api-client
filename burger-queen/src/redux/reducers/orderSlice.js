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
        deleteProductQuantity: (state, action) => {
            const productExist = state.productos.find((product) => {
                return product.product.id === action.payload.product.id    
            });
            if(productExist.quantity>1){
                state.productos[state.productos.indexOf(productExist)].quantity -= 1;
            }else{
                state.productos = state.productos.filter((product)=> !(product.product.id === action.payload.product.id))
            }
        },
        deleteProduct: (state, action) => {
            state.productos = state.productos.filter((product)=> !(product.product.id === action.payload.product.id))
        },
    }

})

export const { addProducto, deleteProduct,deleteProductQuantity } = orderSlice.actions

export default orderSlice.reducer

