import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AllOrders from './AllActiveOrders';
import axios from 'axios';
import Swal from "sweetalert2";
import { act } from 'react-dom/test-utils';

jest.mock('sweetalert2');
jest.mock('axios');

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
    useNavigate: () => mockedUseNavigate, // Crea un mock de useNavigate que lo inspecciona
}));

const originalDate = Date;
global.Date = class extends Date {
    constructor() {
        return new originalDate('2023-10-13T12:15:00Z'); // Establece la fecha actual deseada
    }
};

const orderTest = {
    products: [{
        product: {
            id: 3,
            name: 'Agua 500ml',
            price: 500,
            image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png',
            type: 'Almuerzo',
        },
        qty: 3,
        subtotal: 1500
    }],
    total: 1500,
};
const dataTest = [
    {id: '1', userId: '4321', client: 'Manuela', products: orderTest.products, status: "pending", dataEntry: '13/10/2023, 06:00:00',},
    {id: '2', userId: '4321', client: 'Brenda', products: orderTest.products, status: "pending", dataEntry: '13/10/2023, 05:45:00', },
    {id: '3', userId: '4321', client: 'Armando', products: orderTest.products, status: "pending", dataEntry: '13/10/2023, 04:05:00', },
    {id: '4', userId: '4321', client: 'Oscar Reyes', products: orderTest.products, status: "ready", dataEntry: '11/10/2023, 04:35:00', dateProcessed: new Date('2023-10-11T05:15:00.000Z') }
];


describe('AllActiveOrders', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedUseNavigate.mockRestore();// limpia mock de useNavigate
      });
    it('Deberia redirigir a /waiter', async()=>{
        localStorage.setItem('token', '6543210');
        localStorage.setItem('id', '4321');
        localStorage.setItem('role', 'chef');

        axios.get.mockResolvedValue({ data: dataTest });

        await act(async () => { // Envuelve la renderización en act
            render(<AllOrders />);
        });
        fireEvent.click(screen.getByText('Create new order'));

        await waitFor(() => {
            expect(mockedUseNavigate).toBeCalledTimes(1);
            expect(mockedUseNavigate).toBeCalledWith('/waiter');
          });
    });
    it('Deberia llamar a axios con el estado -delivered-', async()=>{
        localStorage.setItem('token', '6543210');
        localStorage.setItem('id', '4321');
        localStorage.setItem('role', 'waiter');

        axios.get.mockResolvedValue({ data: dataTest });
        axios.patch.mockResolvedValue('Cambio hecho')
        await act(async () => { // Envuelve la renderización en act
            render(<AllOrders />);
        });
        fireEvent.click(screen.getByText('DELIVER'));

        fireEvent.click(screen.getByLabelText('3 Agua 500ml'));

        fireEvent.click(screen.getByText('DELIVER ORDER'));

        await waitFor(() => {
            expect(axios.patch).toBeCalledTimes(1);
            expect(axios.patch).toBeCalledWith("http://localhost:8080/orders/4", { "dateProcessed": new Date('2023-10-13T12:15:00.000Z'), "status": "delivered", }, { "headers": { "Authorization": "Bearer 6543210" } });
    
            // expect(Swal.fire).toBeCalledTimes(1);
            expect(Swal.fire).toBeCalledWith({
                "title": "process successfully",
                "text": "Your order status has been changed.",
                "icon": "success",
                "showConfirmButton": false,
                "timer": 1500
              });
        });
        // screen.debug();
    });
    it('Deberia transcurrir 1 minuto para la modificacion de hora', async()=>{
        jest.useFakeTimers();
        localStorage.setItem('token', '6543210');
        localStorage.setItem('id', '4321');
        localStorage.setItem('role', 'waiter');

        axios.get.mockResolvedValue({ data: dataTest });
        await act(async () => { // Envuelve la renderización en act
            render(<AllOrders />);
        });
        await act(async()=>{
            jest.advanceTimersByTime(60001);
        });
         // screen.debug();
    });
})