import peticion from './request'
import './loginForm.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigateTo = useNavigate();
 function userLogin () {
  return peticion(email, password)
  .then(function (response) {
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('role', response.data.user.role);
    localStorage.setItem('name', response.data.user.name);
    switch (response.data.user.role) {
      case 'waiter': navigateTo('/waiter');
      break;
      case 'admin': console.log('Eres administrador');
      break;
    }
  })
  .catch(function (error) {
    const message = document.querySelector('#message');
    message.textContent = error.response.data;
    message.display = 'block';
  });
 }
  return (
    <>
      <section id='login-form'>
        <h2>LOGIN</h2>
        <form action="login" id='login'>
          <input type="email" name="email" id="email" placeholder="Email" value={email}
            onChange={handleEmailChange} />
          <input type="password" name="password" id="password" placeholder="Password" value={password}
            onChange={handlePasswordChange} />
          <p id='message'></p>
          <button type="button" onClick={userLogin} id='login-btn'>Login</button>
        </form>
      </section>
    </>
  );
}