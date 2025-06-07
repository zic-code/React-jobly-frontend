import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  // handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/"); 
    } else {
      setFormErrors(result.errors);
    }
  }

  // update form data
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="LoginForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h2 className="mb-3">Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="username"
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>

        {formErrors.length > 0 && (
          <div className="alert alert-danger">
            {formErrors.map((err, idx) => <div key={idx}>{err}</div>)}
          </div>
        )}

        <button className="btn btn-primary w-100">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;