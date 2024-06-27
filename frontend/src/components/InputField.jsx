import PropTypes from "prop-types";

const InputField = ({
  id,
  name,
  type,
  placeholder,
  value,
  focused,
  setFocused,
  handleChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full p-2 border rounded focus:outline-none ${
        focused ? "border-button-gradient" : "border-gray-300"
      }`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={handleChange}
      value={value}
    />
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  focused: PropTypes.bool.isRequired,
  setFocused: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputField;
