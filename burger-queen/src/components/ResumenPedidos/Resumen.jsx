import { useSelector } from "react-redux"

export default function ProductSumary() {
  const productos = useSelector((state) => state.order.productos);

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
                  <i className="fa-solid fa-minus text-bgqueen-primary "></i>
                  <span className="col-end mx-2 text-center">{product.quantity}</span>
                  <i className="fa-solid fa-plus text-bgqueen-primary"></i>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className=" grid grid-cols-2 grid-rows-1 border-t-2 border-bgqueen-cafe p-2">
          <h2> Tolal</h2>
          <span className="justify-self-end" ></span>
        </div>

        <button className="justify-self-center bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-m"> CONFIRMAR PEDIDO</button>

      </section>
    </>
  )
}