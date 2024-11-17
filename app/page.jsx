"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  // -----Função de login -------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Alerta de sucesso com SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Login bem-sucedido",
          text: "Você foi autenticado com sucesso!",
          showConfirmButton: false,
          timer: 2000
        });
        // Redirecionamento ou ações pós-login
      } else {
        // Alerta de erro 
        Swal.fire({
          icon: "error",
          title: "Erro no login",
          text: data.message || "Erro ao fazer login"
        });
      }

    } catch (err) {
      // Alerta de erro para falhas no servidor ou rede
      Swal.fire({
        icon: "error",
        title: "Erro de Conexão",
        text: "Não foi possível conectar ao servidor."
      });
      console.log("Error: ", err)
    }
  }

  return (
    <div className="login-container flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-600"
      style={{
        backgroundImage: "url('/analog-landscape-city-with-buildings.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-600 font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-600 font-medium">Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;