import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./login.jsx";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
  useNavigate: () => mockedUseNavigate, // Crea un mock de useNavigate que lo inspecciona
}));

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseNavigate.mockRestore();// limpia mock de useNavigate
  });
  it("should render Login", () => {
    render(<Login />);
  });

  it("Debería mostrar mensaje de error cuando no se introducen datos en los campos de email y contraseña", async () => {
    const { getByText } = render(<Login />);
    const btnLogin = getByText('Login')
    const messageError = document.querySelector('#message');
    fireEvent.click(btnLogin);

    await waitFor(() => {
      expect(messageError.textContent).toBe('Email and password are required');
    });
  });
  it("Debería navegar a /waiter al introducir las credenciales de un mesero", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');
    const btnLogin = getByText('Login')
    
    fireEvent.change(email, { target: { value: 'empleado1@systers.xyz' } });
    fireEvent.change(password, { target: { value: '0123456789' } });
    fireEvent.click(btnLogin);

    await waitFor(() => {
      expect(mockedUseNavigate).toBeCalledTimes(1);
      expect(mockedUseNavigate).toBeCalledWith('/waiter');
    });
  });
  it("Debería navegar a /admin al introducir las credenciales de un administrador", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');
    const btnLogin = getByText('Login')

    fireEvent.change(email, { target: { value: 'grace.hopper@systers.xyz' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(btnLogin);

    await waitFor(() => {
      expect(mockedUseNavigate).toBeCalledTimes(1);
      expect(mockedUseNavigate).toBeCalledWith('/admin');
    });
  });
});