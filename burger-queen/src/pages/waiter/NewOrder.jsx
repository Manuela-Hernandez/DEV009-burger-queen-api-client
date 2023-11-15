import { useState, useReducer } from 'react';
import AddProductToOrder from '../../components/AddProductsToOrder/AddProductsToOrder';
import OrderSummary from '../../components/OrderSummary/Summary'
import { initialState, reducer } from './reducerActions';
import { useNavigate } from 'react-router-dom';

export default function NewOrder() {
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [customerName, setCustomerName] = useState('');

  const [order, dispatch] = useReducer(reducer, initialState);

  const navigateTo = useNavigate();


  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };
  const clearInput = () => {
    const input = document.querySelector('#customerName'); // Establece el valor del input en una cadena vacía
    input.value = '';
  };
  return (
    <>

      <section className='grid grid-cols-2 grid-rows-3 m-8 border-2 border-stone'>
        <article className='grid grid-cols-2 grid-rows-2'>
          <button className="text-bgqueen-primary rounded-lg text-xl m-2 border border-2 border-bgqueen-primary font-text-primary"
            onClick={() => navigateTo('allOrders')}> See all orders <i className="fa-solid fa-burger text-2xl"></i></button>
          <input type="text"
            placeholder='Customer name'
            id='customerName'
            onChange={handleCustomerNameChange}
            className='h-12 col-span-2 m-2 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl' />
          <button className={`m-2 p-2 rounded ${selectedProductType === 'Breakfast' ? 'bg-bgqueen-primary text-white' : 'bg-bgqueen-gray'}`} id='btn-breakfast' onClick={() => setSelectedProductType('Breakfast')}>Breakfast</button>
          <button className={`m-2 p-2 rounded ${selectedProductType === 'Lunch' ? 'bg-bgqueen-primary text-white' : 'bg-bgqueen-gray'}`} id='btn-lunch' onClick={() => setSelectedProductType('Lunch')}>Lunch</button>
        </article>

        <article className='row-span-4'>
          <OrderSummary customerName={customerName} order={order} dispatch={dispatch} clearInput={clearInput} />
        </article>

        <article className='row-span-2 m-2'>
          <AddProductToOrder selectedProductType={selectedProductType} dispatch={dispatch} />
        </article>

      </section>
    </>
  );
}