import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { formatDate } from "../utils/formatDate";
import { FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import useThrottledToast from "../hooks/useThrottledToast";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({ transaction }) => {
  const showToast = useThrottledToast();

  let { category, amount, location, date, paymentType, description } =
    transaction;

  const cardClass = categoryColorMap[category];

  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const formattedDate = formatDate(date);

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    onCompleted: (data) => {
      showToast(data.deleteTransaction.message, "success");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  const handleDelete = async () => {
    await deleteTransaction({
      variables: { transactionId: transaction._id },
    });
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{category}</h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin"></div>
            )}
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {location || "N/A"}
        </p>
        <p className="text-xs text-black font-bold">{formattedDate}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  transaction: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    location: PropTypes.string,
    date: PropTypes.string.isRequired,
    paymentType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.object.isRequired,
};

export default Card;
