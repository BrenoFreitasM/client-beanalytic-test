"use client";

import React, { useState, useEffect } from "react";

const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula a busca de imóveis do backend
        const fetchProperties = async () => {
            try {
                // const response = await fetch("http://localhost:3001/api/properties");
                // const data = await response.json();
                // setProperties(data);
            } catch (error) {
                console.error("Erro ao buscar imóveis", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            {/* <h1>
                Visualizar Imóveis
            </h1>

            {loading ? (
                <div>Carregando...</div>
            ) : (
                <div>
                    { properties.map((property) => (
                        <div>
                            
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    )
}