import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Dashboard</h1>
      { user.userId !== null ? user : "No user logged in currently..." }
    </>
  )
};

export default Dashboard;