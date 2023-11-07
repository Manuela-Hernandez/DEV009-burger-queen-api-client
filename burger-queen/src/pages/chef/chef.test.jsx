import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import Chef from "./chef.jsx";
import axios from 'axios';
import Swal from "sweetalert2";

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
    {id: '1', userId: '4321', client: 'Manuela', products: orderTest.products, status: "pending", dataEntry: '2023-10-13T12:00:00.000Z'},
    {id: '2', userId: '4321', client: 'Brenda', products: orderTest.products, status: "pending", dataEntry: '2023-10-13T11:45:00.000Z' },
    {id: '3', userId: '4321', client: 'Armando', products: orderTest.products, status: "pending", dataEntry: '2023-10-13T10:05:00.000Z'},
    {id: '4', userId: '4321', client: 'Oscar Reyes', products: orderTest.products, status: "ready", dataEntry: '2023-10-11T10:15:00.000Z' }
];

describe('Chef', () => {
    afterAll(() => {
        // Restaurar la fecha original después de todas las pruebas
        global.Date = originalDate;
    });
    beforeEach(() => {
        jest.clearAllMocks();
        mockedUseNavigate.mockRestore();
    });
    it("Debería modificar el estado de la orden", async () => {
        localStorage.setItem('token', '6543210');
        localStorage.setItem('id', '4321');
        localStorage.setItem('role', 'chef');
        axios.get.mockResolvedValue({ data: dataTest });
        axios.patch.mockResolvedValue('Cambio hecho')

        await act(async () => { // Envuelve la renderización en act
            render(<Chef />);
        });
        //screen.debug();
        const btnDetails = document.querySelector('#details-1');

        fireEvent.click(btnDetails);

        const checkboxProduct = document.querySelector('#product-0');

        fireEvent.click(checkboxProduct);
        fireEvent.click(checkboxProduct);
        fireEvent.click(checkboxProduct);

        const setReady = screen.getByText('READY')

        await act(async()=>{
            fireEvent.click(setReady);
        });        
        await waitFor(() => {
            expect(axios.patch).toBeCalledTimes(1);
            expect(axios.patch).toBeCalledWith("http://localhost:8080/orders/1", { "dateProcessed": new Date('2023-10-13T12:15:00.000Z'), "status": "ready", }, { "headers": { "Authorization": "Bearer 6543210" } });
    
            expect(Swal.fire).toBeCalledTimes(1);
            expect(Swal.fire).toBeCalledWith({
                "title": "process successfully",
                "text": "Your order status has been changed.",
                "icon": "success",
                "showConfirmButton": false,
                "timer": 1500
              });
        });
    });
    it("Debería mostrar un mensaje cuando no se guarda la orden", async () => {
        localStorage.setItem('token', '123456');
        localStorage.setItem('id', '4321');
        localStorage.setItem('role', 'chef');
        axios.get.mockResolvedValue({ data: dataTest });
        axios.patch.mockRejectedValue('Cambio no hecho')

        await act(async () => { // Envuelve la renderización en act
            render(<Chef />);
        });
        
        const btnDetails = document.querySelector('#details-2');

        fireEvent.click(btnDetails);

        const checkboxProduct = document.querySelector('#product-0');

        fireEvent.click(checkboxProduct);

        const setReady = screen.getByText('READY')

        await act(async()=>{
            fireEvent.click(setReady);
        });      
        //console.log('se pone hora: ', new Date('2023-10-11T10:15:00.000Z'));
        //console.log('NO se pone hora: ', new Date());
        await waitFor(() => {
            expect(axios.patch).toBeCalledTimes(1);
            expect(axios.patch).toBeCalledWith("http://localhost:8080/orders/2", { "dateProcessed": new Date('2023-10-13T12:15:00.000Z'), "status": "ready", }, { "headers": { "Authorization": "Bearer 123456" } });
    
            expect(Swal.fire).toBeCalledTimes(1);
            expect(Swal.fire).toBeCalledWith({
                    "icon": "error",
                    "title": "Oops...",
                    "text": "An error has occurred while status was changing",
                  });
            //const errorMessage = screen.getByText('An error has occurred while status was changing');
            //expect(errorMessage).toBeInTheDocument();
        });
    });
    it("Debería poder abrir y cerrar la ventana de atención al pedido", async () => {
        jest.useFakeTimers();
        localStorage.setItem('token', '123456');
        localStorage.setItem('id', '4321');
        axios.get.mockResolvedValue({ data: dataTest });
        Swal.fire.mockResolvedValue({ isConfirmed: true });

        await act(async () => { 
            render(<Chef />);
        });
        
        const btnDetails = document.querySelector('#details-1');

        fireEvent.click(btnDetails);

        const closeModal = document.querySelector('#button-close-order')

        await act(async()=>{
            fireEvent.click(closeModal);
            jest.advanceTimersByTime(60001);
        });
        await waitFor(() => {
            expect(Swal.fire).toBeCalledTimes(1);
            expect(Swal.fire).toBeCalledWith({
                "title": 'Are you sure?',
                "text": "You won't be able to revert this, any changes made will be lost!",
                "icon": "question",
                "showCancelButton": true,
                "confirmButtonColor": "#28a745",
                "cancelButtonColor": '#d33',
                "confirmButtonText": "Yes, close it!"
              });

        });
    });
    it("Debería mostrar mensaje de error dado que no se ha puesto check a todos los productos", async () => {
        localStorage.setItem('token', '123456');
        localStorage.setItem('id', '4321');
        axios.get.mockResolvedValue({ data: dataTest });

        await act(async () => { // Envuelve la renderización en act
            render(<Chef />);
        });
        const btnDetails = document.querySelector('#details-1');

        fireEvent.click(btnDetails);

        const setReady = document.querySelector('#button-set-ready')

        await act(async()=>{
            fireEvent.click(setReady);
        });
        await waitFor(() => {
            expect(Swal.fire).toBeCalledTimes(1);
            expect(Swal.fire).toBeCalledWith({
                    "icon": "error",
                    "title": "Oops...",
                    "text": "All the products have to be checked",
                  });
        });
    });
    it("Debería mostrar un mensaje de error cuando no se pueden obtener los pedidos de la API", async () => {
        localStorage.setItem('token', '123456');
        localStorage.setItem('id', '4321');
        axios.get.mockRejectedValue({ response: { data: 'error' } });

        await act(async () => {
            render(<Chef />);
        });
        await waitFor(() => {
            expect(Swal.fire).toBeCalledTimes(1);
            expect(Swal.fire).toBeCalledWith({
                "icon": "error",
                "title": "Oops...",
                "text": "An error has occurred while obtaining the list of orders",
              });
        });
    });
});