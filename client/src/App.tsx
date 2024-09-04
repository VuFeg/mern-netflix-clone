import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./store/authUser";
import Footer from "./components/Footer";
import HomePage from "./pages/home/HomePage";
import LogInPage from "./pages/login/LogInPage";
import RegisterPage from "./pages/register/RegisterPage";
import { WatchPage } from "./pages/watch/WatchPage";

export default function App() {
  const { user, authCheck }: any = useAuthUser();

  useEffect(() => {
    authCheck();
  }, [authCheck]);
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
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}
