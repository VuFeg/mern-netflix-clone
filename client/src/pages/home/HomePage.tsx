import { useAuthUser } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const { user }: any = useAuthUser();
  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default HomePage;
