import { useEffect, useState } from "react";
import { editProduct } from "../../services/request";
import { completed, showAlertError, warning } from "../../alert/aler";

export default function EditProductForm({ setIsopen, information = [],  productsList, setProducts }) {

  const [itemName, setName] = useState('');
  const [imgURL, setImg] = useState('');
  const [price, setPrice] = useState('');
  const [itemType, setType] = useState('type');

  useEffect(() => {
    console.log(productsList);
    setName(information.name);
    setImg(information.image);
    setPrice(information.price);
    setType(information.type);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  function saveChangesProduct() {
    console.log(information);
    if (itemType !== 'type' && itemName.length > 0 && price.length > 0 && imgURL.length > 0) {
      editProduct(localStorage.getItem('token'), itemName, price, imgURL, itemType, information.id)
        .then((response) => {
          setIsopen(false);
          completed('The product information has been changed.');
          setProducts(productsList.map((product) => {
            if (product.id === information.id) {
              product.name = itemName;
              product.image = imgURL;
              product.price = price;
              product.type = itemType;
            }
            return product
          }))
          console.log(response);
        })
        .catch((error) => {
          showAlertError(error.response.data);
        });
    } else {
      console.log('faltan datos')
      // Hacer alerts

    }
  }
  return (
    <>
      <h2 className="text-4xl text-bgqueen-primary text-center font-bold">Edit product</h2>
      <form className="w-4/5 mt-5 flex flex-col gap-y-4 items-center">
        <input
          type="text"
          name="name"
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          placeholder="Product name"
          value={itemName}
          onChange={handleNameChange}
        />
        <input
          type="number"
          name="price"
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          placeholder="Price"
          value={price}
          onChange={handlePriceChange}
        />
        <input
          type="url"
          name="imageUrl"
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          placeholder="Image url"
          value={imgURL}
          onChange={handleImgChange}
        />
        <select
          name="type"
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          value={itemType}
          onChange={handleTypeChange}
        >
          <option value='type'>
            Select a type
          </option>
          <option value="Breakfast">
            Breakfast
          </option>
          <option value="Lunch">
            Lunch
          </option>
          {/* <option value="dinner">
            Dinner
          </option> */}
        </select>
        <button
          type="button"
          className="bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-xl mb-3"
          onClick={saveChangesProduct}
          id='save-btn'>
          Save
        </button>
      </form>
    </>
  );
}