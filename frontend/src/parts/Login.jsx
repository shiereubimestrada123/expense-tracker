import PropTypes from "prop-types";

const Login = ({
  isSignIn,
  emailFocused,
  setEmailFocused,
  passwordFocused,
  setPasswordFocused,
  toggleForm,
}) => {
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
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-2 border rounded focus:outline-none ${
                emailFocused ? "border-button-gradient" : "border-gray-300"
              }`}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`w-full p-2 border rounded focus:outline-none ${
                passwordFocused ? "border-button-gradient" : "border-gray-300"
              }`}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
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
