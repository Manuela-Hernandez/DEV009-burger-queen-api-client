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
      <section className="w-80 h-200 bg-bgqueen-secondary">
        ORDERS
      </section>
    );
  }