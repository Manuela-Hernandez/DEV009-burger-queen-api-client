import { screen, fireEvent, render, waitFor, act } from '@testing-library/react';
import AllProducts from './Products'
import axios from 'axios';
import Swal from "sweetalert2";

jest.mock('sweetalert2');
jest.mock('axios');

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
  useNavigate: () => mockedUseNavigate, // Crea un mock de useNavigate que lo inspecciona
}));

const dataProducts = [
  {
    id: 1,
    name: 'Sandwich de jamón y queso',
    price: 1000,
    image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png',
    type: 'Breakfast',
  },
  {
    id: 2,
    name: 'Café americano',
    price: 500,
    image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png',
    type: 'Breakfast',
  },
  {
    id: 3,
    name: 'Agua 500ml',
    price: 500,
    image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png',
    type: 'Lunch',
  }
];

describe('products', () => {
  beforeEach(() => {
    localStorage.setItem('token', '6543210');
    localStorage.setItem('id', '4321');
    localStorage.setItem('role', 'admin');
    jest.clearAllMocks();
  });

  it('Deberia almacenar el producto creado', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValue({ data: dataProducts });

    axios.post.mockResolvedValue('Producto guardado');
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByText('Add product'));

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'Burger with fries' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: 1500 } });
    fireEvent.change(screen.getByPlaceholderText('Image url'), { target: { value: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202327/0005/img83l.jpg' } });
    fireEvent.change(screen.getByDisplayValue('Select a type'), { target: { value: 'Lunch' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "success", "text": "The product has been saved.", "title": "process successfully", "showConfirmButton": false, "timer": 1500 });
    });
  });

  it('Deberia mostrar un mensaje de error cuando el producto no se ha almacenado.', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValue({ data: dataProducts });

    axios.post.mockRejectedValue({ response: { data: 'No se ha almacenado el producto.' } });
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByText('Add product'));

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'Burger with fries' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: 1500 } });
    fireEvent.change(screen.getByPlaceholderText('Image url'), { target: { value: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202327/0005/img83l.jpg' } });
    fireEvent.change(screen.getByDisplayValue('Select a type'), { target: { value: 'Lunch' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "No se ha almacenado el producto.", "title": "Oops..." });
    });
  });

  it('Deberia llamar a la funcion de sweetalert con el mensaje -Complete all the information.- Cuando no se llenan todos los campos', async () => {

    axios.get.mockResolvedValue({ data: dataProducts });

    const mockFire = jest.spyOn(Swal, "fire");
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByText('Add product'));

    // fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'Burger with fries' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: 1500 } });
    fireEvent.change(screen.getByPlaceholderText('Image url'), { target: { value: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202327/0005/img83l.jpg' } });
    fireEvent.change(screen.getByDisplayValue('Select a type'), { target: { value: 'Lunch' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Complete all the information.", "title": "Oops..." });
    });
  });

  it('Deberia llamar a la funcion de sweetalert con el mensaje -Enter a valid price.- Cuando se ingresa un precio menor a 1', async () => {

    axios.get.mockResolvedValue({ data: dataProducts });

    const mockFire = jest.spyOn(Swal, "fire");
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByText('Add product'));

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'Burger with fries' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: -1500 } });
    fireEvent.change(screen.getByPlaceholderText('Image url'), { target: { value: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202327/0005/img83l.jpg' } });
    fireEvent.change(screen.getByDisplayValue('Select a type'), { target: { value: 'Lunch' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Enter a valid price", "title": "Oops..." });
    });
  });


  it('Deberia almacenar el producto pero no se carga correctamente la nueva lista', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValue({ data: dataProducts });

    axios.post.mockResolvedValue('Producto guardado');
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByText('Add product'));

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'Burger with fries' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: 1500 } });
    fireEvent.change(screen.getByPlaceholderText('Image url'), { target: { value: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202327/0005/img83l.jpg' } });
    fireEvent.change(screen.getByDisplayValue('Select a type'), { target: { value: 'Lunch' } });

    axios.get.mockRejectedValue('Error: Product');

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(2);
      expect(axios.get).toBeCalledTimes(2);
    });
  });

  it('Deberia guardar los cambios editados del producto', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValueOnce({ data: dataProducts });
    axios.patch.mockResolvedValueOnce('Cambios guadados');

    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('edit-product-1'));

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'Burger' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: 1700 } });
    fireEvent.change(screen.getByPlaceholderText('Image url'), { target: { value: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202327/0005/img83l.jpg' } });
    fireEvent.change(screen.getByDisplayValue('Breakfast'), { target: { value: 'Lunch' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "success", "text": "The product information has been changed.", "title": "process successfully", "showConfirmButton": false, "timer": 1500, });
    });
  });


  it('Deberia mostrar una alerta con el mensaje -Enter a valid price.-  al editar el precio y se ingresa un precio menor a 1', async () => {

    axios.get.mockResolvedValue({ data: dataProducts });

    const mockFire = jest.spyOn(Swal, "fire");
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('edit-product-1'));

    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: -1500 } });


    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Enter a valid price", "title": "Oops..." });
    });
  });

  it('Deberia mostrar una alerta con el mensajet -Complete all the information.-  al editar y no se llenan todos los campos', async () => {

    axios.get.mockResolvedValue({ data: dataProducts });

    const mockFire = jest.spyOn(Swal, "fire");
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('edit-product-1'));

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: '' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Complete all the information.", "title": "Oops..." });
    });
  });

  it('Deberia mostrar un mensaje de error al no guardar los cambios editados del usuario', async () => {

    axios.get.mockResolvedValueOnce({ data: dataProducts });
    axios.patch.mockRejectedValueOnce({ response: { data: 'Cambios no guardados' } });
    const mockFire = jest.spyOn(Swal, "fire");

    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('edit-product-1'));

    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: 1000 } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Cambios no guardados", "title": "Oops..." });
    });
  });


  it('Deberia limpiarse el campo de la imagen al dar click en limpiar cuando se estan editando los datos', async () => {
    axios.get.mockResolvedValueOnce({ data: dataProducts });
    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('edit-product-1'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Image url').value).not.toBe('')
    });

    fireEvent.click(screen.getByTestId('clear-input-img'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Image url').value).toBe('')
    });

  });

  it('Deberia limpiarse el campo de la imagen al dar click en limpiar cuando se crea el producto', async () => {
    axios.get.mockResolvedValueOnce({ data: dataProducts });

    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('add-product'));
    fireEvent.change(screen.getByPlaceholderText('Image url'), { target: { value: 'http/:hola' } });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Image url').value).toBe('http/:hola')
    });
    fireEvent.click(screen.getByTestId('clear-url'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Image url').value).toBe('')
    });

  });

  it('Deberia eliminar el producto 1', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValueOnce({ data: dataProducts });
    Swal.fire.mockResolvedValue({ isConfirmed: true });
    axios.delete.mockResolvedValueOnce('Cambios guardados');

    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('delete-product-1'));  

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(2);
      expect(mockFire).toBeCalledWith({ "icon": "success", "text": "The product has been deleted.", "title": "process successfully", "showConfirmButton": false,"timer": 1500, });
    });
  });


  it('Deberia mostrar un mensaje cuando el producto no se elimina', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValueOnce({ data: dataProducts });
    Swal.fire.mockResolvedValue({ isConfirmed: true });
    axios.delete.mockRejectedValueOnce('Cambios no guardados');

    await act(async () => {
      render(<AllProducts />);
    });

    fireEvent.click(screen.getByTestId('delete-product-1'));  

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(2);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "An error has occurred deleting the product", "title": "Oops..." });
    });
  });

   it('Deberia mostrar un mensaje cuando no se carga la lista de productos', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockRejectedValueOnce('data error');

    await act(async () => {
      render(<AllProducts />);
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "An error has occurred while obtaining list of products.", "title": "Oops..." });
    });
  });
})