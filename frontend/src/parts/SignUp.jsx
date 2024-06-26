import { useState } from "react";

import PropTypes from "prop-types";
import RadioButton from "../components/RadioButton";

const SignUp = ({
  isSignIn,
  toggleForm,
  nameFocused,
  setNameFocused,
  emailFocused,
  setEmailFocused,
  passwordFocused,
  setPasswordFocused,
}) => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`absolute inset-0 flex transition-transform duration-1000 transform ${
        isSignIn ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[url('/login.svg')] bg-cover bg-no-repeat text-white tracking-widest">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-bold">Welcome back!</h2>
          <p className="text-xl p-10">Already have an account?</p>
          <button
            onClick={toggleForm}
            className="mt-4 text-xl border-2 border-white px-10 py-2 rounded-full"
          >
            SIGN IN
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/4 lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent text-center">
            Create Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              className={`w-full p-2 border rounded focus:outline-none ${
                nameFocused ? "border-button-gradient" : "border-gray-300"
              }`}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              onChange={handleChange}
              value={signUpData.name}
            />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className={`w-full p-2 border rounded focus:outline-none ${
                emailFocused ? "border-button-gradient" : "border-gray-300"
              }`}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChange={handleChange}
              value={signUpData.username}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className={`w-full p-2 border rounded focus:outline-none ${
                passwordFocused ? "border-button-gradient" : "border-gray-300"
              }`}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={handleChange}
              value={signUpData.password}
            />
            <div className="flex gap-10">
              <RadioButton
                id="male"
                label="Male"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              <RadioButton
                id="female"
                label="Female"
                name="gender"
                value="female"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-button-gradient text-white rounded"
            >
              SIGN UP
            </button>
            <p className="lg:hidden block">
              If you already have an account? Please{" "}
              <span
                className="text-primary-gradient italic tracking-wider"
                onClick={toggleForm}
              >
                login
              </span>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
  nameFocused: PropTypes.bool.isRequired,
  setNameFocused: PropTypes.func.isRequired,
  emailFocused: PropTypes.bool.isRequired,
  setEmailFocused: PropTypes.func.isRequired,
  passwordFocused: PropTypes.bool.isRequired,
  setPasswordFocused: PropTypes.func.isRequired,
};

export default SignUp;
