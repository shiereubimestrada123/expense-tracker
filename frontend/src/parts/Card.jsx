import PropTypes from "prop-types";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { formatDate } from "../utils/formatDate";
import { FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({ transaction }) => {
  let { category, amount, location, date, paymentType, description } =
    transaction;

  const cardClass = categoryColorMap[category];

  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const formattedDate = formatDate(date);

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{category}</h2>
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
