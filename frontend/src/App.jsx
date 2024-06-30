import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AuthenticationPage from "./pages/AuthenticationPage";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

const App = () => {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);
  // console.log("app", data);
  if (loading) return null;

  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={!data?.authUser ? <AuthenticationPage /> : <HomePage />}
        />
        <Route
          path="/transaction/:id"
          element={data.authUser ? <TransactionPage /> : <AuthenticationPage />}
        />
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <AuthenticationPage />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
