import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import { useNavigate } from 'react-router-dom';
import Login from "./login.jsx";
import { queryByTestId } from "@testing-library/dom";
import { get } from "https";
// Mock de axios o funcion de petición
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
  useNavigate: jest.fn({}), // Crea un mock de useNavigate
}));

describe("Login", () => {
  //Agregar un beforeEach
    it("should render Login", () => {
      useNavigate.mockReturnValue(() => {});
      render(<Login />);
      screen.debug();
    });
    it("Debería mostrar mensaje de error cuando no se introducen datos en los campos de email y contraseña", async() => {
      const { getByPlaceholderText, getByText } = render(<Login />);
      screen.debug();
      const btnLogin = getByText('Login')
      const messageError = document.querySelector('#message');

      fireEvent.click(btnLogin);

      await waitFor(() => {
        expect(messageError.textContent).toBe('Email and password are required');
      });
      screen.debug();
    });
    it("Debería navegar a /waiter al introducir las credenciales de un mesero", async() => {
      const { getByPlaceholderText, getByText } = render(<Login />);
      // screen.debug();
      const email = getByPlaceholderText('Email');
      const password = getByPlaceholderText('Password');
      const btnLogin = getByText('Login')
      const messageError = document.querySelector('message');
      fireEvent.change(email, { target: { value: 'empleado1@systers.xyz' } });
      fireEvent.change(password, { target: { value: '0123456789' } });
      fireEvent.click(btnLogin);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/waiter');
      });
      //screen.debug();
    });
    it("Debería navegar a /waiter al introducir las credenciales de un mesero", async() => {
      const { getByPlaceholderText, getByText } = render(<Login />);

      const email = getByPlaceholderText('Email');
      const password = getByPlaceholderText('Password');
      const btnLogin = getByText('Login')

      fireEvent.change(email, { target: { value: 'grace.hopper@systers.xyz' } });
      fireEvent.change(password, { target: { value: '123456' } });
      fireEvent.click(btnLogin);

      await waitFor(() => {
        // Intentar con espías
        expect(useNavigate).toHaveBeenCalledWith('/admin');
      });
    });
});