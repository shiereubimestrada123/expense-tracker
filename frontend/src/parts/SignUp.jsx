import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import RadioButton from "../components/RadioButton";
import { SIGN_UP } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import useThrottledToast from "../hooks/useThrottledToast";
import InputField from "../components/InputField";

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
  const navigate = useNavigate();
  const showToast = useThrottledToast();

  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "male",
  });

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      showToast(data.signUp.message, "success");
      setSignUpData({
        name: "",
        username: "",
        password: "",
        gender: "male",
      });
      navigate("/");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
    refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
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
    await signUp({
      variables: {
        input: {
          name: signUpData.name,
          username: signUpData.username,
          password: signUpData.password,
          gender: signUpData.gender,
        },
      },
    });
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
            <div className="flex gap-2 items-center">
              <FaArrowAltCircleLeft />
              <span>SIGN IN</span>
            </div>
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/4 lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent text-center">
            Create Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={signUpData.name}
              focused={nameFocused}
              setFocused={setNameFocused}
              handleChange={handleChange}
            />
            <InputField
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={signUpData.username}
              focused={emailFocused}
              setFocused={setEmailFocused}
              handleChange={handleChange}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={signUpData.password}
              focused={passwordFocused}
              setFocused={setPasswordFocused}
              handleChange={handleChange}
            />
            <div className="flex gap-10">
              <RadioButton
                id="male"
                label="Male"
                name="gender"
                value="male"
                checked={signUpData.gender === "male"}
                onChange={handleChange}
              />
              <RadioButton
                id="female"
                label="Female"
                name="gender"
                value="female"
                checked={signUpData.gender === "female"}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-button-gradient text-white rounded"
            >
              {loading ? (
                <div className="flex items-center justify-center h-full w-full">
                  <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin" />
                </div>
              ) : (
                "SIGN UP"
              )}
            </button>
            <p className="md:hidden lg:hidden block">
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
