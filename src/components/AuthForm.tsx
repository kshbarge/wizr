import { useState } from "react";

function AuthForm() {
  const [email, setEmail] = useState("");

  return (
    <form className="auth-form">
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          console.log(event.target.value);
        }}
        required
      />
    </form>
  );
}

export default AuthForm;
