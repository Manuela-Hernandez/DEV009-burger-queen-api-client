import { render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import { useNavigate } from 'react-router-dom';
import Login from "./login.jsx";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
  useNavigate: jest.fn(), // Crea un mock de useNavigate
}));


describe("Login", () => {
    it("should render Login", () => {
      useNavigate.mockReturnValue(() => {});
      render(<Login />);
      screen.debug();
      // expect(1).toBe(1);
    });
});