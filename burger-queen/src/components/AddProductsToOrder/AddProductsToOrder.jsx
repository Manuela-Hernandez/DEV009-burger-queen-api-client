import { getProducts } from "../../services/request";
import React, { useState, useEffect } from 'react';
import addIcon from '../../assets/icon-add.png';
import { useDispatch } from "react-redux";
import { addProducto } from "../../redux/reducers/orderSlice";

export default function AddProductToOrder({selectedProductType}) {
  const [products, setProducts] = useState([]);
  // const orderSummary = [];
  function addProduct(product) {
    
    dispatch(addProducto({product, quantity: 1}))
   
  }
  useEffect(() => {
    getProducts(localStorage.getItem('token'))
      .then((response) => {
       // Actualiza el estado con los productos obtenidos
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
    }, []); // El segundo argumento, [], asegura que se ejecute una sola vez cuando el componente se monta
    return (
      <div className="container bg-bgqueen-secondary w-full rounded-lg md:w-full">
        <h1 className="text-3xl font-semibold mb-4">{selectedProductType}</h1>
        <ul className="w-11/12 mx-auto grid grid-cols-1 gap-4">
          {products
            .filter((product)=> {
              return selectedProductType === product.type;
            })
            .map((product) => (
            <li key={product.id} className="grid grid-cols-5 bg-bgqueen-gray rounded-lg shadow-md p-2 items-center justify-items-center hover:bg-white">
              <img src={product.image} alt={product.name} className="w-2/3 col-span-1" />
              <section className="col-span-3 justify-self-start ml-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-600">${product.price}</p>
              </section>
              <img src={addIcon} alt="add" className="w-1/3 col-span-1 cursor-pointer" onClick={() => addProduct(product.id)}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
