import { changeOrderStatus } from "../../services/request"
import { useState } from "react";
import { completed, showAlertError } from "../../alert/aler";

export default function Modal({ isopen = false, setIsopen, productsModal = [] }) {

  const [checked, setChecked] = useState(0); // Estado para el correo electrónico

  function changeStatus(status) {
    changeOrderStatus(localStorage.getItem('token'), productsModal.id, status)
      .then((response) => {
        completed("Your order status has been changed.");
        console.log('Cambio realizado: ', response);
      })
      .catch((error) => {
        showAlertError("An error has occurred");
        console.log('Ha ocurrido un error: ', error)
      });
  }

  const handleCheked = (e) => {
    if (e.target.checked) {
      setChecked(checked + 1);
    } else {
      setChecked(checked - 1);
    }

  };
  function validationToChangeStatus () {
    if (checked === productsModal.products.length) {
      console.log("ya estan seleccionados todos los productos");
      changeStatus("ready");
      // completed("Your order status has been changed.");
      // setTimeout(function() {
      //   location.reload();
      // }, 3000)
      

      } else {
        showAlertError("faltan productos por seleccionar");
      }


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
                        <input type="checkbox" className="h-6 w-6 rounded-full checked:bg-bgqueen-primary" onChange={handleCheked} />
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
                  onClick={validationToChangeStatus}> READY</button>
              </div>
            </div>
          </div>
        )
        }
      </div>
    )
  }