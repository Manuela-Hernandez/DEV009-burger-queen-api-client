import { useNavigate } from 'react-router-dom';
import AddProductToOrder from '../../components/AddProductsToOrder/AddProductsToOrder';
import ResumenPedidos from '../../components/ResumenPedidos/Resumen'
export default function Root() {
  const navigateTo = useNavigate();
  function logOut() {
    localStorage.clear();
    navigateTo('/login');
  }
  return (
    <>
      <nav id="menu-bar"
        className="grid grid-cols-3 grid-rows-1 bg-bgqueen-secondary items-center h-24">
        <img src="https://i.postimg.cc/Nf0qKLPK/logoBQ.png"
          alt="Logo de Burger Queen"
          className="h-full" />
        <p className="justify-self-center text-3xl text-bgqueen-primary text-bold">{localStorage.name}</p>
        <img src="https://i.postimg.cc/g0ZT2WP6/exit-icon.png"
          alt="Icono de salida" id="exit-icon"
          className="h-1/2 justify-self-end"
          onClick={logOut} />
      </nav>
      <div className="grid grid-cols-2 grid-rows-1">
      <AddProductToOrder />
      <ResumenPedidos />
      </div>
    </>
  );
}
