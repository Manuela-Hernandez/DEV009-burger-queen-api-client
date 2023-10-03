import LoginForm from "../../components/loginForm/loginForm";
import './login.css'
export default function Login() {
    return (
      <>
        <section id= 'login-section'> 
          <img src="https://i.postimg.cc/nr3kxbKN/BQ-logo.png" alt="Logo de Burger Queen" />
          <LoginForm />
        </section>
      </>
    );
  }