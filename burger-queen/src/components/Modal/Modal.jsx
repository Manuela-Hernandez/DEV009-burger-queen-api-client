import { changeOrderStatus } from "../../services/request"
import { useState } from "react";
import { completed, questionClose, showAlertError } from "../../alert/aler";

export default function Modal({ isopen = false, setIsopen, productsModal = [], allOrders, setOrders}) {

  const [checked, setChecked] = useState(0); // Estado para el correo electrónico

  function changeStatus(status) {
    changeOrderStatus(localStorage.getItem('token'), productsModal.id, status)
      .then((response) => {
        setIsopen(false);
        completed("Your order status has been changed.");
        setOrders(allOrders.map((order) => {
          if(productsModal.id === order.id) {
            order.status = status;
          }
          return order
        }));
        // setTimeout(function() {
        //   location.reload();
        // }, 1600);
      })
      .catch(() => {
        showAlertError("An error has occurred while status was changing");
      });
  }

  const handleChecked = (e) => {
    setChecked(e.target.checked ? checked + 1 : checked - 1);
  };

  function validationToChangeStatus () {
    if (checked === productsModal.products.length) {
      if (localStorage.getItem("role") === "chef" ) {
        changeStatus("ready");   
      }else {
        changeStatus("delivered");
      }
      
    } else {
      showAlertError("All the products have to be checked");
    }
  }
  async function closeOrderDetails(){
    const closeDetails = await questionClose();
    if(closeDetails.isConfirmed) {
      setIsopen(false);
      setChecked(0);
    }
  }
    return (
      <div>
        {isopen && (
          <div className="h-screen w-screen fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="w-2/4  bg-white p-1 rounded flex flex-col justify-center items-center gap-1">
              <button className="w-12 h-12 rounded-lg text-xl border-solid border-bgqueen-black hover:border-2 self-end"
                onClick={closeOrderDetails}>
                <i className="fa-solid fa-xmark" id = 'button-close-order'></i>
              </button>
              <div>
                <h2 className="text-center text-3xl font-semibold mb-4">Details - Order #{productsModal.id}</h2>
                <h3 className="text-xl font-semibold mb-4">Client: {productsModal.client}</h3>
                {
                  productsModal && productsModal.products.map((product, index) => (
                    <section className="grid grid-cols-1 grid-row-auto gap-2 justify-center" key={product.product.id}>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-6 w-6 rounded-full checked:bg-bgqueen-primary" onChange={handleChecked} id={`product-${index}`}/>
                        {/* <span className="text-xl">{product.qty} {product.product.name}</span> */}
                        {product.qty} {product.product.name}
                      </label>
                    </section>
                  ))
                }
              </div>
              <div className=" w-full h-full flex justify-center">
                <button className="w-1/4 h-12 bg-bgqueen-primary text-white rounded-lg text-xl m-4"
                  id="button-set-ready"
                  onClick={validationToChangeStatus}> {localStorage.getItem('role') === 'chef' ? 'READY':'DELIVER ORDER'}
                </button>
              </div>
            </div>
          </div>
        )
        }
      </div>
    )
  }