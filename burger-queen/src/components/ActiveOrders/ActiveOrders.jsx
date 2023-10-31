// import { getAllOrders } from "../../services/request";
// import { showAlertError } from "../../alert/aler.js"
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { timeDuration, filterOrders } from "../../services/tools"


export default function ActiveOrders() {

  const [allOrders, setOrders] = useState([]);

  const [productsModal, setProductsModal] = useState([]);
  const [isopen, setIsopen] = useState(false);

  // const [elapsedTime, setElapsedTime] = useState({ days: 0, hours: 0, minutes: 0 });

  function openModal(order) {
    setProductsModal(order);
    setIsopen(true);
  }


  useEffect(() => {
    const axiosData = async () => {
      try {
        const filteredOrders = await filterOrders();
        setOrders(filteredOrders);
      } catch (error) {
        //showAlertError(error.message);
      }
    };
    axiosData();

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
      <table className="bg-white w-4/5 m-auto mt-6 border-separate border-spacing-2 border md:w-11/12 text-lg">
        <thead className="text-left">
          <tr className="bg-bgqueen-gray">
            <th>ID</th>
            <th>REGISTER</th>
            <th>DURATION</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {
             allOrders !== undefined && allOrders.map((order) => (
              <tr key={order.id} >
                <td className="border">{order.id}</td>
                <td className="border">{new Date(order.dataEntry).toLocaleString()}</td>
                <td className={`border ${order.duration.days > 1 ? 'text-bgqueen-red' : ''} ${order.duration.hours > 1 ? (order.duration.hours > 15 ? 'text-bgqueen-orange' : 'text-bgqueen-red') : ''} ${order.duration.minutes < 15 ? 'text-bgqueen-green' : (order.duration.minutes >= 15 && order.duration.minutes < 25 ? 'text-bgqueen-orange' : 'text-bgqueen-red')}`}>
                  {order.duration.days >= 1 && `${order.duration.days} days, `}
                  {order.duration.hours >= 1 && `${order.duration.hours} hours, `}
                  {order.duration.minutes} minutes
                </td>
                <td className=" text-center border">
                  {
                    order.status === 'pending' ?
                      <button className="bg-bgqueen-primary text-white rounded-md w-3/4 m-1 md:w-5/6"
                        onClick={() => {
                          if (order.status === 'pending') {
                            openModal(order)
                          }
                        }} >START ORDER
                        <i className={'fa-solid ml-2 fa-caret-down'} id={`details-${order.id}`}></i>
                      </button>
                      : <p><i className={'fa-solid ml-2 fa-check text-bgqueen-green'}> </i> Ready to delivery</p>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Modal isopen={isopen} setIsopen={setIsopen} productsModal={productsModal} />
    </section>
  );
}