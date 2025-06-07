import { useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../context/UserContext";
import JoblyApi from "../api/api";

function useAuth(token) {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        if (token) {
          const { username } = jwtDecode(token);
          console.log("💡 decoded username:", username);
          JoblyApi.token = token;  // ✅ API에 토큰 설정
          const user = await JoblyApi.getCurrentUser(username);
          console.log("✅ loaded user:", user);
          setCurrentUser(user);    // ✅ context에 유저 저장
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Error loading user info", err);
        setCurrentUser(null);
      }
    }

    fetchUserInfo();
  }, [token, setCurrentUser]);
}

export default useAuth;
