import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to My Vite App</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate("/products")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Products
                </button>
                <button
                    onClick={() => navigate("/carts")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Carts
                </button>
                <button
                    onClick={() => navigate("/example")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Example
                </button>
                {/* <button
                    onClick={() => navigate("/testing")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Testing
                </button> */}
            </div>
        </div>
    );
};

export default HomePage;