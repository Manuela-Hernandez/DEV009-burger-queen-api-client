import { render, screen, fireEvent, waitFor , act} from "@testing-library/react";
import NewOrder from "./NewOrder";
import axios from 'axios';
import Swal from "sweetalert2";
import sweetalert2 from 'sweetalert2';
import * as request from '../../services/request.jsx'

const productsMock = [
    {id: 1, name: 'Sandwich de jamón y queso', price: 1000, image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png', type: 'Desayuno',},
    {id: 2, name: 'Café americano', price: 500, image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png', type: 'Desayuno',},
    {id: 3, name: 'Agua 500ml', price: 500, image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png', type: 'Almuerzo', }
];

// const orderTest = 
//     {
//         products: [{
//             product: {id: 3, name: 'Agua 500ml', price: 500, image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png', type: 'Almuerzo', },
//             quantity: 3,
//             subtotal: 1500
//         }],
//         total: 1500,
//     };
// const data = {
//     userId: '3',
//     client: 'Manuela',
//     products: orderTest, 
//     status: "pending",
//     dataEntry: new Date(),
// }

jest.mock('sweetalert2');
jest.mock('axios');

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
  useNavigate: () => mockedUseNavigate, // Crea un mock de useNavigate que lo inspecciona
}));

describe('NewOrder', ()=>{
    beforeEach(() => {
        jest.clearAllMocks();
        // mockedUseNavigate.mockRestore();// limpia mock de useNavigate
    });
    it("Debería poder guardar la orden", async () => {
        //localStorage.setItem('token','123456')
        //const addOrderMock = jest.spyOn(request,'addOrder');
        axios.get.mockResolvedValue({data : productsMock});
        sweetalert2.fire.mockResolvedValue({isConfirmed: true});
        axios.post.mockResolvedValue('Pedido hecho');
        console.log(localStorage.getItem('token'));
        render(<NewOrder />);
        const name = document.querySelector('#customerName');
        const btnLunch = document.querySelector('#btn-lunch');
        const btnBreakfast = document.querySelector("#btn-breakfast");
        fireEvent.change(name, { target: { value: 'Manuela' } });
        //fireEvent.click(btnLunch);
        await act(async () => {
            fireEvent.click(btnLunch); // Envolver el clic en act
        });
        const btnWater = document.querySelector('#item-3');
        fireEvent.click(btnWater);
        fireEvent.click(btnWater);
        fireEvent.click(btnWater);
        fireEvent.click(btnWater);

        await act(async () => {
            fireEvent.click(btnBreakfast); // Envolver el clic en act
        });

        let btnSandwich = document.querySelector('#item-1');

        fireEvent.click(btnSandwich);
        
        btnSandwich = document.querySelector('#add-item-qty-1');

        fireEvent.click(btnSandwich);

        const btnDecreaseWater = document.querySelector('#decrease-item-qty-3');
        fireEvent.click(btnDecreaseWater);

        const btnDeleteSandwich = document.querySelector('#delete-item-1');

        await act(async () => {
            fireEvent.click(btnDeleteSandwich);
        });
        
        const btnConfirmOrder = document.querySelector('#btn-confirm-orden');

        await act(async () => {
            fireEvent.click(btnConfirmOrder);
        });
        await waitFor(() => {
            expect(axios.post).toBeCalledTimes(1);
            //expect(axios.post).toBeCalledWith("http://localhost:8080/orders",data,  {"headers": {"Authorization": "Bearer null"}});
        });
        screen.debug();
    });
    it('Debería redirigir a /login y limpiar el localStorage al dar click en el botón cerrar sesión', async()=>{
        render(<NewOrder />);
        const btnLogout = document.querySelector('#exit-icon');
        fireEvent.click(btnLogout);
        await waitFor(() => {
            expect(mockedUseNavigate).toBeCalledTimes(1);
            expect(mockedUseNavigate).toBeCalledWith('/login');
          });
    });
    it('Debería mostrar un mensaje de error indicando que no se han correctamente los productos', async()=>{
        axios.get.mockRejectedValue('Error al cargar productos');
        const mockFire = jest.spyOn(Swal, "fire");
        render(<NewOrder />);
        await waitFor(() => {
            expect(mockFire).toBeCalledTimes(1);
            expect(mockFire).toBeCalledWith({"icon": "error", "text": "An error has occurred while obtaining list of product", "title": "Oops..."});
        });
    });
});