import { useState } from "react";
import { addUser } from "../../services/request";

export default function AddUserForm() {

  const [nameUser, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Role');

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log( nameUser);
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
    console.log(role);
    if(role !== 'Role'){
      addUser(localStorage.token, nameUser, email, password, role)
      .then((response) => {
        console.log(response);
        console.log('Usuario guardado');
      })
      .catch((error)=>{
        console.log(error.response.data);
        console.log('Usuario NO guardado');
      })
    } else {
      console.log('Selecciona un rol');
    }
  }
  return (
    <>
      <h2 className="text-4xl text-bgqueen-primary text-center font-bold">User</h2>
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
          <option>
            Role
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
          className="bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-xl"
          onClick={saveUser}
          id='save-btn'>
          Save
        </button>
      </form>
    </>
  );
}