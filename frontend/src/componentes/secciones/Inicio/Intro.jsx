import { Link } from "react-router-dom";
const Intro =()=>{

return(
<>
<section className="flex flex-col items-center justify-center min-h-screen bg-emerald-400 px-6 text-black">
  <div className="max-w-lg text-center p-6 rounded-2xl">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
      La mejor aplicación para hacer deporte y conectar
    </h1>

    <p className="text-lg text-gray-600 mb-6">
     Miles de deportistas utilizan nuestra aplicación para encontrar nuevos deportes a los que aficionarse y conocer deportistas con los que enfrentrarse
    </p>
  </div>
</section>


</>
)
}
export default Intro;