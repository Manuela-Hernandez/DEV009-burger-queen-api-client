// import { getAllOrders } from "../../services/request";
// import { showAlertError } from "../../alert/aler.js"
import { useState, useEffect } from "react";
import Modal from "./modal";
import {timeDuration, filterOrders } from "../../services/tools"


export default function ActiveOrders() {

  const [allOrders, setOrders] = useState([]);
  
  const [productsModal, setProductsModal] = useState([]);
  const [isopen, setIsopen] = useState(false);

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
        showAlertError(error.message);
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
      <table className="bg-white w-4/5 m-auto mt-6 border-separate border md:w-11/12 text-lg">
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
            allOrders.map((order) => (
              <tr key={order.id}>
                <td className="border">{order.id}</td>
                <td className="border">{order.dataEntry}</td>
                <td className={`border ${order.duration[0] > 1 || order.duration[1] > 20 && order.duration[0] < 1 ? 'text-bgqueen-red' : order.duration[1] > 15 && order.duration[0] < 1 ? 'text-bgqueen-orange' : 'text-bgqueen-green'}`}>{order.duration[0] > 0 ? `${order.duration[0]} hours ${order.duration[1]} minutes` : `${order.duration[1]} minutes`}</td>
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