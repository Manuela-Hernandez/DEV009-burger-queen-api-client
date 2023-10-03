import './orders.css';
import { useNavigate } from 'react-router-dom';
export default function Root() {
  const navigateTo = useNavigate();
  function logOut () {
    localStorage.clear();
    navigateTo('/login');
  }
    return (
      <>
        <nav id='menu-bar'>
          <img src="https://i.postimg.cc/Nf0qKLPK/logoBQ.png" alt="Logo de Burger Queen"/>
          <p>{localStorage.name}</p>
          <img src="https://i.postimg.cc/g0ZT2WP6/exit-icon.png" alt="Icono de salida" id='exit-icon' onClick={logOut}/>
        </nav>
      </>
    );
}
/*<ul>
            <li>RESTAURANTE</li>
            <li>PEDIDOS</li>
          </ul>*/