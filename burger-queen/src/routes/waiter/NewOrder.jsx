import { useNavigate } from 'react-router-dom';
import AddProductToOrder from '../../components/AddProductsToOrder/AddProductsToOrder';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

export default function Root() {
  return (
    <>
      <NavigationBar />
      <br />
      <section>
        br
      </section>
      <AddProductToOrder />
    </>
  );
}