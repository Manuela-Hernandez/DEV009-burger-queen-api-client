
export const initialState = {
    products: [],
    total: 0,
  }
export const reducer = (state, action)=>{
    switch (action.type) {
      case "addProduct":
        if (state.products.find((product) => product.product.id === action.item.product.id)) {
          return {
            ...state,
            products: state.products.map((product) => {
              if (product.product.id === action.item.product.id) {
                return {
                  ...product,
                  qty: product.qty + 1,
                  subtotal: product.subtotal + action.item.product.price,
                };
              }
              return product;
            }),
            total: state.total + action.item.product.price,
          };
        } else {
          return {
            ...state,
            products: [...state.products, action.item],
            total: state.total + action.item.product.price,
          };
        }
      case "decreaseProductQuantity":
        if (state.products.find((product) => product.product.id === action.item.product.id).qty > 1) { 
          return {
            ...state,
            products: state.products.map((product) => {
              if (product.product.id === action.item.product.id) {
                return {
                  ...product,
                  qty: product.qty - 1,
                  subtotal: product.subtotal - action.item.product.price,
                };
              } else {
                return product;
              }
            }),
            total: state.total - action.item.product.price,
          };
        }
      case "deleteProduct":
        return {
          ...state,
          products: state.products.filter((product) => product.product.id !== action.item.product.id),
          total: state.total - action.item.subtotal,
        };
      case "cleanOrder":
        return initialState;
    }
  }