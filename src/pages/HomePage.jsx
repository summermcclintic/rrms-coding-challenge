import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Home Page</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate("/products")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                    Products
                </button>
                <button
                    onClick={() => navigate("/carts")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                    Carts
                </button>
            </div>
        </div>
    );
};

export default HomePage;