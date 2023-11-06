import { screen, fireEvent, render, waitFor, act } from '@testing-library/react';
import AllUsers from './Users'
import axios from 'axios';
import Swal from "sweetalert2";

jest.mock('sweetalert2');
jest.mock('axios');

const dataUsers = [
  {
    id: 1, name: 'Luis Juarez', email: 'empleado1@systers.xyz', password: '123456', role: 'chef'
  },
  {
    id: 2, name: 'Juan Perez', email: 'empleado2@systers.xyz', password: '123456', role: 'admin'
  },
  {
    id: 3, name: 'Dulce Juarez', email: 'empleado3@systers.xyz', password: '123456', role: 'waiter'
  }
]

describe('users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it("should render users", () => {
  //   render(<AllUsers />);
  // });
  it('Deberia renderizar allUsers', async () => {
    localStorage.setItem('token', '6543210');
    localStorage.setItem('id', '4321');
    localStorage.setItem('role', 'admin');

    axios.get.mockResolvedValue({ data: dataUsers });

    await act(async () => { // Envuelve la renderización en act
      render(<AllUsers />);
    });
    // fireEvent.click(screen.getByText('Create new order'));

    // await waitFor(() => {
    //   expect(mockedUseNavigate).toBeCalledTimes(1);
    //   expect(mockedUseNavigate).toBeCalledWith('/waiter');
    // });
  });

})