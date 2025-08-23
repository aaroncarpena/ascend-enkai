import './App.css'
import Contenido from "../src/componentes/organizativos/estructura/Contenido.jsx"
import Footer from "../src/componentes/organizativos/estructura/Footer.jsx"
import Header from "../src/componentes/organizativos/estructura/Header.jsx"
import Nav from './componentes/organizativos/estructura/Nav.jsx'
import Rutas from './componentes/rutas/Rutas.jsx'
import ProveedorSesion from './contextos/ProveedorSesion.jsx'

function App() {

  return (
    <>
    <ProveedorSesion>
    <Header/>
    <Nav/>
     <Contenido>
     <Rutas/>
     </Contenido>
     <Footer/>
     </ProveedorSesion>
    </>
  )
}

export default App;
