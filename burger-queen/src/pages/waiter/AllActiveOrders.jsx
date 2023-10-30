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
      <button className="bg-bgqueen-primary text-white rounded-lg text-xl ml-10 mt-4 px-4 justify-self-center w-auto h-12"
        onClick={() => navigateTo('/waiter')}>
        Create new order
      </button>
      <table className="bg-white w-4/5 m-auto mt-6 border md:w-11/12 text-lg text-center ">
        <thead className="text-center ">
          <tr className="bg-bgqueen-secondary text-bgqueen-primary border border-bgqueen-cafe border-2">
            <th className="border-2 border-bgqueen-cafe">ID</th>
            <th className="border-2 border-bgqueen-cafe">CUSTOMER NAME</th>
            <th className="border-2 border-bgqueen-cafe">DURATION</th>
            <th className="border-2 border-bgqueen-cafe">STATUS</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {
            allOrders.map((order) => (
              <tr key={order.id}>
                <td className="border">{order.id}</td>
                <td className="border">{order.client}</td>
                {/* <td className="border">{order.dataEntry}</td> */}
                <td className={`border ${order.duration.days > 1 ? 'text-bgqueen-red' : ''} ${order.duration.hours > 1 ? (order.duration.hours > 15 ? 'text-bgqueen-orange' : 'text-bgqueen-red') : ''} ${order.duration.minutes < 15 ? 'text-bgqueen-green' : (order.duration.minutes >= 15 && order.duration.minutes < 25 ? 'text-bgqueen-orange' : 'text-bgqueen-red')}`}>
                  {order.dateProcessed === undefined && ` en proceso `}
                  {order.dateProcessed !== undefined && order.duration.days >= 1 && `${order.duration.days} days, `}
                  {order.dateProcessed !== undefined &&  order.duration.hours >= 1 && `${order.duration.hours} hours, `}
                  {order.dateProcessed !== undefined && ` ${order.duration.minutes} minutes`}
                </td>
                {/* <td className={`border ${order.duration[0] > 1 || order.duration[1] > 20 && order.duration[0] < 1 ? 'text-bgqueen-red' : order.duration[1] > 15 && order.duration[0] < 1 ? 'text-bgqueen-orange' : 'text-bgqueen-green'}`}>{order.duration[0] > 0 ? `${order.duration[0]} hours ${order.duration[1]} minutes` : `${order.duration[1]} minutes`}</td> */}
                {/* <td className="border">{order.status}</td> */}
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
      <Modal isopen={isopen} setIsopen={setIsopen} productsModal={productsModal} />
    </section>
  );
}







