import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
      </Routes>
    </>
  );
};

export default App;
