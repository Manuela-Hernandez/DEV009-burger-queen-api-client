import { useSelector, useDispatch } from "react-redux";
import { addProducto, deleteProductQuantity, deleteProduct } from "../../redux/reducers/orderSlice";
import { useState } from "react";

export default function ProductSumary({customerName}) {
  const productos = useSelector((state) => state.order.productos);
  const dispatch = useDispatch()
  let total = 0;
  
  return (
    <>
      <section className="grid  bg-bgqueen-secondary border-solid border-2 border-bgqueen-secondary w-3/4 md: w-full">
        <header className="text-2xl text-white text-center font-semi-bold bg-bgqueen-primary h-12"> Resumen de pedido</header>
        <ol>
          {productos.map((product) => (
            <li key={product.product.id} className="grid grid-cols-1 mb-2 p-2">
              <div className="grid grid-cols-2 grid-row-1 ">
                <p className="text-bgqueen-primary">
                  {product.product.name}
                </p>
                <div className="justify-self-end">
                  <i className="fa-solid fa-minus text-bgqueen-primary " onClick={() => dispatch(deleteProductQuantity(product))}></i>
                  <span className="col-end mx-2 text-center">{product.quantity}</span>
                  <i className="fa-solid fa-plus text-bgqueen-primary" onClick={() => dispatch(addProducto(product))}></i>
                </div>
                <p onClick={() => dispatch(deleteProduct(product))}>Eliminar</p>
                <h3>{product.subtotal}</h3>
              </div>
            </li>
          ))}
        </ol>

        <div className=" grid grid-cols-2 grid-rows-1 border-t-2 border-bgqueen-cafe p-2">
            
          <h2> Total </h2>
            {
                productos.map((product) => {
                    total += product.subtotal;
                })
            }
          <span className="justify-self-end" >{total}</span>
        </div>

        <button className="justify-self-center bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-m"> CONFIRMAR PEDIDO</button>

      </section>
    </>
  )
}