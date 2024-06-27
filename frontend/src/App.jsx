import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AuthenticationPage from "./pages/AuthenticationPage";
import HomePage from "./pages/HomePage";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

const App = () => {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={!data?.authUser ? <AuthenticationPage /> : <HomePage />}
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
