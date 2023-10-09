import { useNavigate } from 'react-router-dom';
import AddProductToOrder from '../../components/AddProductsToOrder/AddProductsToOrder';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import ResumenPedidos from '../../components/ResumenPedidos/Resumen'
export default function Root() {
  return (
    <>
      <NavigationBar />
      <br />
      <section>
        br
      </section>
      <div className="grid grid-cols-2 grid-rows-1">
      <AddProductToOrder />
      <ResumenPedidos />
      </div>
    </>
  );
}