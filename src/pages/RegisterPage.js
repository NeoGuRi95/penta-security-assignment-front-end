import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userNm, setUserNm] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    API.post("/api/users", {
      userId,
      userPw,
      userNm,
    })
      .then(() => {
        alert("회원가입에 성공했습니다!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        alert("회원가입 실패: " + error.response.data.message);
      });
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>이름:</label>
          <input
            type="text"
            value={userNm}
            onChange={(e) => setUserNm(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
