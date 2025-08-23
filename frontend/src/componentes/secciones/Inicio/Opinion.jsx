const Opinion =()=>{


return(
<>

<div className="text-center bg-emerald-400">
  <h2 className="text-3xl font-bold text-black">Opiniones de Usuarios</h2>
</div>

<div className="flex justify-center space-x-6 bg-emerald-400">
  <a href="#" className="block w-96 p-6 bg-black border border-gray-200 rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold text-green-400">Daniel cuenca</h3>
    <p className="text-gray-600 mt-2">"Conocí a muchos jugadores nuevos gracias a esta app, ¡es muy útil siempre!."</p>
    <div className="mt-3 text-yellow-400 text-lg font-bold">★★★★☆</div>
  </a>

  <a href="#" className="block w-96 p-6 bg-black border border-gray-200 rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold text-green-400">Iker Moll</h3>
    <p className="text-gray-600 mt-2">"Organizar partidos nunca fue tan fácil, todo el mundo responde y se apunta rápido."</p>
    <div className="mt-3 text-yellow-400 text-lg font-bold">★★★☆☆</div>
  </a>

  <a href="#" className="block w-96 p-6 bg-black border border-gray-200 rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold text-green-400">Messi</h3>
    <p className="text-gray-600 mt-2">"La mejor forma de no perder el ritmo y conocer gente aficionada al deporte."</p>
    <div className="mt-3 text-yellow-400 text-lg font-bold">★★★★★</div>
  </a>
</div>
</>
)    
}
export default Opinion