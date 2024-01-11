import React from "react";
import "./SignupSignin.css";
import Input from "../Input/Input";
import { useState } from "react";
import Button from "../Button/Button";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"Tony Stark"}
        />
        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"TonyStark@gmail.com"}
        />
        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
        />
        <Button text={"Signup Using Email and Password "} />
        <p style={{textAlign:"center"}}>or</p>
        <Button text={"Signup Using Google"} blue={true} />
      </form>
    </div>
  );
}

export default SignupSignin;
