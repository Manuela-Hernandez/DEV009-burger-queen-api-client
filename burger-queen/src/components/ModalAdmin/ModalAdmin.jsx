import { questionClose } from "../../alert/aler";
import AddUserForm from "../AddUserForm/AddUserForm";
import EditUser from "../EditUser/EditUser"
import AddProductForm from "../AddProductForm/AddProductForm";
import EditProductForm from "../EditProduct/EditProduct";

export default function ModalAdmin({ isopen , setIsopen, action, information, itemsList, setList}) {

  async function closeOrderDetails(){
    const closeDetails = await questionClose();
    if(closeDetails.isConfirmed) {
      setIsopen(false);
    }
  }

  return (
    <div>
      {isopen && (
        <div className="h-screen w-screen fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className=" bg-white p-1 rounded flex flex-col justify-center items-center gap-1 lg:w-2/4  md:w-2/3">
            <button className="w-12 h-12 rounded-lg text-xl border-solid border-bgqueen-black hover:border-2 self-end"
              onClick={closeOrderDetails}>
              <i className="fa-solid fa-xmark" data-testid="close-modal-admin"></i>
            </button>
            {
              action === 'AddUser' ?
                <AddUserForm setIsopen = {setIsopen} setUsers={setList}/>
              : action === 'EditUser' ?
                <EditUser setIsopen = {setIsopen} information={information} usersList={itemsList} setUsers={setList}/>
                : action === 'AddProduct' ?
                <AddProductForm setIsopen = {setIsopen} setProducts={setList}/> 
                :
                <EditProductForm setIsopen = {setIsopen} information={information} productsList={itemsList} setProducts={setList}/>
            }
            
          </div>
        </div>
      )
      }
    </div>
  )

}