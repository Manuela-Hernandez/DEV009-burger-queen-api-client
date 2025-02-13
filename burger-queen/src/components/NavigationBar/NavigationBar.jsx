import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
  const navigateTo = useNavigate();
  function logOut() {
    localStorage.clear();
    navigateTo('/login');
  }
  return (
    <nav id="menu-bar"
      className="grid grid-cols-5 grid-rows-1 bg-bgqueen-primary items-center h-24">
      <img src="https://i.postimg.cc/Nf0qKLPK/logoBQ.png"
        alt="Logo de Burger Queen"
        className="h-full" />
      <p className="justify-self-center text-4xl text-white font-titles col-span-3">
        <i className={`fa-solid ${localStorage.role === "admin" ? "fa-user-tie" : localStorage.role === "chef" ? "fa-bell-concierge" : "fa-user"}`}>
        </i> {localStorage.name}</p>
      <i className=" text-white text-5xl fa-solid fa-right-to-bracket justify-self-end cursor-pointer mr-4"
        id="exit-icon"
        onClick={logOut} ></i>

    </nav>
  );
}