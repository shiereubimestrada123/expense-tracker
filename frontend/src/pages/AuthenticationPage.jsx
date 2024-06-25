import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const AuthenticationPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative h-dvh flex overflow-hidden bg-gray-100">
      <Login
        isSignIn={isSignIn}
        emailFocused={emailFocused}
        setEmailFocused={setEmailFocused}
        passwordFocused={passwordFocused}
        setPasswordFocused={setPasswordFocused}
        toggleForm={toggleForm}
      />
      <SignUp
        isSignIn={isSignIn}
        toggleForm={toggleForm}
        nameFocused={nameFocused}
        setNameFocused={setNameFocused}
        emailFocused={emailFocused}
        setEmailFocused={setEmailFocused}
        passwordFocused={passwordFocused}
        setPasswordFocused={setPasswordFocused}
      />
    </div>
  );
};

export default AuthenticationPage;
