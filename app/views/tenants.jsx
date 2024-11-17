'use client';
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Tenants = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [ filterName, setFilterName ] = useState(""); // Filtro por nome
    const [ filterOverdue, setFilterOvedue ] = useState(""); // Filtro pelo tipo de inadimpência
    const [editFormData, setEditFormData] = useState({
        name: "",
        cpf: "",
        value: 0,
        phone: "",
        overdue: false,
        overdueTime: 0,
        properties: 0,
    });
    const [showForm, setShowForm] = useState(false); // Controla o formulário de criação
    const [createFormData, setCreateFormData] = useState({
        name: "",
        cpf: "",
        value: 0,
        phone: "",
        overdue: false,
        overdueTime: 0,
        properties: 0,
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/tenants/", {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-access-key': '67368879e4fffec0af75ce03'
                    }),
                });
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao buscar inquilinos",
                    text: "Erro ao carregar os dados."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleEditClick = (tenant) => {
        setSelectedTenant(tenant);
        setEditFormData({ ...tenant });
    };

    const filteredProperties = properties.filter((tenant) => {
        const matchesNames = tenant.name.toLowerCase().includes(filterName.toLocaleLowerCase());
        const matchesOverdue =
            filterOverdue === "" || tenant.overdue === (filterOverdue === "true");
        return matchesNames && matchesOverdue;
    });

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/tenants/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-key": "67368879e4fffec0af75ce03",
                },
                body: JSON.stringify(editFormData)
            });

            if (response.ok) {
                const updatedTenant = await response.json();
                setProperties((prev) =>
                    prev.map((tenant) =>
                        tenant._id === updatedTenant._id ? updatedTenant : tenant
                    )
                );
                Swal.fire({
                    icon: "success",
                    title: "Inquilino atualizado com sucesso!",
                    showConfirmButton: false,
                    timer: 2000
                });
                setSelectedTenant(null);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao atualizar inquilino",
                    text: "Não foi possível atualizar o inquilino."
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

    const handleDeleteTenant = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/tenants/${selectedTenant._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-key": "67368879e4fffec0af75ce03",
                },
            });

            if (response.ok) {
                setProperties((prev) => prev.filter((tenant) => tenant._id !== selectedTenant._id));
                Swal.fire({
                    icon: "success",
                    title: "Inquilino deletado com sucesso!",
                    showConfirmButton: false,
                    timer: 2000
                });
                setSelectedTenant(null);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao deletar inquilino",
                    text: "Não foi possível deletar o inquilino."
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

    const handleCreateTenant = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/tenants/register", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-key": "67368879e4fffec0af75ce03",
                },
                body: JSON.stringify(createFormData),
            });

            if (response.ok) {
                const newTenant = await response.json();
                setProperties((prev) => [...prev, newTenant.tenant]);
                setCreateFormData({
                    name: "",
                    cpf: "",
                    phone: "",
                    overdue: false,
                    overdueTime: 0,
                    properties: 0,
                });
                setShowForm(false);
                Swal.fire({
                    icon: "success",
                    title: "Inquilino criado com sucesso!",
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao criar inquilino",
                    text: "Não foi possível criar o inquilino."
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

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Inquilinos</h2>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancelar" : "Criar Novo"}
                </button>
            </div>

            {/* Filtro por Nome  */}
            <input 
                type="text"
                placeholder="Filtra por nome"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="w-4/5 p-2 mb-3 border rounded-lg"
            />

            {/* Filtro por tipo de Inadimplência */}
            <select
            value={filterOverdue}
            onChange={(e) => setFilterOvedue(e.target.value)}
            className="w-1/5 p-2 mb-3 rounded-lg"
            >
                <option value="">Todos</option>
                <option value="true">Inadimplentes</option>
                <option value="false">Não inadimplentes</option>
            </select>

            {/* Formulário de criação */}
            {showForm && (
                <form
                    onSubmit={handleCreateTenant}
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
                        <label className="block font-medium">CPF:</label>
                        <input
                            type="text"
                            value={createFormData.cpf}
                            onChange={(e) => setCreateFormData({ ...createFormData, cpf: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Telefone:</label>
                        <input
                            type="text"
                            value={createFormData.phone}
                            onChange={(e) => setCreateFormData({ ...createFormData, phone: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Salvar
                    </button>
                </form>
            )}

            {loading ? (
                <div className="text-center text-xl text-gray-600">Carregando...</div>
            ) : (
                <ul className="space-y-3">
                    {filteredProperties.map((item, index) => (
                        <li
                            key={index}
                            className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition space-x-2 cursor-pointer"
                            onClick={() => handleEditClick(item)}
                        >
                            <div className="flex items-center space-x-2">
                                <span>👤</span>
                                <span className="font-bold">{item.name}</span>
                            </div>
                            <div>
                                <strong>CPF:</strong> {item.cpf}
                            </div>
                            <div>
                                <strong>Telefone:</strong> {item.phone}
                            </div>
                            <div>
                                <strong>Inadimplente:</strong> {item.overdue ? "Sim" : "Não"}
                            </div>
                            <div>
                                <strong>Tempo de Inadimplência:</strong> {item.overdueTime} dias
                            </div>
                            <div>
                                <strong>Quantidade de Propriedades:</strong> {item.properties}
                            </div>
                            <div>
                                <strong>Valor:</strong> R$ {item.value.toLocaleString("pt-BR")}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {selectedTenant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4">
                        <div className="flex justify-between">
                            <h3 className="text-2xl font-bold mb-4">Editar Inquilino</h3>
                            <div className="flex items-center">
                                <label className="block font-medium mr-2">Inadimplente </label>
                                <input
                                    type="checkbox"
                                    checked={editFormData.overdue}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, overdue: e.target.checked })
                                    }
                                    className="h-5 w-5"
                                />
                            </div>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            {/* Primeira linha */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1">
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

                            </div>

                            {/* Segunda linha */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1">
                                    <label className="block font-medium">CPF:</label>
                                    <input
                                        type="text"
                                        value={editFormData.cpf}
                                        onChange={(e) =>
                                            setEditFormData({ ...editFormData, cpf: e.target.value })
                                        }
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-medium">Telefone:</label>
                                    <input
                                        type="text"
                                        value={editFormData.phone}
                                        onChange={(e) =>
                                            setEditFormData({ ...editFormData, phone: e.target.value })
                                        }
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terceira linha */}
                            <div className="flex flex-wrap gap-4">
                                <div className="w-/5">
                                    <label className="block font-medium">Tempo de Inadimplência:</label>
                                    <input
                                        type="number"
                                        value={editFormData.overdueTime}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                overdueTime: parseInt(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-medium">Valor:</label>
                                    <input
                                        type="number"
                                        value={editFormData.value || ""}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                value: parseFloat(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="flex justify-between space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                    onClick={() => setSelectedTenant(null)}
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
                                    onClick={handleDeleteTenant}
                                >
                                    Deletar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Tenants;
