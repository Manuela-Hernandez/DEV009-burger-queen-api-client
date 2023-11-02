import { useEffect, useState } from "react"
import { deleteUser, getAllUsers } from "../../../services/request";
import { questionDelete, showAlertError, completed } from "../../../alert/aler";
import ModalAdmin from "../../../components/ModalAdmin/ModalAdmin";

export default function AllUsers() {

  const [isopen, setIsopen] = useState(false);

  const [usersList, setUsers] = useState([]);

  const [action, setAction] = useState();

  const [information, setUserInfo] = useState();

  function openModalAdmin() {
    setIsopen(true);
  }
  function addUser() {
    setAction('AddUser');
    openModalAdmin();
  }
  function editUser(user) {
    console.log(user);
    setUserInfo(user);
    setAction('EditUser');
    openModalAdmin();
  }

  useEffect(() => {
    getAllUsers(localStorage.getItem('token'))
      .then((response) => {
        // Actualiza el estado con los productos obtenidos
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        showAlertError("An error has occurred while obtaining list of product");
      });
  }, []);

  async function deleteEmployee(id) {
    const reultAlert = await questionDelete()
    if (reultAlert.isConfirmed) {
      deleteUser(localStorage.token, id)
        .then(() => {
          completed("The user has been deleted.")

        })
        .catch(() => {
          showAlertError("An error has occurred deleting the user");
        })
    }
  }


  return (
    <section className="w-full h-full">
      <h2 className="text-3xl text-center text-bgqueen-primary font-titles font-bold">Employees</h2>
      <button className="text-bgqueen-primary rounded-lg text-xl m-2 border border-2 border-bgqueen-primary font-text-primary" onClick={addUser}>
        Add user
        <i className="fa-solid fa-user-plus"></i>
      </button>
      <table className="bg-white w-4/5 m-auto mt-6 border-separate border-spacing-2 border md:w-11/12 text-lg">
        <thead className="text-left">
          <tr className="bg-bgqueen-gray">
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            usersList !== undefined && usersList.map((user) => (
              <tr key={user.id} >
                <td className="border">{user.id}</td>
                <td className="border">{user.name}</td>
                <td className={`border`}>{user.email}</td>
                <td className=" text-center border">{user.role}</td>
            <td><i className="fa-solid fa-user-pen" onClick={() => { editUser(user) }}></i> <i className="fa-solid fa-user-xmark" onClick={() => {deleteEmployee(user.id)}}></i></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      < ModalAdmin isopen={isopen} setIsopen={setIsopen} action={action} information={information} />
    </section>
  );
}