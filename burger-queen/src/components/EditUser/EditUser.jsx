import { useEffect, useState } from "react";
import { editUser } from "../../services/request";
import { completed, showAlertError, warning } from "../../alert/aler";

export default function AddUserForm({setIsopen, information = [], usersList, setUsers}) {

  const [nameUser, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Role');

  useEffect(() => {
    setName(information.name);
    setEmail(information.email);
    setRole(information.role)
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(nameUser);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    console.log( role);
  };
  function saveChanges(){
    console.log(information);
    if(role !== 'Role' && nameUser.length > 0){
      editUser(localStorage.token, nameUser, email, role, information.id)
      .then(() => {
        setIsopen(false);
        completed('The user information has been changed.');
        setUsers(usersList.map((user) => {
          if(user.id === information.id) {
            user.name = nameUser;
            user.email = email;
            user.role = role;
          }
          return user
        }))

      })
      .catch((error)=>{
        showAlertError(error.response.data);
      })
    } else {
      if(role === 'Role') {
        warning('Please select a employee role.')
      } else {
        showAlertError('Please enter the employee name.')
      }
    }
  }
  return (
    <>
      <h2 className="text-4xl text-bgqueen-primary text-center font-bold">Edit user</h2>
      <form className="w-4/5 mt-5 flex flex-col gap-y-4 items-center">
        <input
          type="text"
          name="name"

          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          placeholder="Name"
          value={nameUser}
          onChange={handleNameChange}
        />
        <input
          type="email"
          name="email"
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <select
          name="role"
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          value={role}
          onChange={handleRoleChange}
        >
          <option value='Role'>
            Select a role
          </option>
          <option value="waiter">
            Waiter
          </option>
          <option value="chef">
            Chef
          </option>
          <option value="admin">
            Admin
          </option>
        </select>
        <button
          type="button"
          className="bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-xl mb-3"
          onClick={saveChanges}
          id='save-btn'>
          Save
        </button>
      </form>
    </>
  );
}