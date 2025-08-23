import { Button } from "flowbite-react";
import useSesion from "../../../hooks/UseSesion.js";
const CerrarSesion =()=>{

    const {cerrarSesion} = useSesion();
    return(
    <>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse" onClick={()=>{cerrarSesion()}}>
    <Button className="text-white bg-black text-green-400 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center hover:text-black">Cerrar Sesión</Button>
    </div>
    </>
    )    
    }
    export default CerrarSesion;