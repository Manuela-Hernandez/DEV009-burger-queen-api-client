import { useState , useReducer} from 'react';
import AddProductToOrder from '../../components/AddProductsToOrder/AddProductsToOrder';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import OrderSummary from '../../components/OrderSummary/Summary'
import { initialState, reducer } from './reducerActions';

export default function NewOrder() {
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [order, dispatch] = useReducer(reducer, initialState);

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };
  const clearInput = () => {
    const input = document.querySelector('#customerName'); // Establece el valor del input en una cadena vacía
    input.value = '';
  };
  return (
    <>
      <NavigationBar />
      <section className='grid grid-cols-2 grid-rows-3 m-8 border-2 border-bgqueen-secondary '>
        <article className='grid grid-cols-2 grid-rows-2'>
          <input type="text"
            placeholder='Customer name'
            id = 'customerName'
            onChange={handleCustomerNameChange}
            className='h-12 col-span-2 m-2 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl' />
            <button className={`m-2 p-2 rounded ${selectedProductType === 'Desayuno' ? 'bg-bgqueen-secondary' : 'bg-bgqueen-gray'}`} id = 'btn-breakfast' onClick={() => setSelectedProductType('Desayuno')}>Breakfast</button>
            <button className={`m-2 p-2 rounded ${selectedProductType === 'Almuerzo' ? 'bg-bgqueen-secondary' : 'bg-bgqueen-gray'}`} id = 'btn-lunch' onClick={() => setSelectedProductType('Almuerzo')}>Lunch</button>
        </article>

        <article className='row-span-4'>
          <OrderSummary customerName={customerName} order = {order} dispatch ={dispatch} clearInput={clearInput}/>
        </article>

        <article className='row-span-2 m-2'>
          <AddProductToOrder selectedProductType={selectedProductType} dispatch= {dispatch}/>
        </article>
      </section>
    </>
  );
}