import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const UserDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get(`/api/users/${userId}`).then((responseData) => {
      setUser(responseData.data);
    });
  }, [userId]);

  const deleteUser = () => {
    API.delete(`/api/users?userId=${userId}`).then(() => navigate("/main"));
  };

  const updateUser = () => {
    API.put(`/api/users?userId=${user.userId}`, { userNm: user.userNm }).then(
      () => navigate(`/user/${userId}`)
    );
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>회원 상세 페이지</h1>
      {user && (
        <div>
          <div>
            <button onClick={deleteUser}>삭제</button>
            <button onClick={updateUser}>수정</button>
          </div>
          <div>
            <p>
              <strong>ID:</strong> {user.userId}
            </p>
            <div>
              <strong>이름:</strong>
              <input
                type="text"
                value={user.userNm}
                onChange={(e) => {
                  setUser((prev) => {
                    return {
                      ...prev,
                      userNm: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <p>
              <strong>Role:</strong> {user.userAuth}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
