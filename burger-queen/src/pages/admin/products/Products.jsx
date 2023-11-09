import { useEffect, useState } from "react"
import { deleteProduct, getProducts } from "../../../services/request";
import { questionDelete, showAlertError, completed } from "../../../alert/aler";
import ModalAdmin from "../../../components/ModalAdmin/ModalAdmin";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const navigateTo = useNavigate();
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
          setProducts(productsList.filter((product) => product.id !== id))
        })
        .catch(() => {
          showAlertError("An error has occurred deleting the product");
        })
    }
  }


  return (
    <section className="w-full h-full">
      <button className="text-bgqueen-primary text-xl mt-2 font-bold ml-10 mt-4 px-4 justify-self-center w-auto h-12 "
        onClick={() => navigateTo('/admin')}>
        <i className="fa-solid fa-circle-arrow-left"></i>
        Back to dashboard
      </button>
      <section className="grid grid-cols-2 m-auto md:w-11/12 mb-4 ">
        <h2 className="caption-top text-3xl text-center text-bgqueen-primary justify-self-start font-semibold self-end">Products</h2>
        <button className="text-bgqueen-primary rounded-lg text-xl border border-2 border-bgqueen-primary font-text-primary p-2 justify-self-end w-40"
          onClick={addProduct}>
          Add product
          <i className="fa-solid fa-plus ml-2"></i>
        </button>
      </section>
      <section className="flex flex-wrap gap-4 mt-4 justify-center">
        {
          productsList !== undefined && productsList.map((product) => (
    
            <article key={product.id} className='w-1/5 border border-bgqueen-primary rounded p-3 bg-bgqueen-secondary flex flex-col '>
              <h3 className="text-center font-bold mb-4 text-xl">{product.type}</h3>
              <img src={product.image} alt={product.name} className="w-1/2 m-auto" />
              <p className="text-xl">{product.name}</p>
              <p className="italic font-bold">${product.price}</p>
              <article className="text-end">
                <i className="fa-regular fa-pen-to-square text-2xl mr-4" data-testid={`edit-product-${product.id}`} onClick={() => { editProduct(product) }}></i>
                <i className="fa-regular fa-trash-can text-2xl" data-testid={`delete-product-${product.id}`} onClick={() => { deleteItem(product.id) }}></i>
              </article>
            </article>
          ))
        }
      </section>
      < ModalAdmin isopen={isopen} setIsopen={setIsopen} action={action} information={information} itemsList={productsList} setList={setProducts} />
    </section>
  );
}