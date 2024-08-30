import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./store/authUser";
import { useEffect } from "react";

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
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}
