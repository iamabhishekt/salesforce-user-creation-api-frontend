import { useState, useEffect } from "react";
import axios from "axios";

const RoleSelection = ({ token, onRoleSelect }) => {
  const [roles, setRoles] = useState([]);
  const [Role, setRole] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // const response = await axios.get('http://localhost:3001/getRoles', {
        const response = await axios.get(
          "https://salesforce-user-creation-api-backend.onrender.com/getRoles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
          setError("Failed to fetch roles");
        }
      } catch (err) {
        console.error(err); // Log the actual error
        setError("Failed to fetch roles");
      }
    };

    if (token) fetchRoles();
  }, [token]);

  const handleRoleSelect = () => {
    onRoleSelect(Role);
  };

  return (
    <div>
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Select a Role</option>
        {roles.map((role) => (
          <option key={role.roleID} value={role.roleID}>
            {role.roleName}
          </option>
        ))}
      </select>
      <button onClick={handleRoleSelect}>Select Role</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default RoleSelection;
