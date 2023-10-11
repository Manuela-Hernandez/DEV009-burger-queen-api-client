import { auth } from '../../services/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigateTo = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function userLogin() {
    return await auth(email, password)
      .then(function (response) {
        //console.log('response: ', response)
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('role', response.data.user.role);
        localStorage.setItem('name', response.data.user.name);
        switch (response.data.user.role) {
          case 'waiter': navigateTo('/waiter');
            break;
          case 'admin': navigateTo('/admin');
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
      <section id="login-form" className="h-full bg-bgqueen-secondary rounded-lg p-5 lg:w-11/12 md:mx-8">
        <h2 className="text-4xl text-bgqueen-primary text-center font-bold">LOGIN</h2>
        <form action="login" id='login' className="mt-5 flex flex-col gap-y-4 items-center">
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl h-14"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p id='message' className="text-xl text-bgqueen-primary"></p>
          <button
            type="button"
            className="bg-bgqueen-primary text-white w-1/2 h-12 rounded-full text-xl"
            onClick={userLogin}
            id='login-btn'
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}