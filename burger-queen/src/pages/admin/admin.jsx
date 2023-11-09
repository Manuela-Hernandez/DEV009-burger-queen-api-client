import { Outlet } from "react-router-dom";
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Dashboard from "./dashboard/AdminDashboard";

export default function Admin() {
  return (
    <>
      <header>
        <NavigationBar/>
      </header>
      <main>
        <Dashboard/>
      </main>
    </>
  )
}