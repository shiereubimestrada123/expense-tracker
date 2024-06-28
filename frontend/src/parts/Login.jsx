import { useState } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import useThrottledToast from "../hooks/useThrottledToast";
import InputField from "../components/InputField";

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
    onCompleted: (data) => {
      showToast(data.login.message, "success");
      setLoginData({
        username: "",
        password: "",
      });
      navigate("/");
    },
    onError: (error) => {
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
    await login({
      variables: {
        input: {
          username: loginData.username,
          password: loginData.password,
        },
      },
    });
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
            <InputField
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={loginData.username}
              focused={emailFocused}
              setFocused={setEmailFocused}
              handleChange={handleChange}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={loginData.password}
              focused={passwordFocused}
              setFocused={setPasswordFocused}
              handleChange={handleChange}
            />
            <button
              type="submit"
              className="w-full p-2 bg-button-gradient text-white rounded"
            >
              Sign In
            </button>
            <p className="md:hidden lg:hidden block">
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
  toggleForm: PropTypes.func,
};

export default Login;
