import JoblyApi from "../api/api";

function useLogin(setToken) {
  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  return login;
}

export default useLogin;