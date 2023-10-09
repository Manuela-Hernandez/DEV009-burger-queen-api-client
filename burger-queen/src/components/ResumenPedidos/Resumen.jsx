export default function ProductSumary() {
    return (
     <>
     <section className="grid  bg-bgqueen-secondary border-solid border-2 border-bgqueen-secondary  w-3/4">
        <header className="text-4xl text-white text-center font-semi-bold bg-bgqueen-primary h-16"> Resumen de pedido</header>
        <ol> Cafe americano</ol>
        <div className=" grid grid-cols-2 grid-rows-1 "> 
            <h2> Tolal</h2>
            <p>$10.00</p>
        </div>
        <button className=" justify-self-center    bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-xl"> CONFIRMAR PEDIDO</button>
        
     </section>
     </>
    )
    }