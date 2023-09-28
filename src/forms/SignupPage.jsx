import { useState } from "react";
import axios from "axios";

function SignupPage({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then(() => onSuccess?.())
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          const errorDescription = err.response.data.message;
          setErrorMessage(errorDescription);
        } else {
          console.log(err);
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="SignupPage">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} N onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignupPage;
