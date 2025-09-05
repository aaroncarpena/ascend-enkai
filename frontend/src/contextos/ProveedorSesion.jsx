import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const contextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  const usuarioInicial = "";
  const datosSesionInicial = {
    login: "",
    name: "",
    email: "",
    telefono: "",
    password: "",
    password_confirmation: "",
  };
  const [datosSesion, setDatosSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(null);
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [errorUsuario, setErrorUsuario] = useState("");

  const navigate = useNavigate();

  // Verificar el token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🏁 TOKEN AL CARGAR:", token);
    console.log("🏁 ESTADO INICIAL datosSesion:", datosSesionInicial);
  }, []);

  // Debug: Mostrar cambios en datosSesion
  useEffect(() => {
    console.log("📊 ESTADO datosSesion CAMBIÓ:", datosSesion);
  }, [datosSesion]);

  const crearCuenta = async () => {
    console.log("🚀 CREAR CUENTA - Estado completo:", datosSesion);
    
    try {
      const cabecera = new Headers();
      cabecera.append("Accept", "application/json");
      cabecera.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: datosSesion.name,
        email: datosSesion.email,
        telefono: datosSesion.telefono,
        password: datosSesion.password,
        password_confirmation: datosSesion.password_confirmation,
      });

      console.log("📤 ENVIANDO REGISTRO:", raw);

      const requestOptions = {
        method: "POST",
        headers: cabecera,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8000/api/register",
        requestOptions
      );
      const result = await response.json();

      console.log("📥 RESPUESTA REGISTRO:", result);

      if (!response.ok) {
        throw new Error(result.message || "Error al crear la cuenta");
      }

      // Guardar el token y el usuario
      localStorage.setItem("token", result.access_token);
      setUsuario(result.user);
      setSesionIniciada(true);
      setErrorUsuario("Cuenta creada con éxito. Revisa tu correo electrónico.");

      console.log("✅ TOKEN GUARDADO:", result.access_token);
      console.log("✅ USUARIO GUARDADO:", result.user);

    } catch (error) {
      console.error("❌ ERROR EN REGISTRO:", error);
      setErrorUsuario(`Error al crear cuenta: ${error.message}`);
    }

    navigate("/");
  };

  const iniciarSesion = async () => {
    console.log("🚀 INICIAR SESIÓN");
    console.log("🔍 Estado completo:", datosSesion);
    console.log("🔍 Campo login específico:", `"${datosSesion.login}"`);
    console.log("🔍 Campo password específico:", `"${datosSesion.password}"`);
    console.log("🔍 Todas las claves del estado:", Object.keys(datosSesion));
    
    setErrorUsuario("");
    
    try {
      const cabecera = new Headers();
      cabecera.append("Accept", "application/json");
      cabecera.append("Content-Type", "application/json");

      const datosLogin = {
        login: datosSesion.login,
        password: datosSesion.password,
      };

      console.log("📤 DATOS QUE SE ENVÍAN AL LOGIN:", datosLogin);
      
      const raw = JSON.stringify(datosLogin);
      console.log("📤 JSON ENVIADO:", raw);

      const requestOptions = {
        method: "POST",
        headers: cabecera,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8000/api/login",
        requestOptions
      );
      const result = await response.json();

      console.log("📥 RESPUESTA LOGIN:", result);

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Error al iniciar sesión"
        );
      }

      localStorage.setItem("token", result.access_token);
      setUsuario(result.user);
      setSesionIniciada(true);
      setErrorUsuario("Sesión iniciada correctamente.");
      navigate("/");
    } catch (error) {
      console.error("❌ ERROR EN LOGIN:", error);
      setErrorUsuario(`Error al iniciar sesión: ${error.message}`);
    }
  };

  const cerrarSesion = async () => {
    console.log("🚪 CERRAR SESIÓN");
    
    try {
      const cabecera = new Headers();
      cabecera.append("Accept", "application/json");

      const token = localStorage.getItem("token");
      console.log("🔑 TOKEN PARA LOGOUT:", token);

      if (!token) {
        throw new Error("No hay token de autenticación almacenado.");
      }

      cabecera.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "POST",
        headers: cabecera,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8000/api/logout",
        requestOptions
      );
      const result = await response.json();

      console.log("📥 RESPUESTA LOGOUT:", result);

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Error al cerrar sesión"
        );
      }

      localStorage.removeItem("token");
      setUsuario(null);
      setSesionIniciada(false);
      setErrorUsuario("Sesión cerrada correctamente.");

      navigate("/SesionIniciar");
    } catch (error) {
      console.error("❌ ERROR EN LOGOUT:", error);
      setErrorUsuario(`Error al cerrar sesión: ${error.message}`);
    }
  };

  const actualizarSesion = (evento) => {
    const { name, value } = evento.target;
    
    console.log("🔧 ACTUALIZANDO CAMPO:");
    console.log("   - Nombre del campo:", `"${name}"`);
    console.log("   - Valor introducido:", `"${value}"`);
    console.log("   - Estado ANTES:", datosSesion);
    
    const nuevosDatos = { ...datosSesion, [name]: value };
    setDatosSesion(nuevosDatos);
    
    console.log("   - Estado DESPUÉS:", nuevosDatos);
    console.log("   - Campo específico después:", `"${nuevosDatos[name]}"`);
  };

  const datosAExportar = {
    iniciarSesion,
    cerrarSesion,
    crearCuenta,
    actualizarSesion,
    sesionIniciada,
    errorUsuario,
    usuario,
    datosSesion,
  };

  return (
    <contextoSesion.Provider value={datosAExportar}>
      {children}
    </contextoSesion.Provider>
  );
};

export default ProveedorSesion;
export { contextoSesion };