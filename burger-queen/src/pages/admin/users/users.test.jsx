import { screen, fireEvent, render, waitFor, act } from '@testing-library/react';
import AllUsers from './Users'
import axios from 'axios';
import Swal from "sweetalert2";

jest.mock('sweetalert2');
jest.mock('axios');

const dataUsers = [
  { id: 1, name: 'Luis Juarez', email: 'empleado1@systers.xyz', password: '123456', role: 'chef' },
  { id: 2, name: 'Juan Perez', email: 'empleado2@systers.xyz', password: '123456', role: 'admin'  },
  { id: 3, name: 'Dulce Juarez', email: 'empleado3@systers.xyz', password: '123456', role: 'waiter' }
];

describe('users', () => {
  beforeEach(() => {
    localStorage.setItem('token', '6543210');
    localStorage.setItem('id', '4321');
    localStorage.setItem('role', 'admin');
    jest.clearAllMocks();
  });

  it('Deberia almacenar al usuario', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValue({ data: dataUsers });

    axios.post.mockResolvedValue('Usuario guardado');
    await act(async () => { 
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByText('Add user'));

    fireEvent.change(screen.getByPlaceholderText('Employee name'), { target: { value: 'Testing Name' } });
    fireEvent.change(screen.getByPlaceholderText('Employee email'), { target: { value: 'email@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
    fireEvent.change(screen.getByDisplayValue('Select a role'), { target: { value: 'waiter' } });

    await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
    
    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "success", "text": "The user has been saved.", "title": "process successfully", "showConfirmButton": false, "timer": 1500 });
    });
  });

  it('Deberia mostrar un mensaje de error cuando el usuario no se ha almacenado.', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValue({ data: dataUsers });

    axios.post.mockRejectedValue({response:{ data:'No se ha almacenado el usuario.'}});
    await act(async () => { 
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByText('Add user'));

    fireEvent.change(screen.getByPlaceholderText('Employee name'), { target: { value: 'Testing Name' } });
    fireEvent.change(screen.getByPlaceholderText('Employee email'), { target: { value: 'email@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
    fireEvent.change(screen.getByDisplayValue('Select a role'), { target: { value: 'waiter' } });

    await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
    
    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "No se ha almacenado el usuario.", "title": "Oops..." });
    });
  });
  it('Deberia llamar a la funcion de sweetalert con el mensaje -Please select a employee role.- Cuando no se proporciona el nombre', async () => {

    axios.get.mockResolvedValue({ data: dataUsers });

    const mockFire = jest.spyOn(Swal, "fire");
    await act(async () => { 
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByText('Add user'));

    fireEvent.change(screen.getByPlaceholderText('Employee name'), { target: { value: 'Testing Name' } });
    fireEvent.change(screen.getByPlaceholderText('Employee email'), { target: { value: 'email@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });

    await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
    
    await waitFor(() => {
      expect(mockFire).toBeCalledWith({"icon": "warning", "text": "Please select a employee role.", "title": "Oops..." });
    });
  });
  it('Deberia llamar a la funcion de sweetalert con el mensaje -Please enter the employee name.- Cuando no se proporciona el nombre', async () => {

    axios.get.mockResolvedValue({ data: dataUsers });

    const mockFire = jest.spyOn(Swal, "fire");
    await act(async () => { 
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByText('Add user'));

    fireEvent.change(screen.getByPlaceholderText('Employee email'), { target: { value: 'email@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
    fireEvent.change(screen.getByDisplayValue('Select a role'), { target: { value: 'waiter' } });

    await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
    
    await waitFor(() => {
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Please enter the employee name.", "title": "Oops..." });
    });
  });
  it('Deberia almacenar al usuario pero no se carga correctamente la nueva lista', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValue({ data: dataUsers });

    axios.post.mockResolvedValue('Usuario guardado');
    await act(async () => {
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByText('Add user'));

    fireEvent.change(screen.getByPlaceholderText('Employee name'), { target: { value: 'Testing Name' } });
    fireEvent.change(screen.getByPlaceholderText('Employee email'), { target: { value: 'email@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
    fireEvent.change(screen.getByDisplayValue('Select a role'), { target: { value: 'waiter' } });

    axios.get.mockRejectedValue('Error: users');

    await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
    
    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(2);
      expect(axios.get).toBeCalledTimes(2);
    });
  });

  it('Deberia guardar los cambios editados del usuario', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValueOnce({ data: dataUsers });
    axios.patch.mockResolvedValueOnce('Cambios guadados');

    await act(async () => {
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByTestId('edit-users-1'));

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Luis Juarez editado' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'empleado10@systers.xyz' } });
    fireEvent.change(screen.getByDisplayValue('Chef'), { target: { value: 'waiter' } });

     await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });   

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "success", "text": "The user information has been changed.", "title": "process successfully", "showConfirmButton": false,"timer": 1500, });
    });
  });

  it('Deberia mostrar un mensaje de error al guardar los cambios editados del usuario', async () => {

    axios.get.mockResolvedValueOnce({ data: dataUsers });
    axios.patch.mockRejectedValueOnce({response: {data: 'Cambios no guardados'}});
    const mockFire = jest.spyOn(Swal, "fire");

    await act(async () => {
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByTestId('edit-users-1'));

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Luis Juarez editado' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'empleado10@systers.xyz' } });
    fireEvent.change(screen.getByDisplayValue('Waiter'), { target: { value: 'admin' } });

     await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
   
    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Cambios no guardados", "title": "Oops..." });
    });
  });


  it('Deberia mostrar un mensaje de error cuando el campo del nombre esta vacio', async () => {
    axios.get.mockResolvedValueOnce({ data: dataUsers });
    const mockFire = jest.spyOn(Swal, "fire");

    await act(async () => {
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByTestId('edit-users-1'));

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: '' } });

     await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "Please enter the employee name.", "title": "Oops..." });
    });
  });

  it('Deberia mostrar un mensaje de informacion cuando no se ha seleccionado un role', async () => {
    axios.get.mockResolvedValueOnce({ data: dataUsers });
    const mockFire = jest.spyOn(Swal, "fire");

    await act(async () => {
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByTestId('edit-users-1'));
    fireEvent.change(screen.getByDisplayValue('Waiter'), { target: { value: 'Role' } });

     await act(async () => { 
      fireEvent.click(screen.getByText('Save'));  
    });
   

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({"icon": "warning", "text": "Please select a employee role.", "title": "Oops..." });
    });
  });
  it('Deberia eliminar al usuario 1', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValueOnce({ data: dataUsers });
    Swal.fire.mockResolvedValue({ isConfirmed: true });
    axios.delete.mockResolvedValueOnce('Cambios guardados');

    await act(async () => {
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByTestId('delete-user-1'));  

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(2);
      expect(mockFire).toBeCalledWith({ "icon": "success", "text": "The user has been deleted.", "title": "process successfully", "showConfirmButton": false,"timer": 1500, });
    });
  });
  it("Debería poder abrir y cerrar la ventana modal cuando se da click en editar", async () => {
    axios.get.mockResolvedValueOnce({ data: dataUsers });
    Swal.fire.mockResolvedValue({ isConfirmed: true });
    await act(async () => {
      render(<AllUsers />);
    });
    fireEvent.click(screen.getByTestId('edit-users-1'));
    fireEvent.click(screen.getByTestId('close-modal-admin'));
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
  it('Deberia mostrar un mensaje cuando el usuario no se elimina', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockResolvedValueOnce({ data: dataUsers });
    Swal.fire.mockResolvedValue({ isConfirmed: true });
    axios.delete.mockRejectedValueOnce('Cambios no guardados');

    await act(async () => {
      render(<AllUsers />);
    });

    fireEvent.click(screen.getByTestId('delete-user-1'));  

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(2);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "An error has occurred deleting the user", "title": "Oops..." });
    });
  });
  it('Deberia mostrar un mensaje no se carga la lista de usuarios', async () => {
    const mockFire = jest.spyOn(Swal, "fire");
    axios.get.mockRejectedValueOnce('data error');
    
    await act(async () => {
      render(<AllUsers />);
    });

    await waitFor(() => {
      expect(mockFire).toBeCalledTimes(1);
      expect(mockFire).toBeCalledWith({ "icon": "error", "text": "An error has occurred while obtaining list of users.", "title": "Oops..." });
    });
  });
})