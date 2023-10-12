import { addOrder } from "../../services/request";
import { showAlertError, completed, questionDelete } from "../../alert/aler.js"

export default function ProductSumary({ customerName, order, dispatch, clearInput }) {
  function createOrder() {
    if (customerName.length === 0) {
      showAlertError("Please enter the customer's name");
      return;
    }
    if (order.products.length < 1) {
      showAlertError("Please select a product");
      return;
    }
    addOrder(localStorage.getItem('token'), customerName, order.productos)
      .then((response) => {
        completed("Your order has been saved.")
        dispatch({ type: "cleanOrder" })
        clearInput();
        console.log("Orden creada ", response);
      })
      .catch((error) => {
        showAlertError("An error has occurred");
        console.log(error);
      });
  }

  async function deleteProducts(product) {
    const reultAlert = await questionDelete()
    if (reultAlert.isConfirmed) {
      completed("Your product has been deleted.")
      dispatch({ type: 'deleteProduct', item: product })
    }
  }


  return (
    <>
      <section className="grid  bg-bgqueen-secondary border-solid border-2 border-bgqueen-secondary w-3/4 md: w-full">
        <header className="text-2xl text-white text-center font-semi-bold bg-bgqueen-primary h-12"> Order sumary</header>
        <ol className="p-6 divide-y divide-bgqueen-cafe">
          {order.products.map((product) => (
            <li key={product.product.id}
              className="grid grid-cols-1 mb-2 p-2">
              <div className="grid grid-cols-3 grid-row-1 ">
                <p className="text-bgqueen-primary col-span-2">
                  {product.product.name}
                </p>
                <div className="justify-self-end">
                  <i className="fa-solid fa-minus text-bgqueen-primary "
                    onClick={() => dispatch({ type: 'decreaseProductQuantity', item: product })}></i>
                  <span className="col-end mx-2 text-center">{product.quantity}</span>
                  <i className="fa-solid fa-plus text-bgqueen-primary"
                    onClick={() => dispatch({ type: 'addProduct', item: product })}></i>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <p className="justify-self-start"
                  onClick={() => deleteProducts(product) }>Delete</p>
                <h3 className="justify-self-end">${product.subtotal}</h3>
              </div>
            </li>
          ))}
        </ol>

        <div className=" grid grid-cols-2 grid-rows-1 border-t-2 border-bgqueen-cafe p-8">
          <h2 className="text-xl font-bold text-bgqueen-primary"> Total </h2>
          <span className="justify-self-end" >${order.total}</span>
        </div>

        <button className="justify-self-center bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-m"
          onClick={() => createOrder()}>CONFIRM ORDER</button>

      </section>
    </>
  )
}