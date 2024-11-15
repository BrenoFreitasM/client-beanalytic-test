import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/analog-landscape-city-with-buildings.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Botão de Login */}
      <Link href="/login">
        <button className="absolute top-8 right-8 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
          Login
        </button>
      </Link>

      {/* <div className="flex flex-col items-center justify-center bg-gray-50  rounded-lg bg-[rgba(37,99,235,0.7)] p-6">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-5xl font-bold text-blue-600">🏠</span>
          <span className="text-4xl font-extrabold text-gray-300">Imobiliária</span>
        </div>

        <p className="text-center text-lg text-gray-300 max-w-lg mx-auto">
          "Transformando sonhos em realidade. Encontre seu novo lar com a nossa experiência e dedicação em oferecer o melhor em imóveis. Seu futuro começa aqui."
        </p>
      </div> */}
    </div>
  );
}
