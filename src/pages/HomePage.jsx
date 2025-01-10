import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Home Page</h1>
            <div className="flex space-x-4">
                <Button onClick={() => navigate("/products")} color="blue">
                    Products
                </Button>
                <Button onClick={() => navigate("/carts")} color="blue">
                    Carts
                </Button>
            </div>
        </div>
    );
};

export default HomePage;