import AuthenticationForm from "../components/AuthenticationForm";
import RoleSelection from "../components/RoleSelection";
import UserCreationForm from "../components/UserCreationForm";
import React, { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div>
      <h1>Authenticate with Salesforce Marketing Cloud</h1>
      <AuthenticationForm onTokenReceive={setToken} />
      {token && <RoleSelection token={token} onRoleSelect={setSelectedRole} />}
      {token && selectedRole && (
        <UserCreationForm token={token} selectedRole={selectedRole} />
      )}
    </div>
  );
}
