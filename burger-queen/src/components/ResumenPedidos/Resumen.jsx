import { useSelector } from "react-redux"

export default function ProductSumary() {
  const productos = useSelector((state) => state.order.productos);

  return (
    <>
      <section className="grid  bg-bgqueen-secondary border-solid border-2 border-bgqueen-secondary  w-full">
        <header className="text-4xl text-white text-center font-semi-bold bg-bgqueen-primary h-16"> Resumen de pedido</header>
        {/* <ol>
          <li className="bg-gray-500 p-4 mb-2"> 
            <div className="flex ">
              <p className="text-bgqueen-primary">
              Cafe americano
              </p> 
              <button></button>
              <button></button>
            </div>
          </li>
          <li className="bg-gray-500 p-4"> 
            <div className="flex ">
              <p className="text-bgqueen-primary">
              Saduche
              </p> 
              <button className="bg-bgqueen-primary text-white">Agregar cantidad</button>
            </div>
          </li>
        </ol>

        <div className=" grid grid-cols-2 grid-rows-1 ">
          <h2> Tolal</h2>
          <p>$10.00</p>
        </div> */}
        <ol>
                    {productos.map((product) => (
                    <li key={product.id}>
                        {product.name}
                    </li>
            ))}
                </ol>

        <button className=" justify-self-center    bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-xl"> CONFIRMAR PEDIDO</button>

      </section>
    </>
  )
}