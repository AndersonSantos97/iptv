import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/token", 
                {username, password},
                {headers:{"Content-Type": "application/json"}}
            );

            localStorage.setItem("token",response.data.access_token);
            alert("Inicio de sesión exitoso");
            window.location.href = "/"  //redirigir pantalla principal
        }catch(error){
            console.error("Error al iniciar sesion", error);
            alert("credenciales incorrectas")
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-xl font-bold">Iniciar sesión</h2>
                <input type="text" placeholder="Usuario" className="p-2" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Clave" className="p-2 border rounded mt-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="px-4 py-2 bg-blue-600 text-white rounded mt-2" onClick={handleLogin}>Ingresar</button>
            </div>
        </>
    );
};

export default Login;