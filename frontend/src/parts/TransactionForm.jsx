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
  const [paymentFocused, setPaymentFocused] = useState(false);
  const [categoryFocused, setCategoryFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [formState, setFormState] = useState({
    description: "",
    selectedPaymentType: paymentTypes[0],
    selectedCategory: categories[0],
    amount: 0,
    location: "",
    date: "",
  });

  // console.log(formState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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
          value={formState.description}
        />
      </div>

      <div>
        <label htmlFor="paymentType">Payment Type</label>
        <select
          className={`block appearance-none w-full bg-transparent border ${
            paymentFocused ? "border-button-gradient" : "border-gray-200"
          } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none`}
          id="paymentType"
          name="selectedPaymentType"
          onFocus={() => setPaymentFocused(true)}
          onBlur={() => setPaymentFocused(false)}
          onChange={handleChange}
          value={formState.selectedPaymentType.value}
        >
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          className={`block appearance-none w-full bg-transparent border ${
            categoryFocused ? "border-button-gradient" : "border-gray-200"
          } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none`}
          id="category"
          name="selectedCategory"
          onFocus={() => setCategoryFocused(true)}
          onBlur={() => setCategoryFocused(false)}
          onChange={handleChange}
          value={formState.selectedCategory.value}
        >
          <option value="saving">Saving</option>
          <option value="expense">Expense</option>
          <option value="investment">Investment</option>
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
          value={formState.amount}
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
          value={formState.location}
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
          value={formState.date}
        />
      </div>
    </form>
  );
};

export default TransactionForm;
