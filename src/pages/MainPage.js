import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const MainPage = () => {
  const { user, isLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!user && !isLoading) {
      console.info("회원 정보가 없습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
    if (user && user.userAuth === "SYSTEM_ADMIN") {
      fetchUserList(searchWord);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (user && user.userAuth === "SYSTEM_ADMIN") {
      fetchUserList(searchWord, page);
    }
  }, [page]);

  const fetchUserList = async (searchWord) => {
    await API.get(`/api/users?searchWord=${searchWord}&page=${page}`)
      .then((response) => {
        setUserList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Failed to fetch user list:", error);
      });
  };

  const handleSearch = () => {
    setPage(0); // 검색 시 페이지를 0으로 초기화
    fetchUserList(searchWord, 0);
  };

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>[{user?.userId}]님 환영합니다.</h1>
      <h2>사용자 목록</h2>
      <input
        type="text"
        placeholder="ID 혹은 이름을 검색하세요."
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <button onClick={handleSearch}>검색</button>
      <table>
        <thead>
          <tr>
            <th>사용자 ID</th>
            <th>사용자 이름</th>
            <th>사용자 권한</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.userId} onClick={() => handleRowClick(user.userId)}>
              <td>{user.userId}</td>
              <td>{user.userNm}</td>
              <td>{user.userAuth}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
        >
          이전
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page + 1 >= totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MainPage;
