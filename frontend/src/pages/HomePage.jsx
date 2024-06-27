import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";

const HomePage = () => {
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleLogout = async () => {
    await logout();
    client.resetStore();
  };

  return (
    <div>
      <p>Home Page</p>
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
};

export default HomePage;
