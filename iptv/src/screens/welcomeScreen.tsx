import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const WelcomeScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"
    };

    const handleWhatch = () => {
        navigate("/home");
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Bienvenido a la IPTV</h1>
            <div>
                <button className="px-4 py-2 bg-blue-600 rounded mt-4 mx-4"
                    onClick={handleWhatch}> Ver Canales </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded mt-4 mx-4"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );

};

export default WelcomeScreen;