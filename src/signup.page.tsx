import { useState } from "react";
import "./css/App.css";
import { validateUsername, validatePassword } from "./validation";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(true);

  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState<{
    isValid: boolean;
    message?: string;
  }>({ isValid: false });

  const [password, setPassword] = useState("");
  const [passwordValidation, setPassowordValidation] = useState<{
    isValid: boolean;
    message?: string;
  }>({ isValid: false });

  /*
    ************************************************
    Handle username
    ************************************************
  */
  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setUsername(value);
    const result = validateUsername(value);
    setUsernameValidation(result);
  };

  /*
    ************************************************
    Handle password
    ************************************************
  */
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPassword(value);
    const result = validatePassword(value, username);
    setPassowordValidation(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passVal = validatePassword(password, username);
    const userVal = validateUsername(username);
    setPassowordValidation(passVal);
    setUsernameValidation(userVal);
  };

  return (
    <main
      className="container form-background"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: 380, margin: "0 auto" }}
      >
        <hgroup style={{ textAlign: "center" }}>
          <h1>Sign up</h1>
          <h2>to Adidas Experience</h2>
        </hgroup>
        <input
          className="m0"
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChange}
        />
        <div
          style={{
            minHeight: "1.5em",
            marginBottom: "0.5em",
            textAlign: "left",
          }}
        >
          {
            <span className="input-error fsize-18">
              {!usernameValidation.isValid
                ? usernameValidation.message
                : null}
            </span>
          }
        </div>

        <input
          className="m0"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChange}
        />
        <div
          style={{
            minHeight: "1.5em",
            marginBottom: "0.5em",
            textAlign: "left",
          }}
        >
          {
            <span className="input-error fsize-18">
              {!passwordValidation.isValid
                ? passwordValidation.message
                : null}
            </span>
          }
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            marginBottom: "1em",
            fontSize: "18px",
          }}
        >
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show password
        </label>

        <button
          type="submit"
          style={{ width: "100%", marginTop: "1em" }}
          onClick={() => {
            alert("Welcome!");
          }}
          disabled={
            !(usernameValidation.isValid && passwordValidation.isValid)
          }
        >
          Enter
        </button>
      </form>
    </main>
  );
}

export default SignUpPage;
