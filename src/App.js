import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import { UserProvider } from "./context/UserContext";
import RoutesList from './RoutesList';
import useLogin from "./hooks/useLogin";
import useSignup from "./hooks/useSignup";
import useAuth from "./hooks/useAuth";
import useLocalStorage from "./hooks/useLocalStorage";
import JoblyApi from "./api/api";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currentUser, setCurrentUser] = useState(null);

  const login = useLogin(setToken);
  const { signup } = useSignup(setToken);

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <UserProvider value={{ currentUser, setCurrentUser }}>
      <AppWithAuth
        token={token}
        setToken={setToken}
        login={login}
        signup={signup}
        logout={logout}
      />
    </UserProvider>
  );
}

function AppWithAuth({ token, setToken, login, signup, logout }) {
  useAuth(token);
  JoblyApi.token = token;
  return (
    <BrowserRouter>
      <NavBar logout={logout} />
      <RoutesList setToken={setToken} login={login} signup={signup} />
    </BrowserRouter>
  );
}

export default App;