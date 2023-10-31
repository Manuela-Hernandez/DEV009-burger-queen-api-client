import { getAllOrders } from "./request";
import { showAlertError } from "../alert/aler"


export function timeDuration(orderDataEntry) {
  const localDate = new Date();
  const dateOrder = new Date(orderDataEntry);
  const result = localDate - dateOrder;

  const days = Math.floor(result / (24 * 60 * 60 * 1000));

  const hoursRemaining = (result % (24 * 60 * 60 * 1000));
  const hours = Math.floor(hoursRemaining / (60 * 60 * 1000));

  const minutesRemaining = hoursRemaining % (60 * 60 * 1000);
  const minutes = Math.floor(minutesRemaining / (60 * 1000));

  return {
    days,
    hours,
    minutes
  };
}

export async function filterOrders() {
  try {
    const response = await getAllOrders(localStorage.getItem('token'));
    const ordersWithDurations = response.data
      .filter((order) => order.status !== 'delivered')
      .map((order) => ({
        ...order,
        duration: timeDuration(localStorage.getItem('role') === "chef" ? order.dataEntry : order.dateProcessed),
      }))
    return ordersWithDurations;
  } catch (error) {
    showAlertError("An error has occurred while obtaining the list of orders");
  }
}