import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import NewOrder from "./NewOrder";
import Swal from "sweetalert2"
import axios from 'axios';

jest.mock('axios');
jest.mock('sweetalert2');

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
  useNavigate: () => mockedUseNavigate, // Crea un mock de useNavigate que lo inspecciona
}));

const productsMock = [
  { id: 1, 
    name: 'Sandwich de jamón y queso', 
    price: 1000, 
    image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png', 
    type: 'Desayuno', },
  { id: 2, 
    name: 'Café americano', 
    price: 500, 
    image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png', 
    type: 'Desayuno', },
  { id: 3, 
    name: 'Agua 500ml', 
    price: 500, 
    image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png', 
    type: 'Almuerzo', }
];

describe('NewOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // mockedUseNavigate.mockRestore();// limpia mock de useNavigate
  });
  it("Se muestra un mensaje al no ingresar nombre del cliente", async () => {
    axios.get.mockResolvedValueOnce({data : []});
    const mockFire = jest.spyOn(Swal, "fire");
    render(<NewOrder />);
    // const name = document.querySelector('#customerName');
    // fireEvent.change(name, { target: { value: 'Manuela' } });
    const btnConfirmOrder = document.querySelector("#btn-confirm-orden");
    fireEvent.click(btnConfirmOrder);

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({"icon": "error", "text": "Please enter the customer's name", "title": "Oops..."});
    });
  });

  it("Se muestra un mensaje al no agregar productos", async () => {
    axios.get.mockResolvedValueOnce({data : []});
    const mockFire = jest.spyOn(Swal, "fire");
    render(<NewOrder />);
    const name = document.querySelector('#customerName');
    fireEvent.change(name, { target: { value: 'Manuela' } });
    const btnConfirmOrder = document.querySelector("#btn-confirm-orden");
    fireEvent.click(btnConfirmOrder);

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({"icon": "error", "text": "Please select a product", "title": "Oops..."});
    });
  });

  it("Se muestra un mensaje  de error al guardar la orden", async () => {
    axios.get.mockResolvedValueOnce({data : productsMock});
    axios.post.mockRejectedValue({ response: {data : 'error'} });
    const mockFire = jest.spyOn(Swal, "fire");
    console.log(localStorage.getItem("token"));
    render(<NewOrder />);
    const name = document.querySelector('#customerName');
    fireEvent.change(name, { target: { value: 'Manuela' } });
    const btnLunch = document.querySelector("#btn-lunch");
    await act(async() => {
      fireEvent.click(btnLunch);
    });
    
    const btnWater = document.querySelector("#item-3");
    fireEvent.click(btnWater);
    const btnConfirmOrder = document.querySelector("#btn-confirm-orden");
    fireEvent.click(btnConfirmOrder);

    // screen.debug();

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({"icon": "error", "text": "An error has occurred", "title": "Oops..."});
    });
  });

  

});