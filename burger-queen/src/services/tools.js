import { getAllOrders } from "./request";
import { showAlertError } from "../alert/aler"


export function timeDuration(orderDataEntry) {
  const hourLocalTime = parseInt(new Date().toLocaleString().slice(-8, -6));
  const minutesLocalTime = parseInt(new Date().toLocaleString().slice(-5, -3));
  const orderHour = parseInt(orderDataEntry.slice(-8, -6));
  const orderMinutes = parseInt(orderDataEntry.slice(-5, -3));
  const duration = [0, 0];
  if (hourLocalTime > orderHour) {
    if (minutesLocalTime >= orderMinutes) {
      duration[0] = hourLocalTime - orderHour;
      duration[1] = minutesLocalTime - orderMinutes;

    } else {
      duration[0] = ((hourLocalTime - orderHour - 1) * 60) > 1 ? (hourLocalTime - orderHour - 1) : 0;
      duration[1] = (60 - orderMinutes + minutesLocalTime);
    }
  } else {
    duration[1] = minutesLocalTime - orderMinutes;
  }
  return duration;
}


export async function filterOrders() {
  try {
    const response = await getAllOrders(localStorage.getItem('token'));
    const ordersWithDurations = response.data
      .filter((order) => order.status !== 'delivered')
      .map((order) => ({
        ...order,
        duration: timeDuration(order.dataEntry),
      }))
    return ordersWithDurations;

  } catch (error) {
    showAlertError("An error has occurred while obtaining the list of orders");
  }
}