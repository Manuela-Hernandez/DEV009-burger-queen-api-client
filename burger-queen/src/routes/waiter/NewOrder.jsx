import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddProductToOrder from '../../components/AddProductsToOrder/AddProductsToOrder';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import ResumenPedidos from '../../components/ResumenPedidos/Resumen'
export default function NewOrder() {
  const [selectedProductType, setSelectedProductType] = useState(null);
  return (
    <>
      <NavigationBar />
      <section className='grid grid-cols-2 grid-rows-3 m-8'>
        <article className='grid grid-cols-2 grid-rows-2'>
          <input type="text" placeholder='Nombre del cliente' className='h-12 col-span-2 m-2 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl' />
          <button className='bg-white m-2 p-2 rounded' onClick={()=> setSelectedProductType('Desayuno')}>Desayuno</button>
          <button className='bg-white m-2 p-2 rounded' onClick={()=> setSelectedProductType('Almuerzo')}>Almuerzo</button>
        </article>

        <article className='row-span-4'>
          <ResumenPedidos />
        </article>

        <article className='row-span-2 m-2'>
          <AddProductToOrder  selectedProductType={selectedProductType} />
        </article>
      </section>
    </>
  );
}