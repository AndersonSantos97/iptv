import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import WelcomeScreen from "./screens/welcomeScreen";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<PrivateRoute><WelcomeScreen /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><HomeScreen /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
