import React from "react";
import { Link } from "react-router-dom";
import logoNetflix from "../../assets/images/netflix-logo.png";
import { useAuthUser } from "../../store/authUser";

const RegisterPage = () => {
  const { searchParams } = new URL(window.location.href);
  const emailValue = searchParams.get("email") || "";

  const [email, setEmail] = React.useState(emailValue);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const { signup }: any = useAuthUser();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    signup({ email, userName, password, passwordConfirmation });
  };
  return (
    <div className="bg-hero h-screen w-full">
      <header className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to={"/"}>
          <img src={logoNetflix} alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-white text-2xl text-center font-bold mb-4">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none
              focus:ring"
                placeholder="you@example.com"
                id="email"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none
              focus:ring"
                placeholder="vufeng"
                id="username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none
              focus:ring"
                placeholder="********"
                id="password"
              />
            </div>

            <div>
              <label
                htmlFor="passwordConfirmation"
                className="text-sm font-medium text-gray-300 block"
              >
                Password Confirmation
              </label>
              <input
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none
              focus:ring"
                placeholder="********"
                id="passwordConfirmation"
              />
            </div>

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Sign Up
            </button>
          </form>

          <div className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
