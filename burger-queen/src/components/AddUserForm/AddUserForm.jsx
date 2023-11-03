import { useState } from "react";
import { addUser } from "../../services/request";
import { completed, showAlertError, warning } from "../../alert/aler";

export default function AddUserForm({setIsopen, usersList, setUsers}) {

  const [nameUser, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Role');

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(nameUser);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    console.log( role);
  };
  function saveUser(){
    if(role !== 'Role' && nameUser.length > 0){
      addUser(localStorage.token, nameUser, email, password, role)
      .then((response) => {
        //console.log(response);
        setIsopen(false);
        completed('The user has been saved.');
        // setUsers(usersList.push({name: nameUser, email: email, password: password, role: role}))

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
        <input
          type="password"
          name="password"
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
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
          onClick={saveUser}
          id='save-btn'>
          Save
        </button>
      </form>
    </>
  );
}