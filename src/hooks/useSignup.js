import JoblyApi from "../api/api";

function useSignup(setToken) {
  console.log("✅ setToken is:", setToken);
  async function signup(signupData) {
    try {
      const token = await JoblyApi.register(signupData);
      console.log("✅ signupData is:", signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, errors: err };
    }
  }

  return { signup };
}

export default useSignup;