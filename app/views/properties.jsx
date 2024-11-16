'use client';
import React, { useEffect, useState } from "react";


const Properties = () => {

    useEffect

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Propriedades</h2>
            <ul className="space-y-3">
                {["Item 1", "Item 2", "Item 3"].map((item, index) => (
                    <li
                        key={index}
                        className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Properties;