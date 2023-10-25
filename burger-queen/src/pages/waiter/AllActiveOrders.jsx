import { getAllOrders } from "../../services/request";
import { showAlertError } from "../../alert/aler.js"
import { useState, useEffect } from "react";


export default function AllActiveOrders() {
  const [allOrders, setOrders] = useState([]);
  //const [productsModal, setProductsModal] = useState([]);
  const [isopen, setIsopen] = useState(false)
//   function openModal(order) {
//     setProductsModal(order);
//     setIsopen(true);
//   }
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
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <section className="w-full h-full">
      <table className="bg-white w-4/5 m-auto mt-6 border-separate border md:w-11/12 text-lg">
        <thead className="text-left">
          <tr className="bg-bgqueen-gray">
            <th>ID</th>
            <th>CUSTOMER NAME</th>
            <th>REGISTER</th>
            <th>DURATION</th>
            <th>STATUS</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {
            allOrders.map((order) => (
              <tr key={order.id}>
                <td className="border">{order.id}</td>
                <td className="border">{order.client}</td>
                <td className="border">{order.dataEntry}</td>
                <td className={`border ${order.duration[0] > 1 || order.duration[1] > 20 && order.duration[0] < 1 ? 'text-bgqueen-red' : order.duration[1] > 15 && order.duration[0] < 1 ?  'text-bgqueen-orange' : 'text-bgqueen-green'}`}>{order.duration[0] > 0 ? `${order.duration[0]} hours ${order.duration[1]} minutes` : `${order.duration[1]} minutes`}</td>
                {/* <td className="border">{order.status}</td> */}
                <td className=" text-center border">
                  {
                    order.status === 'ready' ?
                        <button className="bg-bgqueen-primary text-white rounded-md w-3/4 m-1 md:w-5/6 "
                            onClick={() => {
                                if (order.status === 'pending') {
                                //openModal(order)
                                }
                            }} >DELIVER
                            <i className="fa-solid fa-burger fa-beat ml-4"></i>
                            {/* <i className={'fa-solid ml-2 fa-caret-down'} id={`details-${order.id}`}></i> */}
                        </button>
                        : <i className="fa-regular fa-clock"></i>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* <Modal isopen={isopen} setIsopen={setIsopen} productsModal={productsModal} /> */}
    </section>
  );
}







