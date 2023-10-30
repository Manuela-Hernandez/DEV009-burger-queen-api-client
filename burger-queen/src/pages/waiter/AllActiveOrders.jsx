import { getAllOrders } from "../../services/request";
import { showAlertError } from "../../alert/aler.js"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { timeDuration, filterOrders } from "../../services/tools";
import Modal from "../../components/ActiveOrders/Modal"



export default function AllActiveOrders() {
  const [allOrders, setOrders] = useState([]);
  const [productsModal, setProductsModal] = useState([]);
  const [isopen, setIsopen] = useState(false)

  const navigateTo = useNavigate();

  function openModal(order) {
    setProductsModal(order);
    setIsopen(true);
  }

  // }
  useEffect(() => {
    const axiosData = async () => {
      try {
        const filteredOrders = await filterOrders();
        setOrders(filteredOrders);
      } catch (error) {
        showAlertError(error.message);
      }
    };
    axiosData();

    // Establece un intervalo para actualizar la duración cada minuto
    const intervalId = setInterval(() => {
      setOrders((allOrders) => {
        return allOrders.map((order) => ({
          ...order,
          duration: timeDuration(order.dateProcessed),
        }));
      });
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <section className="w-full h-full">
      <button className="text-bgqueen-primary rounded-lg text-xl m-2 border border-2 border-bgqueen-primary font-bold ml-10 mt-4 px-4 justify-self-center w-auto h-12 "
        onClick={() => navigateTo('/waiter')}>
        Create new order 
        <i className="ml-2 fa-solid fa-plus"></i>
      </button>
      <table className="bg-white w-4/5 m-auto mt-6 border md:w-11/12 text-lg text-center ">
        <thead className="text-center ">
          <tr className="bg-bgqueen-secondary text-bgqueen-primary border border-bgqueen-cafe border-2">
            <th className="border-2 border-bgqueen-cafe">ID</th>
            <th className="border-2 border-bgqueen-cafe">CUSTOMER NAME</th>
            <th className="border-2 border-bgqueen-cafe">DURATION</th>
            <th className="border-2 border-bgqueen-cafe">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {
            allOrders.map((order) => (
              <tr key={order.id}>
                <td className="border">{order.id}</td>
                <td className="border">{order.client}</td>
                {
                  order.dateProcessed === undefined ?
                    <td className="border">On kitchen</td>
                    :
                    <td className={`border ${order.duration.days > 1 ? 'text-bgqueen-red' : ''} ${order.duration.hours > 1 ? (order.duration.hours > 15 ? 'text-bgqueen-orange' : 'text-bgqueen-red') : ''} ${order.duration.minutes < 15 ? 'text-bgqueen-green' : (order.duration.minutes >= 15 && order.duration.minutes < 25 ? 'text-bgqueen-orange' : 'text-bgqueen-red')}`}>
                      {order.duration.days >= 1 && `${order.duration.days} days, `}
                      {order.duration.hours >= 1 && `${order.duration.hours} hours, `}
                      {order.duration.minutes} minutes
                    </td>
                }

                <td className="text-center ">
                  {
                    order.status === 'ready' ?
                      <button className="bg-bgqueen-primary text-white rounded-md w-3/4 m-1 md:w-5/6 "
                        onClick={() => {
                          if (order.status === 'ready') {
                            openModal(order)
                          }
                        }} >DELIVER
                        <i className="fa-solid fa-burger fa-beat ml-4"></i>
                      </button>
                      : <i className="fa-regular fa-clock"></i>
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







