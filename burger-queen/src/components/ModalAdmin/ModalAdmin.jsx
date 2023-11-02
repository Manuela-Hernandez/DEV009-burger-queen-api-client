import { questionClose } from "../../alert/aler";
import AddUserForm from "../AddUserForm/AddUserForm";

export default function ModalAdmin({ isopen = false, setIsopen }) {

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
              <i className="fa-solid fa-xmark" id='button-close-order'></i>
            </button>
            <AddUserForm />
          </div>
        </div>
      )
      }
    </div>
  )

}