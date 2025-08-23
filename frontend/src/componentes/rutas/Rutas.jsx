import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../organizativos/paginas/Inicio.jsx"
import Sesion from "../organizativos/paginas/Sesion.jsx"
import Error from "../organizativos/paginas/Error.jsx"
import CrearSesion from "../secciones/Sesion/CrearSesion.jsx";
import Deportes from "../secciones/Datos/Deportes.jsx";

const Rutas = ()=>{

    return (
        <>
          <Routes>
            <Route path='/' element={<Inicio />}/>
            <Route path='*' element={<Error />}/>
            <Route path='/SesionIniciar' element={<Sesion />}/>
            <Route path='/SesionCrear' element={< CrearSesion/>}/>
            <Route path='/deportes' element={<Deportes />} />
          </Routes>
        </>
      );
    };
    
    export default Rutas;

