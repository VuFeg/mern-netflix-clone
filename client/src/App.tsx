import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./store/authUser";
import { useEffect } from "react";
import HomePage from "./pages/home/HomePage";
import LogInPage from "./pages/login/LogInPage";
import RegisterPage from "./pages/register/RegisterPage";

export default function App() {
  const { user, authCheck }: any = useAuthUser();

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LogInPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <RegisterPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}
