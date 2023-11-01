import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/request";
import { showAlertError } from "../../../alert/aler";
import ModalAdmin from "../../../components/ModalAdmin/ModalAdmin";

export default function AllUsers() {

  const [isopen, setIsopen] = useState(false);

  const [usersList, setUsers] = useState([]);

  function openModalAdmin() {
    setIsopen(true);
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
  return (
    <section className="w-full h-full">
      <h2 className="text-3xl text-center text-bgqueen-primary font-titles font-bold">Employees</h2>
      <button className="text-bgqueen-primary rounded-lg text-xl m-2 border border-2 border-bgqueen-primary font-text-primary" onClick={openModalAdmin}>
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
                <td><i className="fa-solid fa-user-pen"></i> <i className="fa-solid fa-user-xmark"></i></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      < ModalAdmin isopen={isopen} setIsopen={setIsopen} />
    </section>
  );
}