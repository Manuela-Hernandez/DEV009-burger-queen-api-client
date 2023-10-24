import { getAllOrders } from "../../services/request";
import { showAlertError } from "../../alert/aler.js"
import { useState, useEffect } from "react";
import Modal from "./modal";
// import Swal from "sweetalert2"

export default function ActiveOrders() {
  const [allOrders, setOrders] = useState([]);

  const [productsModal, setProductsModal] = useState([]);

  const [isopen, setIsopen] = useState(false)



  function openModal(order) {
    setProductsModal(order);
    setIsopen(true);
  }

  function timeDuration(orderDataEntry) {
    const hourLocalTime = parseInt(new Date().toLocaleString().slice(-8, -6));
    const minutesLocalTime = parseInt(new Date().toLocaleString().slice(-5, -3));
    const orderHour = parseInt(orderDataEntry.slice(-8, -6));
    const orderMinutes = parseInt(orderDataEntry.slice(-5, -3));
    const duration = [ 0, 0];
    if (hourLocalTime > orderHour) {
      if (minutesLocalTime >= orderMinutes) {
        duration [0] = hourLocalTime - orderHour;
        duration [1] = minutesLocalTime - orderMinutes;

      } else {
        duration [0] = ((hourLocalTime - orderHour - 1) * 60) > 1 ? (hourLocalTime - orderHour - 1) : 0;
        duration [1] = (60 - orderMinutes + minutesLocalTime);
      }
    } else {
      duration [1] = minutesLocalTime - orderMinutes;
    }
    return duration;
  }

  useEffect(() => {
    getAllOrders(localStorage.getItem('token'))
      .then((response) => {
        const ordersWithDurations = response.data
          .filter((order) => order.status !== 'delivered')
          .map((order) => ({
            ...order,
            duration: timeDuration(order.dataEntry),
          }));
        setOrders(ordersWithDurations);
      })
      .catch((error) => {
        showAlertError("An error has occurred while obtaining list of orders");
      });

    // Establece un intervalo para actualizar la duración cada minuto
    const intervalId = setInterval(() => {
      setOrders((allOrders) => {
        return allOrders.map((order) => ({
          ...order,
          duration: timeDuration(order.dataEntry),
        }));
      });
    }, 60000);

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="w-full h-full">
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
                <td className=" text-center border border-slate-300 ...">
                  <i className={`fa-solid ${order.status === 'pending' ? 'fa-caret-down' : 'fa-check text-bgqueen-green disabled'}`}
                    id={`details-${order.id}`}
                    onClick={() => {
                      if (order.status === 'pending') {
                        openModal(order)
                      }
                    }}>
                  </i>
                </td>
                <td className="border border-slate-300 ...">{order.id}</td>
                <td className="border border-slate-300 ...">{order.client}</td>
                <td className="border border-slate-300 ...">{order.status}</td>
                <td className="border border-slate-300 ...">{order.dataEntry}</td>
                {
                  // verificar validacions para colores 
                }
                <td className={`border border-slate-300 ${order.duration[0] > 1 || order.duration[1] > 20 && order.duration[0] < 1 ? 'text-bgqueen-red' : order.duration[1] > 15 && order.duration[0] < 1 ?  'text-bgqueen-orange' : 'text-bgqueen-green'}`}>{order.duration[0] > 0 ? `${order.duration[0]} hours ${order.duration[1]} minutes` : `${order.duration[1]} minutes`}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Modal isopen={isopen} setIsopen={setIsopen} productsModal={productsModal} />
    </section>
  );
}