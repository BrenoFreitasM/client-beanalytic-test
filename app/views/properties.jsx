'use client';
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tenants, setTenants] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        code: "",
        size: "",
        tenant: "",
    });
    const [showForm, setShowForm] = useState(false); // Controla o formulário de criação
    const [createFormData, setCreateFormData] = useState({
        name: "",
        code: "",
        size: "",
        tenant: "",
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/properties/", {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-access-key': '67368879e4fffec0af75ce03'
                    }),
                });
                const data = await response.json();
                setProperties(data);

                const response2 = await fetch("http://localhost:3001/api/tenants/", {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-access-key': '67368879e4fffec0af75ce03'
                    }),
                })
                const data2 = await response2.json();
                setTenants(data2);

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao buscar propriedades",
                    text: "Erro ao carregar os dados."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleEditClick = (property) => {
        setSelectedProperty(property);
        setEditFormData({ ...property });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch(`http://localhost:3001/api/properties/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-key": "67368879e4fffec0af75ce03",
                },
                body: JSON.stringify(editFormData)
            });

            if (response.ok) {
                const updatedProperty = await response.json();

                properties.map((property) => {
                    if (property._id === updatedProperty._id) {
                        setProperties(
                            ...properties,
                            updatedProperty
                        )
                    }
                })

                Swal.fire({
                    icon: "success",
                    title: "Propriedade atualizada com sucesso!",
                    showConfirmButton: false,
                    timer: 2000
                });
                setSelectedProperty(null);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao atualizar propriedade",
                    text: "Não foi possível atualizar a propriedade."
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro no servidor",
                text: "Tente novamente mais tarde."
            });
        }
    };

    const handleDeleteProperty = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/properties/${selectedProperty._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-key": "67368879e4fffec0af75ce03",
                },
            });

            if (response.ok) {
                setProperties((prev) => prev.filter((property) => property._id !== selectedProperty._id));
                Swal.fire({
                    icon: "success",
                    title: "Propriedade deletada com sucesso!",
                    showConfirmButton: false,
                    timer: 2000
                });
                setSelectedProperty(null);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao deletar inquilino",
                    text: "Não foi possível deletar a propriedade."
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro no servidor",
                text: "Tente novamente mais tarde."
            });
        }
    };

    const handleCreateProperty = async (e) => {
        e.preventDefault();
        try {
            const newProperty = {
                name: createFormData.name,
                code: createFormData.code,
                size: createFormData.size,
                tenant: createFormData.tenant,
            };

            // Atualiza imediatamente a lista de propriedades no estado
            setProperties((prev) => [...prev, newProperty]);

            // Limpa o formulário de criação
            setCreateFormData({
                name: "",
                code: "",
                size: "",
                tenant: "",
            });
            setShowForm(false);

            Swal.fire({
                icon: "success",
                title: "Propriedade criada com sucesso!",
                showConfirmButton: false,
                timer: 2000
            });

            // Se necessário, pode fazer a requisição ao servidor aqui
            const response = await fetch("http://localhost:3001/api/properties/register", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-key": "67368879e4fffec0af75ce03",
                },
                body: JSON.stringify(createFormData),
            });

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao criar propriedade",
                    text: "Não foi possível criar a propriedade."
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro no servidor",
                text: "Tente novamente mais tarde."
            });
        }
    };

    const translateSize = (size) => {
        switch (size) {
            case 'small':
                return 'pequeno';
            case 'medium':
                return 'médio';
            case 'large':
                return 'grande';
        }
        return ''
    };

    const selectedTenant = tenants.find((t) => t._id === createFormData.tenant);

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Propriedades</h2>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancelar" : "Criar Nova"}
                </button>
            </div>

            {/* Formulário de criação */}
            {showForm && (
                <form
                    onSubmit={handleCreateProperty}
                    className="bg-white p-4 rounded-lg shadow-md mb-4 space-y-4"
                >
                    <div>
                        <label className="block font-medium">Nome:</label>
                        <input
                            type="text"
                            value={createFormData.name}
                            onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Código:</label>
                        <input
                            type="text"
                            value={createFormData.code}
                            onChange={(e) => setCreateFormData({ ...createFormData, code: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Tamanho:</label>
                        <select
                            value={createFormData.size}
                            onChange={(e) => setCreateFormData({ ...createFormData, size: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="" disabled>
                                Selecione o tamanho
                            </option>
                            <option value="small">Pequeno</option>
                            <option value="medium">Médio</option>
                            <option value="large">Grande</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Inquilino</label>
                        <select
                            value={createFormData.tenant?._id || ''} // Certifique-se de acessar o _id do tenant
                            onChange={(e) => {
                                const selectedTenant = tenants.find((t) => t._id === e.target.value);
                                setCreateFormData({ ...createFormData, tenant: selectedTenant }); // Atualize corretamente o estado
                            }}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="" disabled>
                                Selecione o inquilino
                            </option>
                            {tenants.map((tenant) => (
                                <option key={tenant._id} value={tenant._id}>
                                    {tenant.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Criar Propriedade
                    </button>
                </form>
            )}

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="space-y-4">
                    {properties.length > 0 ? (
                        <ul>
                            {properties.map((property) => (
                                <li key={property.code} className="flex justify-between items-center p-4 border-b">
                                    <div>
                                        <p><strong>{property.name}</strong></p>
                                        <p>{property.code}</p>
                                        <p>Tamanho: {translateSize(property.size)}</p>
                                    </div>
                                    <div>
                                        <button
                                            className="text-blue-500 mr-2"
                                            onClick={() => handleEditClick(property)}
                                        >
                                            Editar
                                        </button>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhuma propriedade encontrada.</p>
                    )}

                    {selectedProperty && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-xl font-bold mb-4">Editar Propriedade</h3>
                                <form onSubmit={handleEditSubmit} className="space-y-4">
                                    <div>
                                        <label className="block font-medium">Nome:</label>
                                        <input
                                            type="text"
                                            value={editFormData.name}
                                            onChange={(e) =>
                                                setEditFormData({ ...editFormData, name: e.target.value })
                                            }
                                            className="w-full p-2 border rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Código:</label>
                                        <input
                                            type="text"
                                            value={editFormData.code}
                                            onChange={(e) =>
                                                setEditFormData({ ...editFormData, code: e.target.value })
                                            }
                                            className="w-full p-2 border rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Tamanho:</label>
                                        <select
                                            value={editFormData.size}
                                            onChange={(e) => setEditFormData({ ...editFormData, size: e.target.value })}
                                            className="w-full p-2 border rounded-lg"
                                            required
                                        >
                                            <option value="" disabled>
                                                Selecione o tamanho
                                            </option>
                                            <option value="small">Pequeno</option>
                                            <option value="medium">Médio</option>
                                            <option value="large">Grande</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-medium">Inquilino:</label>
                                        <select
                                            value={editFormData.tenant?._id || ''} // Certifique-se de acessar o _id corretamente
                                            onChange={(e) => {
                                                const selectedTenant = tenants.find((t) => t._id === e.target.value);
                                                setEditFormData({ ...editFormData, tenant: selectedTenant }); // Corrija para atualizar o editFormData
                                            }}
                                            className="w-full p-2 border rounded-lg"
                                            required
                                        >
                                            <option value="" disabled>
                                                Selecione um inquilino
                                            </option>
                                            {tenants.map((item) => (
                                                <option key={item._id} value={item._id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-between space-x-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                            onClick={() => setSelectedProperty(null)}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                            onClick={handleDeleteProperty}
                                        >
                                            Deletar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Properties;
