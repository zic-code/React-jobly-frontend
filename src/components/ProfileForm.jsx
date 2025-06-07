import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import JoblyApi from "../api/api";
import "./ProfileForm.css";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    password: ""
  });

  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    try {
      const updatedUser = await JoblyApi.saveProfile(formData.username, profileData);
      setFormData(f => ({ ...f, password: "" }));
      setFormErrors([]);
      setSaveConfirmed(true);
      setCurrentUser(updatedUser);
    } catch (err) {
      setFormErrors(err);
    }
  }

  return (
    <div className="ProfileForm">
      <h3>Profile</h3>
      <form onSubmit={handleSubmit}>
        <div><b>Username:</b> {formData.username}</div>

        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Confirm password" type="password" />

        <button>Save Changes</button>
      </form>

      {formErrors.length > 0 && <div className="errors">{formErrors.join(", ")}</div>}
      {saveConfirmed && <div className="msg">Changes saved!</div>}
    </div>
  );
}

export default ProfileForm;
