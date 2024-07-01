import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import InputField from "../components/InputField";

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
const TransactionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, data } = useQuery(GET_TRANSACTION, {
    variables: { id: id },
  });

  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UPDATE_TRANSACTION,
    {
      refetchQueries: [GET_TRANSACTION_STATISTICS],
    }
  );

  const [paymentFocused, setPaymentFocused] = useState(false);
  const [categoryFocused, setCategoryFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);

  const [formState, setFormState] = useState({
    description: data?.transaction?.description || "",
    paymentType: data?.transaction?.paymentType || "",
    category: data?.transaction?.category || "",
    amount: data?.transaction?.amount || "",
    location: data?.transaction?.location || "",
    date: data?.transaction?.date || "",
  });

  useEffect(() => {
    if (data) {
      setFormState({
        description: data?.transaction?.description,
        paymentType: data?.transaction?.paymentType,
        category: data?.transaction?.category,
        amount: data?.transaction?.amount,
        location: data?.transaction?.location,
        date: new Date(+data.transaction.date).toISOString().substr(0, 10),
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTransaction({
      variables: {
        input: {
          ...formState,
          transactionId: id,
        },
      },
    });
    navigate("/");
  };

  return (
    <div className="h-dvh max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-4">
        Update Transaction
      </h1>
      <div className="rounded-xl p-10 border-2">
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
              name="paymentType"
              placeholder="Select payment type"
              onFocus={() => setPaymentFocused(true)}
              onBlur={() => setPaymentFocused(false)}
              onChange={handleChange}
              value={formState.paymentType}
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
              name="category"
              placeholder="Select category"
              onFocus={() => setCategoryFocused(true)}
              onBlur={() => setCategoryFocused(false)}
              onChange={handleChange}
              value={formState.category}
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

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="w-full p-2 bg-slate-500 text-white rounded"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full p-2 bg-button-gradient text-white rounded"
            >
              {updateLoading ? (
                <div className="flex items-center justify-center h-full w-full">
                  <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin" />
                </div>
              ) : (
                "UPDATE"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionPage;
