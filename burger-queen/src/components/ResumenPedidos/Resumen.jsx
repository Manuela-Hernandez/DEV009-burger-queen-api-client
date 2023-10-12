import { useSelector, useDispatch } from "react-redux";
import { addProducto, deleteProductQuantity, deleteProduct } from "../../redux/reducers/orderSlice";
import { questionDelete, completed, showAlertError, } from "../../alert/aler"
import { addOrder } from "../../services/request";

export default function ProductSumary({ customerName }) {
  
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch()

  function createOrder() {
    if (customerName.length === 0 ) {
      showAlertError("Please enter the customer's name");
      return;
    }
    if (order.productos.length < 1) {
      showAlertError("Please select a product");
      return;
    }
    addOrder(localStorage.getItem('token'), customerName, order.productos)
      .then((response) => {
        completed( "Your order has been saved.")
        console.log('Orden creada ', response);
      })
      .catch((error) => {
        showAlertError("An error has occurred");
        console.log(error);
      });
  }

  async function deleteProducts(product) {
    const reultAlert = await questionDelete()
    if (reultAlert.isConfirmed) {
      completed( "Your file has been deleted.")
      dispatch(deleteProduct(product))
    }
  }


  return (
    <>
      <section className="grid  bg-bgqueen-secondary border-solid border-2 border-bgqueen-secondary w-3/4 md: w-full">
        <header className="text-2xl text-white text-center font-semi-bold bg-bgqueen-primary h-12"> Order sumary</header>
        <ol className="p-6 divide-y divide-bgqueen-cafe">
          {order.productos.map((product) => (
            <li key={product.product.id}
              className="grid grid-cols-1 mb-2 p-2">
              <div className="grid grid-cols-2 grid-row-1 ">
                <p className="text-bgqueen-primary">
                  {product.product.name}
                </p>
                <div className="justify-self-end">
                  <i className="fa-solid fa-minus text-bgqueen-primary "
                    onClick={() => dispatch(deleteProductQuantity(product))}></i>
                  <span className="col-end mx-2 text-center">{product.quantity}</span>
                  <i className="fa-solid fa-plus text-bgqueen-primary"
                    onClick={() => dispatch(addProducto(product))}></i>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <button className="justify-self-start"
                  onClick={() => deleteProducts(product)}>Delete</button>
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