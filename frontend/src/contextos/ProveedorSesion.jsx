import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
const contextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  const usuarioInicial = "";
  const datosSesionInicial = {
    name: "",
    email: "",
    password: "",
  };
  const [datosSesion, setDatosSesion] = useState();
  const [usuario, setUsuario] = useState(null); // Guardará los datos del usuario autenticado
  const [sesionIniciada, setSesionIniciada] = useState(false); // Estado para saber si la sesión está activa
  const [errorUsuario, setErrorUsuario] = useState(""); // Estado para manejar mensajes de error o éxito

  const navigate = useNavigate();
  
  const crearCuenta = async () => {
    try {
      const cabecera = new Headers();
      cabecera.append("Accept", "application/json");
      cabecera.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: datosSesion.name,
        email: datosSesion.email,
        apellidos: datosSesion.apellidos,
        telefono: datosSesion.telefono,
        password: datosSesion.password,
        password_confirmation: datosSesion.password_confirmation
      });

      const requestOptions = {
        method: "POST",
        headers: cabecera,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8090/api/register",
        requestOptions
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al crear la cuenta");
      }
      setSesionIniciada(true);
      setErrorUsuario("Cuenta creada con éxito. Revisa tu correo electrónico.");
    } catch (error) {
      setErrorUsuario(`Error al crear cuenta: ${error.message}`);
    }
    navigate("/");
  };

  const iniciarSesion = async () => {
    setErrorUsuario("");
    try {
      const cabecera = new Headers();
      cabecera.append("Accept", "application/json");
      cabecera.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: datosSesion.email,
        password: datosSesion.password,
      });

      const requestOptions = {
        method: "POST",
        headers: cabecera,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8090/api/login",
        requestOptions
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", result.token);

      setUsuario(result.user); 

      setSesionIniciada(true);
      setErrorUsuario("Sesión iniciada correctamente.");
      navigate("/");
    } catch (error) {
      setErrorUsuario(`Error al iniciar sesión: ${error.message}`);
    }
  };

  const cerrarSesion = async () => {
    try {
      const cabecera = new Headers();
      cabecera.append("Accept", "application/json");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No hay token de autenticación.");
      }

      cabecera.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "POST",
        headers: cabecera,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8090/api/logout",
        requestOptions
      );
      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || "Error al cerrar sesión");
      }

      localStorage.removeItem("token");

      setUsuario({});
      setSesionIniciada(false);
      setErrorUsuario("Sesión cerrada correctamente.");

      navigate("/SesionIniciar");
    } catch (error) {
      setErrorUsuario(`Error al cerrar sesión: ${error.message}`);
    }
  };
  const actualizarSesion = (evento)=> {
    const{name, value} = evento.target;
    setDatosSesion({...datosSesion, [name] : value})
  }


  const datosAExportar = {
    iniciarSesion,
    cerrarSesion,
    crearCuenta,
    actualizarSesion,
    sesionIniciada,
    errorUsuario
  };
  return (
    <>
      <contextoSesion.Provider value={datosAExportar}>
        {children}
      </contextoSesion.Provider>
    </>
  );
};
export default ProveedorSesion;
export { contextoSesion };
