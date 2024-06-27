import { useState } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import useThrottledToast from "../hooks/useThrottledToast";

const Login = ({
  isSignIn,
  emailFocused,
  setEmailFocused,
  passwordFocused,
  setPasswordFocused,
  toggleForm,
}) => {
  const navigate = useNavigate();
  const showToast = useThrottledToast();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    variables: {
      input: {
        username: loginData.username,
        password: loginData.password,
      },
    },
    onCompleted: (data) => {
      console.log("Login successful:", data); // Added logging
      showToast(data.login.message, "success");
      setLoginData({
        username: "",
        password: "",
      });
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error); // Added logging
      showToast(error.message, "error");
    },
    refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div
      className={`absolute inset-0 flex transition-transform duration-1000 transform ${
        isSignIn ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/4 lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent text-center">
            Sign In
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={loginData.username}
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
              value={loginData.password}
            />
            <button
              type="submit"
              className="w-full p-2 bg-button-gradient text-white rounded"
            >
              Sign In
            </button>
            <p className="lg:hidden block">
              Don&apos;t have an account yet? Please{" "}
              <span
                className="text-primary-gradient italic tracking-wider"
                onClick={toggleForm}
              >
                register
              </span>{" "}
              first.
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center bg-[url('/login.svg')] bg-cover bg-no-repeat text-white tracking-widest">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-bold">Hello there!</h2>
          <p className="text-xl p-10">
            Don&apos;t have an account yet? Please register first.
          </p>
          <button
            onClick={toggleForm}
            className="mt-4 text-xl border-2 border-white px-10 py-2 rounded-full"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
  emailFocused: PropTypes.bool.isRequired,
  setEmailFocused: PropTypes.func.isRequired,
  passwordFocused: PropTypes.bool.isRequired,
  setPasswordFocused: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default Login;
