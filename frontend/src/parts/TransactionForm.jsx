import { useState } from "react";
import Select from "react-select";
import InputField from "../components/InputField";

const paymentTypes = [
  { value: "card", label: "Card" },
  { value: "cash", label: "Cash" },
];

const categories = [
  { value: "saving", label: "Saving" },
  { value: "expense", label: "Expense" },
  { value: "investment", label: "Investment" },
];

const TransactionForm = () => {
  const [focused, setFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    paymentTypes[0]
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [amount, setAmount] = useState(0);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    console.log("handlechange");
  };

  return (
    <form className="flex flex-col gap-2">
      <div>
        <label htmlFor="description">Description</label>
        <InputField
          id="description"
          name="description"
          type="text"
          required
          placeholder="Rent, Groceries, Salary, etc."
          focused={descriptionFocused}
          setFocused={setDescriptionFocused}
          handleChange={handleChange}
          value={description}
        />
      </div>

      <div>
        <label htmlFor="paymentType">Payment Type</label>
        <select
          className={`block appearance-none w-full bg-transparent border ${
            focused ? "border-button-gradient" : "border-gray-200"
          } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none`}
          id="paymentType"
          name="paymentType"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
        >
          <option value={"card"}>Card</option>
          <option value={"cash"}>Cash</option>
        </select>
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          className={`block appearance-none w-full bg-transparent border ${
            focused ? "border-button-gradient" : "border-gray-200"
          } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none`}
          id="paymentType"
          name="paymentType"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
        >
          <option value={"saving"}>Saving</option>
          <option value={"expense"}>Expense</option>
          <option value={"investment"}>Investment</option>
        </select>
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <InputField
          id="amount"
          name="amount"
          type="number"
          placeholder="100"
          focused={amountFocused}
          setFocused={setAmountFocused}
          handleChange={handleChange}
          value={amount}
        />
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <InputField
          id="location"
          name="location"
          type="text"
          placeholder="Pasig"
          focused={locationFocused}
          setFocused={setLocationFocused}
          handleChange={handleChange}
          value={location}
        />
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <InputField
          id="date"
          name="date"
          type="date"
          placeholder="Select date"
          focused={dateFocused}
          setFocused={setDateFocused}
          handleChange={handleChange}
          value={date}
        />
      </div>
    </form>
  );
};

export default TransactionForm;
