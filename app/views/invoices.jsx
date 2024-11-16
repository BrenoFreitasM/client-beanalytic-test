'use client';
import React, { useState } from "react";


const Invoices = () => {

    const items = [
        {
            name: "Rafael Marino",
            overdueTime: 1,
            value: 1500
        },
        {
            name: "Pedro Souza",
            overdueTime: 6,
            value: 2300
        },
        {
            name: "Bruna Siqueira",
            overdueTime: 3,
            value: 3800
        }
    ]

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Financeiro</h2>
            <p className="text-gray-700">
                Aqui está um resumo dos dados. Adicione gráficos, estatísticas ou
                informações importantes para fornecer uma visão geral.
            </p>

            <div className="flex ">

                <div className="w-3/5 p-4">
                    <h2 className="text-2xl font-bold mb-4">Propriedades</h2>
                    <ul className="space-y-6">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="flex bg-gray-100 rounded-lg shadow-md p-4 hover:bg-gray-200 transition"
                            >
                                {/* Primeira Coluna */}
                                <div className="w-2/3 border-r pr-4 flex flex-col justify-center">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-medium">Tempo de Atraso:</span> {item.overdueTime}{" "}
                                        {item.overdueTime > 1 ? "meses" : "mês"}
                                    </p>
                                    <p className="text-gray-600 mt-1">
                                        <span className="font-medium">Valor:</span> R$ {item.value.toLocaleString("pt-BR")}
                                    </p>
                                </div>

                                {/* Segunda Coluna */}
                                <div className="w-1/3 pl-4">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Propriedades</h4>
                                    <ul className="space-y-2">
                                        <li className="text-gray-600">Casa praia</li>
                                        <li className="text-gray-600">Apartamento centro</li>
                                        <li className="text-gray-600">Chácara campo</li>
                                        <li className="text-gray-600 float-right">...+3</li>
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="w-2/5 p-4 flex">

                    <span>Gráfico</span>

                </div>
            </div>
        </div>
    )
}

export default Invoices;