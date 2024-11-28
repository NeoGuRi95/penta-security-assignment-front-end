import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import UserDetailPage from "./pages/UserDetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/user/:userId" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
