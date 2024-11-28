import React, { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 로그인 요청
      const response = await API.post("/auth/login", { userId, userPw });
      // 컨텍스트 상태 업데이트
      await login(response.data);
      // 대시보드로 라우팅
      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인 실패: " + error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/register">회원가입</a>
    </div>
  );
};

export default LoginPage;
