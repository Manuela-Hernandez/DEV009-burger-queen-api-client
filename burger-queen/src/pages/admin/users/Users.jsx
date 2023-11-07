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
    //console.log(user);
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
        showAlertError("An error has occurred while obtaining list of users");
      });
  }, []);

  async function deleteEmployee(id) {
    const reultAlert = await questionDelete()
    if (reultAlert.isConfirmed) {
      deleteUser(localStorage.token, id)
        .then(() => {
          completed("The user has been deleted.");
          setUsers(usersList.filter((user) => user.id !== id))
        })
        .catch(() => {
          showAlertError("An error has occurred deleting the user");
        })
    }
  }


  return (
    <section className="w-full h-full">
      <section className="grid grid-cols-2 m-auto mt-8 md:w-11/12">
        <h2 className="caption-top text-3xl text-center text-bgqueen-primary justify-self-start font-semibold">Employees</h2>
        <button className="text-bgqueen-primary rounded-lg text-xl border border-2 border-bgqueen-primary font-text-primary p-2 justify-self-end w-40"
          onClick={addUser}>
          Add user
          <i className="fa-solid fa-user-plus ml-2"></i>
        </button>
      </section>
      <table className="bg-white m-auto mt-4 border-separate border-spacing-1 border md:w-11/12 text-lg">
        <thead className="text-left">
          <tr className="bg-bgqueen-secondary text-bgqueen-primary font-black">
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
                <td className="border text-center grid grid-cols-2 justify-around content-center ">
                  <i className="fa-solid fa-user-pen text-xl" data-testid={`edit-users-${user.id}`} onClick={() => { editUser(user) }}></i>
                  <i className="fa-solid fa-user-xmark text-xl" onClick={() => { deleteEmployee(user.id) }}></i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      < ModalAdmin isopen={isopen} setIsopen={setIsopen} action={action} information={information} usersList={usersList} setUsers={setUsers} />
    </section>
  );
}