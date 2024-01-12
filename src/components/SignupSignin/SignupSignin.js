import React from "react";
import "./SignupSignin.css";
import Input from "../Input/Input";
import { useState } from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function signupWithEmail() {
    setLoading(true); // Button will be enabled

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    // Authenticate the user , or basically signup using email and password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User created");
            // ...

            setLoading(false); // Button will be disabled

            setName(""); // clearing the input box after user is created
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            createDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);

            setLoading(false); // Button will be disabled
            // ..
          });
      } else {
        toast.error("Password and Confirm Password do not match.");
        setLoading(false); // Button will be disabled
      }
    } else {
      toast.warn("All fields are mandatory");
      setLoading(false); // Button will be disabled
    }
  }

  function createDoc(user) {
    // Make sure that the doc with the uid dosen't exitst
    // Create a doc
  }

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          type={"text"}
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"Tony Stark"}
        />
        <Input
          type={"email"}
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"TonyStark@gmail.com"}
        />
        <Input
          type={"password"}
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Input
          type={"password"}
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
        />
        <Button
          disabled={loading}
          text={loading ? "Loading..." : "Signup Using Google"}
          onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center" }}>or</p>
        <Button
          disabled={loading}
          text={loading ? "Loading..." : "Signup Using Google"}
          blue={true}
          // onClick={signupWithGoogle}
        />
      </form>
    </div>
  );
}

export default SignupSignin;
