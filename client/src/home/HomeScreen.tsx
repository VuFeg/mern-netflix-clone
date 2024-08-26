import { useAuthUser } from "../store/authUser";

const HomeScreen = () => {
  const { logout }: any = useAuthUser();

  return (
    <div>
      HomeScreen
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomeScreen;
