import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        total: 0,
        productos: [],
    },
    reducers: {
        addProducto: (state, action) => {
            console.log("action", action.payload)
            const productExist = state.productos.find((product) => {
                return product.product.id === action.payload.product.id
            });
            if (productExist) {
                productExist.quantity += 1;
                productExist.subtotal += productExist.product.price;
                // state.total += productExist.subtotal;
                // const productIndex = state.productos.indexOf(productExist);
                // state.productos[productIndex].quantity += 1;
                // state.productos[productIndex].subtotal += state.productos[productIndex].product.price;
            } else {
                state.productos.push(action.payload)
            }
            state.total += action.payload.product.price;

        },
        deleteProductQuantity: (state, action) => {
            const productExist = state.productos.find((product) => {
                return product.product.id === action.payload.product.id
            });
            if (productExist.quantity > 1) {
                productExist.quantity -= 1;
                productExist.subtotal -= productExist.product.price;

                // state.productos[state.productos.indexOf(productExist)].quantity -= 1;
                // state.productos[state.productos.indexOf(productExist)].subtotal -= state.productos[state.productos.indexOf(productExist)].product.price;
            } else {
                state.productos = state.productos.filter((product) => !(product.product.id === action.payload.product.id))
            }
            state.total -= action.payload.product.price;

        },
        deleteProduct: (state, action) => {
            state.productos = state.productos.filter((product) => !(product.product.id === action.payload.product.id))
            state.total -= action.payload.subtotal;




        },
    }

})

export const { addProducto, deleteProduct, deleteProductQuantity } = orderSlice.actions

export default orderSlice.reducer

