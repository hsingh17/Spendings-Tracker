import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/spendings");
  }

  return (
    <>
      <h1>Dashboard</h1>
      { user.userId !== null ? "Hi " + user.username : "No user logged in currently..." }
      <button onClick={handleClick}>See all spendings</button>
    </>
  );
};

export default Dashboard;