import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="w-full bg-black rounded-lg shadow-md bg-black-100">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <span className="self-center text-green-400 text-2xl font-semibold whitespace-nowrap">
                Pachanger™
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-green-400 sm:mb-0">
              <li>
                <a className="hover:underline me-4 md:me-6">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a className="hover:underline me-4 md:me-6">Deportes</a>
              </li>
              <li>
                <a className="hover:underline">Contacto</a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 bg-pink-100" />
          <span className="block text-sm text-green-400 sm:text-center">
            © 2025 <a className="hover:underline">Pachanger™</a>. All
            Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};
export default Footer;
