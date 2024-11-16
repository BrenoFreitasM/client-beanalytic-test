'use client';
import React, { useState } from "react";


const Invoices = () => {

    return (
        <div>
            {/* <h2 className="text-2xl font-bold mb-4">Propriedades</h2>
            <ul className="space-y-3">
                {["Item 1", "Item 2", "Item 3"].map((item, index) => (
                    <li
                        key={index}
                        className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition"
                    >
                        {item}
                    </li>
                ))}
            </ul> */}

            <div>
                <h2 className="text-2xl font-bold mb-4">Financeiro</h2>
                <p className="text-gray-700">
                    Aqui está um resumo dos dados. Adicione gráficos, estatísticas ou
                    informações importantes para fornecer uma visão geral.
                </p>
            </div>
        </div>
    )
}

export default Invoices;