import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import TransactionForm from "../parts/TransactionForm";
import Cards from "../parts/Cards";

const HomePage = () => {
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleLogout = async () => {
    await logout();
    client.resetStore();
  };

  return (
    <>
      <div>
        <p>Home Page</p>
        <p onClick={handleLogout}>Logout</p>
      </div>

      <div className="flex items-center justify-around">
        <div>chart</div>
        <TransactionForm />
      </div>

      <div>
        <Cards />
      </div>
    </>
  );
};

export default HomePage;
