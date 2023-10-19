import { changeOrderStatus } from "../../services/request"
export default function Modal({ isopen = false, setIsopen, productsModal = [] }) {
  function changeStatus(){
    changeOrderStatus(localStorage.getItem('token'), productsModal.id, 'ready')
      .then((response) => {
        console.log('Cambio realizado: ', response);
      })
      .catch((error) => {
        console.log('Ha ocurrido un error: ', error)
      });
  }
  function validationToChangeStatus(){
    
  }
  return (
    <div>
      {isopen && (
        <div className="h-screen w-screen fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="w-2/4 h-1/4 bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
            <div>
              <h1 className="text-center text-3xl font-semibold mb-4">Details</h1>
              <p>Order #{productsModal.id}</p>
              {
                productsModal.products.map((product) => (
                  <section className="grid grid-cols-1 grid-row-auto gap-2 justify-center" key={product.product.id}>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="h-6 w-6 rounded-full checked:bg-bgqueen-primary"/>
                      <span className="text-xl">{product.qty} {product.product.name}</span>
                    </label>
                  </section>
                ))
              }
            </div>
            <div className=" w-full h-full flex justify-center">
              <button className="w-1/4 h-12 bg-bgqueen-primary text-white rounded-lg text-xl"
                onClick={() => setIsopen(false)}> close</button>
              <button className="w-1/4 h-12 bg-bgqueen-primary text-white rounded-lg text-xl"
                onClick={changeStatus}> READY</button>
            </div>
          </div>
        </div>
      )
      }
    </div>
  )
}