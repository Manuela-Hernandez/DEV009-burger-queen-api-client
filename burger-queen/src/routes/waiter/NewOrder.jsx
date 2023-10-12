import { useNavigate } from 'react-router-dom';
import { useState , useReducer} from 'react';
import AddProductToOrder from '../../components/AddProductsToOrder/AddProductsToOrder';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import ResumenPedidos from '../../components/ResumenPedidos/Resumen'
const initialState = {
  products: [],
  total: 0,
}
const reducer = (state, action)=>{
  switch (action.type) {
    case "addProduct":
      if (state.products.find((product) => product.product.id === action.item.product.id)) {
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.product.id === action.item.product.id) {
              return {
                ...product,
                quantity: product.quantity + 1,
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
      if (state.products.find((product) => product.product.id === action.item.product.id).quantity > 1) { 
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.product.id === action.item.product.id) {
              return {
                ...product,
                quantity: product.quantity - 1,
                subtotal: product.subtotal - action.item.product.price,
              };
            } else {
              return product;
            }
          }),
          total: state.total - action.item.product.price,
        };
      }/* else {
        return {
          ...state,
          products: state.products.filter((product) => product.product.id !== action.item.product.id),
          total: state.total - action.item.subtotal,
        };
      }*/
    case "deleteProduct":
      return {
        ...state,
        products: state.products.filter((product) => product.product.id !== action.item.product.id),
        total: state.total - action.item.subtotal,
      };
    case "cleanOrder":
      return initialState;
    default:
      return state;
  }
}

export default function NewOrder() {
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [order, dispatch] = useReducer(reducer, initialState);

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };
  return (
    <>
      <NavigationBar />
      <section className='grid grid-cols-2 grid-rows-3 m-8'>
        <article className='grid grid-cols-2 grid-rows-2'>
          <input type="text"
            placeholder='Nombre del cliente'
            onChange={handleCustomerNameChange}
            className='h-12 col-span-2 m-2 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl' />
          <button className='bg-white m-2 p-2 rounded' onClick={() => setSelectedProductType('Desayuno')}>Desayuno</button>
          <button className='bg-white m-2 p-2 rounded' onClick={() => setSelectedProductType('Almuerzo')}>Almuerzo</button>
        </article>

        <article className='row-span-4'>
          <ResumenPedidos customerName={customerName} order = {order} dispatch ={dispatch}/>
        </article>

        <article className='row-span-2 m-2'>
          <AddProductToOrder selectedProductType={selectedProductType} dispatch= {dispatch}/>
        </article>
      </section>
      {/* <div className="grid grid-cols-2 grid-rows-1 mx-2 md:h-1/2 gap-4 ">
      <AddProductToOrder />
      <ResumenPedidos />
      </div> */}
    </>
  );
}