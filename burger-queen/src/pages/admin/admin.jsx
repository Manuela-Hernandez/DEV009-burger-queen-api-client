import { Outlet } from "react-router-dom";
import NavigationBar from '../../components/NavigationBar/NavigationBar';

export default function Admin() {
  return (
    <>
      <header>
        <NavigationBar/>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}