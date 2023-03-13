import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../utils/user-logged-in-helper";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn(user, setUser, navigate, null, "/login");
  }, [])
  
  return (
    <>
      <h1>Dashboard (TODO D3.js here)</h1>
      <button onClick={() => {navigate("/view-spendings")}}>View spendings</button>
      { user !== null ? `Hi ${user.username}` : "Loading..." }
    </>
  );
};

export default Dashboard;