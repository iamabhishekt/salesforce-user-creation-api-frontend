import axios from "axios";
import React, { useState } from 'react';

const UserCreationForm = ({ token, Role, onCreateSuccess }) => {
  const [userDetails, setUserDetails] = useState({
    // Add default or empty values for all user details needed
    clientId: '',
    userId: '',
    password: '',
    name: '',
    email: '',
    notificationEmail: '',
    defaultBusinessUnit: '',
    activeFlag: false,
    mustChangePassword: false,
    isApiUser: false,
    isLocked: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/createUser", {
        token,
        userDetails,
        Role,
      });

      if (onCreateSuccess) onCreateSuccess(response.data);
    } catch (err) {
      console.log('Submitting User Details:', userDetails, 'Selected Role:', Role);
      setError("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Business Unit ID:
        <input
          type="text"
          name="clientId"
          value={userDetails.clientId}
          onChange={handleChange}
        />
      </label>
      <label>
        New User ID:
        <input
          type="text"
          name="userId"
          value={userDetails.userId}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Notification Email Address:
        <input
          type="email"
          name="notificationEmail"
          value={userDetails.notificationEmail}
          onChange={handleChange}
        />
      </label>
      <label>
        Default Business Unit:
        <input
          type="text"
          name="defaultBusinessUnit"
          value={userDetails.defaultBusinessUnit}
          onChange={handleChange}
        />
      </label>
      <label>
        Active Flag:
        <input
          type="checkbox"
          name="activeFlag"
          checked={userDetails.activeFlag}
          onChange={(e) =>
            handleChange({
              target: { name: "activeFlag", value: e.target.checked },
            })
          }
        />
      </label>
      <label>
        Must Change Password:
        <input
          type="checkbox"
          name="mustChangePassword"
          checked={userDetails.mustChangePassword}
          onChange={(e) =>
            handleChange({
              target: { name: "mustChangePassword", value: e.target.checked },
            })
          }
        />
      </label>
      <label>
        Is API User:
        <input
          type="checkbox"
          name="isApiUser"
          checked={userDetails.isApiUser}
          onChange={(e) =>
            handleChange({
              target: { name: "isApiUser", value: e.target.checked },
            })
          }
        />
      </label>
      <label>
        Is Locked:
        <input
          type="checkbox"
          name="isLocked"
          checked={userDetails.isLocked}
          onChange={(e) =>
            handleChange({
              target: { name: "isLocked", value: e.target.checked },
            })
          }
        />
      </label>
      <button type="submit">Create User</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default UserCreationForm;
