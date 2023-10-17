import { getAllOrders } from "../../services/request";
import { showAlertError } from "../../alert/aler.js"
import { useState, useEffect } from "react";

export default function ActiveOrders() {
  const [allOrders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders(localStorage.getItem('token'))
      .then((response) => {
        // Actualiza el estado con los productos obtenidos
        setOrders(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        showAlertError("An error has occurred while obtaining list of orders");
      });
  }, []); // El segundo argumento, [], asegura que se ejecute una sola vez cuando el componente se monta
  return (
    <section className="w-full h-full bg-white">
      <table className="bg-white w-4/5 m-auto border-separate  border border-slate-400 ...">
        <thead className="text-left">
          <tr className="bg-bgqueen-gray">
            <th className="border border-slate-300 ...">DETAILS</th>
            <th className="border border-slate-300 ...">ID</th>
            <th className="border border-slate-300 ...">CLIENT</th>
            <th className="border border-slate-300 ...">STATUS</th>
            <th className="border border-slate-300 ...">REGISTER</th>
            <th className="border border-slate-300 ...">DURATION</th>
          </tr>
        </thead>
        <tbody>
          {
            allOrders.map((order) => (
              <tr key={order.id}>
                <td className=" text-center border border-slate-300 ..."><i className="fa-solid fa-chevron-down"></i></td>
                <td className="border border-slate-300 ...">{order.id}</td>
                <td className="border border-slate-300 ...">{order.client}</td>
                <td className="border border-slate-300 ...">{order.status}</td>
                <td className="border border-slate-300 ...">{order.dataEntry}</td>
                <td className="border border-slate-300 ...">10 minutes</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}