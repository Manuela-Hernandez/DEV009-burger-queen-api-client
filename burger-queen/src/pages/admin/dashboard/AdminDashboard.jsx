import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const navigateTo = useNavigate();
    function navigateToMenu(){
        navigateTo('products')
    }
    function navigateToUsers(){
        navigateTo('employees')
    }
  return (
    <>
      Dashboard

      <button onClick={navigateToUsers} >
      <i className="fa-solid fa-user text-9xl"></i><br />
      Manage users
      </button>

      <button onClick={navigateToMenu}>
      <i className="fa-solid fa-burger text-9xl"></i>Menu</button>
    </>
  )
}