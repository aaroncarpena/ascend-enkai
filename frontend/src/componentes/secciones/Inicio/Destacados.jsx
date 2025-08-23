import React from "react";

const Destacados = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-emerald-400 px-6 py-10 text-black">
      <div className="max-w-5xl w-full text-center p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">Deportes más populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="w-[256px] h-[256px] mx-auto shadow-md rounded-lg bg-[url('/TXQJk3br_400x400.jpg')] bg-no-repeat bg-center bg-contain flex items-end justify-center">
            <h3 className="text-2xl font-semibold text-black hover:text-green-400 transition-colors duration-200">
              Tenis
            </h3>
          </div>

          <div className="w-[256px] h-[256px] mx-auto shadow-md rounded-lg bg-[url('/pelota-futboljpg.webp')] bg-no-repeat bg-center bg-contain flex items-end justify-center">
            <h3 className="text-2xl font-semibold text-black hover:text-green-400 transition-colors duration-200">
              Fútbol
            </h3>
          </div>

          <div className="w-[256px] h-[256px] mx-auto shadow-md rounded-lg bg-[url('/unnamed.webp')] bg-no-repeat bg-center bg-contain flex items-end justify-center">
            <h3 className="text-2xl font-semibold text-black hover:text-green-400 transition-colors duration-200">
              Baloncesto
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destacados;
