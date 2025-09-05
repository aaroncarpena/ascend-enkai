import { Link } from "react-router-dom";
import useSesion from "../../../hooks/UseSesion";
import ErrorSesion from "../Errores/ErrorSesion";

const CrearSesion = () => {
  
  const { crearCuenta, actualizarSesion, errorUsuario } = useSesion();

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="mb-6">
          <img
            src="/recursos/Logo_applicaion-removebg-preview.png"
            alt="Logo"
            className="flex items-center mb-6 text-2xl font-semibold text-black"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-black mb-4">
            Crea tu cuenta
          </h2>

          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                id="email"
                name="email"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
                required
                onChange={(e) => actualizarSesion(e)}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Correo Electrónico
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="name"
                name="name"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
                required
                onChange={(e) => actualizarSesion(e)}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre de Usuario
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="telefono"
                name="telefono"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
                required
                onChange={(e) => actualizarSesion(e)}
              />
              <label
                htmlFor="telefono"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Teléfono
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                id="password"
                name="password"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
                required
                onChange={(e) => actualizarSesion(e)}
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contraseña
              </label>
            </div>

            
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
                required
                onChange={(e) => actualizarSesion(e)}
              />
              <label
                htmlFor="password_confirmation"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirmar Contraseña
              </label>
            </div>

            <button
              onClick={crearCuenta}
              className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Registrarse
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/SesionIniciar" className="text-green-400 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      {errorUsuario && <ErrorSesion>{errorUsuario}</ErrorSesion>}
    </>
  );
};

export default CrearSesion;