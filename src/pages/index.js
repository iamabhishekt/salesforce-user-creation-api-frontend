import AuthenticationForm from "../components/AuthenticationForm";
import RoleSelection from "../components/RoleSelection";
import UserCreationForm from "../components/UserCreationForm";
import React, { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState(null);
  const [Role, setRole] = useState(null);

  return (
    <div>
      <h1>Authenticate with Salesforce Marketing Cloud</h1>
      <AuthenticationForm onTokenReceive={setToken} />
      {token && <RoleSelection token={token} onRoleSelect={setRole} />}
      {token && Role && (
        <UserCreationForm token={token} Role={Role} />
      )}
    </div>
  );
}
