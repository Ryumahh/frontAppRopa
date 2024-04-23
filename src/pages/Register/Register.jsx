import React, { useState } from "react";
import axios from 'axios';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e) => setPasswordConfirmation(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:9090/proyectoDaw-main/public/register`,
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation
        }
      );
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al registrar:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-md">
          <div className="bg-grey">
            <div className="card">
              

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="block text-grey-400 text-sm font-bold mb-2">Nombre</label>
                    <input id="name" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-400 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={handleNameChange} required autoFocus />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="block text-grey-400 text-sm font-bold mb-2">Correo Electrónico</label>
                    <input id="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-400 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={handleEmailChange} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="block text-grey-400 text-sm font-bold mb-2">Contraseña</label>
                    <input id="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-400 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={handlePasswordChange} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password-confirm" className="block text-grey-400 text-sm font-bold mb-2">Confirmar Contraseña</label>
                    <input id="password-confirm" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-400 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} required />
                  </div>

                  <div className="mb-0">
                    <button type="submit" className="bg-red-900 hover:bg-red-900/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" disabled={isLoading}>
                      {isLoading ? "Registrando..." : "Registrar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
