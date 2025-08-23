import React, { useEffect, useState } from "react";

const Deportes = () => {
  const [deportes, setDeportes] = useState({
    individual: [],
    dobles: [],
    equipos: [],
  });

  useEffect(() => {
    // Aquí iría la llamada real a tu API, por ejemplo:
    // fetch('/api/deportes')
    //   .then(res => res.json())
    //   .then(data => setDeportes(data));

    // Por ahora, pongo datos mock:
    const datosMock = {
      individual: ["Tenis", "Boxeo", "Atletismo", "Natación", "Ciclismo"],
      dobles: ["Tenis Dobles", "Ping Pong Dobles", "Padel"],
      equipos: ["Fútbol", "Baloncesto", "Voleibol", "Hockey", "Béisbol"],
    };

    setDeportes(datosMock);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-green-400">
        Deportes por Tipo de Participación
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-green-400 inline-block">
          Individual
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {deportes.individual.map((deporte, idx) => (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow text-center hover:bg-green-100 transition"
            >
              {deporte}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-green-400 inline-block">
          Dobles
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {deportes.dobles.map((deporte, idx) => (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow text-center hover:bg-green-100 transition"
            >
              {deporte}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-green-400 inline-block">
          Por Equipos
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {deportes.equipos.map((deporte, idx) => (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow text-center hover:bg-green-100 transition"
            >
              {deporte}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Deportes;
