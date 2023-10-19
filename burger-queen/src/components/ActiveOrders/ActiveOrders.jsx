import { getAllOrders } from "../../services/request";
import { showAlertError } from "../../alert/aler.js"
import { useState, useEffect } from "react";
import Modal from "./modal";
// import Swal from "sweetalert2"

export default function ActiveOrders() {
  const [allOrders, setOrders] = useState([]);

  const [productsModal, setProductsModal] = useState([]);

  const [isopen, setIsopen] = useState(false)

  

  function openModal (order) {
    setProductsModal(order);
    setIsopen(true);
  }

  function timeDuration(orderDataEntry){
    const hourLocalTime = parseInt(new Date().toLocaleString().slice(12, 14));
    const minutesLocalTime = parseInt(new Date().toLocaleString().slice(15, 17));
    const orderHour = parseInt(orderDataEntry.slice(12, 14));
    const orderMinutes = parseInt(orderDataEntry.slice(15, 17));

    if (hourLocalTime > orderHour) {
        if (minutesLocalTime >= orderMinutes) {
            return `${hourLocalTime - orderHour} h ${minutesLocalTime - orderMinutes} minutes`;
        } else {
            return ((hourLocalTime - orderHour - 1) * 60) > 1 ? `${(hourLocalTime - orderHour - 1) * 60} h ${60 - orderMinutes + minutesLocalTime} minutes`:`${60 - orderMinutes + minutesLocalTime} minutes`;
        }
    } else {
        return `${minutesLocalTime - orderMinutes} minutes`;
    }
  }

  useEffect(() => {
    getAllOrders(localStorage.getItem('token'))
      .then((response) => {
        // Calcula la duración al cargar los datos iniciales
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
                  <i className={`fa-solid ${order.status === 'pending' ? 'fa-caret-down': 'fa-check text-bgqueen-green disabled'}`}
                  onClick={()=> {
                    if(order.status === 'pending'){
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
                <td className={`border border-slate-300 ${order.duration > 20 ? 'text-bgqueen-red' : order.duration > 10 ? 'text-bgqueen-orange' : 'text-bgqueen-green'}`}>{order.duration}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Modal isopen={isopen} setIsopen={setIsopen} productsModal={productsModal} />
    </section>
  );
}