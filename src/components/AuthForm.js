import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    /*
        if (name == "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
        */
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create newAccount
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
