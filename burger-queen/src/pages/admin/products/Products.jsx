import { useEffect, useState } from "react"
import { deleteProduct, getProducts } from "../../../services/request";
import { questionDelete, showAlertError, completed } from "../../../alert/aler";
import ModalAdmin from "../../../components/ModalAdmin/ModalAdmin";

export default function AllProducts() {

  const [isopen, setIsopen] = useState(false);

  const [productsList, setProducts] = useState([]);

  const [action, setAction] = useState();

  const [information, setProductInfo] = useState();

  function openModalAdmin() {
    setIsopen(true);
  }
  function addProduct() {
    setAction('AddProduct');
    openModalAdmin();
  }
  function editProduct(product) {
    //console.log(product);
    setProductInfo(product);
    setAction('EditProduct');
    openModalAdmin();
  }

  useEffect(() => {
    getProducts(localStorage.getItem('token'))
      .then((response) => {
        // Actualiza el estado con los productos obtenidos
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        showAlertError("An error has occurred while obtaining list of products.");
      });
  }, []);

  async function deleteItem(id) {
    const reultAlert = await questionDelete()
    if (reultAlert.isConfirmed) {
      deleteProduct(localStorage.token, id)
        .then(() => {
          completed("The product has been deleted.");
          //   setproducts(productsList.filter((product) => product.id !== id))
        })
        .catch(() => {
          showAlertError("An error has occurred deleting the product");
        })
    }
  }


  return (
    <section className="w-full h-full">
      <section className="grid grid-cols-2 m-auto mt-8 md:w-11/12">
        <h2 className="caption-top text-3xl text-center text-bgqueen-primary justify-self-start font-semibold">Products</h2>
        <button className="text-bgqueen-primary rounded-lg text-xl border border-2 border-bgqueen-primary font-text-primary p-2 justify-self-end w-40"
          onClick={addProduct}>
          Add product
          <i className="fa-solid fa-plus ml-2"></i>
        </button>
      </section>
      <table className="bg-white m-auto mt-4 border-separate border-spacing-1 border md:w-11/12 text-lg">
        <thead className="text-left">
          <tr className="bg-bgqueen-secondary text-bgqueen-primary font-black">
            <th>ID</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>TYPE</th>
            <th>PRICE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            productsList !== undefined && productsList.map((product) => (
              <tr key={product.id} >
                <td className="border">{product.id}</td>
                <td className="border w-1/12">
                <img src={product.image} alt={product.name} className="w-1/2" />
                </td>
                <td className="border">{product.name}</td>
                <td className={`border`}>{product.type}</td>
                <td className={`border`}>{product.price}</td>
                {/* <td className=" text-center border">{product.role}</td> */}
                <td className="border text-center grid grid-cols-2 justify-around content-center ">
                  <i className="fa-regular fa-pen-to-square text-xl" data-testid={`edit-products-${product.id}`} onClick={() => { editProduct(product) }}></i>
                  <i className="fa-regular fa-trash-can text-xl" data-testid={`delete-product-${product.id}`} onClick={() => { deleteItem(product.id) }}></i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      < ModalAdmin isopen={isopen} setIsopen={setIsopen} action={action} information={information} productsList={productsList} setProducts={setProducts} />
    </section>
  );
}