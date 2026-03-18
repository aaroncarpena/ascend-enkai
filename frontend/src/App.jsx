import Header from "../src/components/structure/Header.jsx"
import Nav from "./components/structure/navbar/Nav.jsx"
import Content from "./components/structure/Content.jsx"
import Router from "./router/Router.jsx"
import Footer from "./components/structure/Footer.jsx"
import { useForm } from "react-hook-form"
import './App.css'

function App() {
  console.log(useForm);
  return (
    <>
      <Header />
      <Nav />
      <Content>
        <Router />
      </Content>
      <Footer />
    </>
  )
}

export default App
