import { useState } from "react";
import axios from "axios";

const AuthenticationForm = ({ onTokenReceive }) => {
  // Destructure onTokenReceive here
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [accountId, setAccountId] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post("http://localhost:3001/authenticate", {
      const response = await axios.post(
        "https://salesforce-user-creation-api-backend.onrender.com/authenticate",
        {
          client_id: clientId,
          client_secret: clientSecret,
          account_id: accountId,
        }
      );

      // Accessing the success message
      const successMessage = response.data.message;

      setSuccessMessage(successMessage);
      setToken(response.data.token);
      if (onTokenReceive) onTokenReceive(response.data.token); // Use onTokenReceive directly here
      setError(null);
    } catch (err) {
      setError("Failed to authenticate");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Client ID:
        <input
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
      </label>
      <label>
        Client Secret:
        <input
          type="text"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
        />
      </label>
      <label>
        Account ID:
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
      </label>
      <button type="submit">Authenticate</button>
      {token && <p>Token: {token}</p>}
      {successMessage && <p>{successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default AuthenticationForm;
