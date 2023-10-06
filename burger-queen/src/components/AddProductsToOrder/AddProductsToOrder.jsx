import { getProducts } from "../loginForm/request";
import React, { useState, useEffect } from 'react';
export default function AddProductToOrder() {
    const [products, setProducts] = useState([]);
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
        <div className="container bg-bgqueen-secondary lg:w-1/2 md:w-full">
          <h1 className="text-3xl font-semibold mb-4">Lista de Productos</h1>
          <ul className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <li key={product.id} className="grid grid-cols-5 bg-white rounded-lg shadow-md p-4">
                <img src={product.image} alt={product.name} className="w-full h-auto mb-2 col-span-1" />
                <section className="col-span-3">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                </section>
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/000000/plus.png" alt="add" className="col-span-1"/>
              </li>
            ))}
          </ul>
        </div>
      );

  }
