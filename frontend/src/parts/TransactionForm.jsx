import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import InputField from "../components/InputField";
import useThrottledToast from "../hooks/useThrottledToast";

const paymentTypes = [
  { value: "", label: "Select payment type" },
  { value: "card", label: "Card" },
  { value: "cash", label: "Cash" },
];

const categories = [
  { value: "", label: "Select category" },
  { value: "saving", label: "Saving" },
  { value: "expense", label: "Expense" },
  { value: "investment", label: "Investment" },
];

const TransactionForm = () => {
  const showToast = useThrottledToast();

  const [paymentFocused, setPaymentFocused] = useState(false);
  const [categoryFocused, setCategoryFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [formState, setFormState] = useState({
    description: "",
    selectedPaymentType: "",
    selectedCategory: "",
    amount: "",
    location: "",
    date: "",
  });

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted: (data) => {
      setFormState({
        description: "",
        selectedPaymentType: "",
        selectedCategory: "",
        amount: "",
        location: "",
        date: "",
      });
      showToast(data.createTransaction.message, "success");
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
    refetchQueries: ["GetTransactions"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      description,
      selectedPaymentType,
      selectedCategory,
      amount,
      location,
      date,
    } = formState;

    if (
      !description ||
      !selectedPaymentType ||
      !selectedCategory ||
      !amount ||
      !date
    ) {
      showToast("All fields are required", "error");
      return;
    }

    await createTransaction({
      variables: {
        input: {
          description,
          paymentType: selectedPaymentType,
          category: selectedCategory,
          amount: parseFloat(amount),
          location,
          date,
        },
      },
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Description</label>
        <InputField
          id="description"
          name="description"
          type="text"
          required
          placeholder="Clothes, food, rent etc."
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
          placeholder="Select payment type"
          onFocus={() => setPaymentFocused(true)}
          onBlur={() => setPaymentFocused(false)}
          onChange={handleChange}
          value={formState.selectedPaymentType}
        >
          {paymentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
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
          placeholder="Select category"
          onFocus={() => setCategoryFocused(true)}
          onBlur={() => setCategoryFocused(false)}
          onChange={handleChange}
          value={formState.selectedCategory}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
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

      <button
        type="submit"
        className="w-full p-2 bg-button-gradient text-white rounded"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin" />
          </div>
        ) : (
          "SUBMIT"
        )}
      </button>
    </form>
  );
};

export default TransactionForm;
