import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:9090/proyectoDaw-main/public/api/login`,
        {
          email,
          password,
          remember
        }
      );
      console.log(response.data);
      setIsLoading(false);
      setLoggedIn(true); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setIsLoading(false);
    }
  };

  const redirectToDashboard = () => {
    if (loggedIn) {
      window.location.href = '/Dashboard';
    }
  };

  return (
    <div className="container mx-auto">
      {redirectToDashboard()}
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-md">
          <div className="bg-grey">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-grey-400 text-sm font-bold mb-2">Email</label>
                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-400 leading-tight focus:outline-none focus:shadow-outline" id="email" value={email} onChange={handleEmailChange} required />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-grey-400 text-sm font-bold mb-2">Contraseña</label>
                <input type="password" className="shadow appearance-none border  rounded w-full py-2 px-3 text-grey-400 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" value={password} onChange={handlePasswordChange} required />
              </div>
              <button type="submit" className="bg-red-900 hover:bg-red-900/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" disabled={isLoading}>Iniciar Sesión</button>
              {isLoading && <p>Loading...</p>}
            </form>
            <Link className="text-red-800 hover:text-red-800/80" to="/password/request">¿Has olvidado tu contraseña?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
