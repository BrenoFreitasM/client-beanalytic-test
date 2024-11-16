"use client";

import React, { useState } from "react";

import Tenants from "../views/tenants";
import Properties from "../views/properties";
import Invoices from "../views/invoices";

const Home = () => {
  const [activeTab, setActiveTab] = useState("list"); // "list", "grid", "summary"

  return (
    <div
      className="flex min-h-screen bg-gray-100 text-gray-600"
      style={{
        backgroundImage: "url('/analog-landscape-city-with-buildings.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Drawer */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("tenants")}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === "tenants" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Inquilinos
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("properties")}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === "properties" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Imóveis
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === "invoices" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-white bg-opacity-90 rounded-l-lg shadow-lg">
        {activeTab === "tenants" && <Tenants />}
        {activeTab === "properties" && <Properties />}
        {activeTab === "invoices" && <Invoices />}
      </div>
    </div>
  );
};


export default Home;
