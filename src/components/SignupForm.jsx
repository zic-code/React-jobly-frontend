import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css"

function SignupPage({ signup }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [error, setError] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.errors);
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input name="username" placeholder="username" onChange={handleChange} />
      <input name="password" placeholder="password" type="password" onChange={handleChange} />
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="e-mail" type="email" onChange={handleChange} />
      <button>Sign up</button>
      {error && <p>{Array.isArray(error) ? error.join(", ") : error.message || String(error)}</p>}
    </form>
  );
}

export default SignupPage;