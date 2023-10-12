import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewOrder from "./NewOrder";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las exportaciones originales
  useNavigate: () => mockedUseNavigate, // Crea un mock de useNavigate que lo inspecciona
}));

describe('NewOrder', ()=>{
    it("should render NewOrder", () => {
        render(<NewOrder />);
        const name = document.querySelector('#customerName');
        fireEvent.change(name, { target: { value: 'Manuela' } });
        screen.debug();
    });
});