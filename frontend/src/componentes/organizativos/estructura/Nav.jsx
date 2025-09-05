import useSesion from "../../../hooks/UseSesion.js";
import { Link } from "react-router-dom";
import CerrarSesion from "../../secciones/Sesion/CerrarSesion.jsx";

const Nav = () => {
  const { sesionIniciada } = useSesion();
  return (
    <>
      <nav className="bg-black fixed max-w-4xl mx-auto z-20 top-4 start-4 end-4 border border-gray-200 rounded-full shadow-lg p-2 text-green-400">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Pachanger
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!sesionIniciada && (
              <Link
                to="/SesionIniciar"
                className="text-green-400 bg-black hover:bg-green-400 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Iniciar Sesión
              </Link>
            )}
            {sesionIniciada && <CerrarSesion />}
          </div>
          <div
            className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-full bg-black md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-green-400 bg-black rounded-full md:bg-transparent md:text-green-400 md:p-0"
                  aria-current="page"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <a className="block py-2 px-3 text-green-400 rounded-full hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:hover:bg-green-400 md:p-0">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <Link 
                  to="/deportes"
                  className="block py-2 px-3 text-green-400 rounded-full hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:hover:bg-green-400 md:p-0"
                  aria-current="page"
                >
                  Deportes

                  
                </Link>
              </li>
              <a className="block hover:text-black hover:bg-green-400 py-2 px-3 text-green-400 rounded-full hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:hover:bg-green-400 md:p-0">
                Amigos
              </a>

              <li>
                <a className="block py-2 px-3 text-green-400 rounded-full hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:hover:bg-green-400 md:p-0">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
