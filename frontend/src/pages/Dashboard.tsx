import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.id) {
      case "viewSpendings":
        navigate("/view-spendings");
        break;
      case "addSpendings":
        navigate("/add-spendings");
        break;        
    }
  }


  // TODO: Reroute to login if user not logged in (user == null)
  return (
    <>
      <h1>Dashboard</h1>
      { user.userId !== null ? "Hi " + user.username : "No user logged in currently..." }
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClick(e) }} id="viewSpendings">See all spendings</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClick(e) }} id="addSpendings">Add spendings</button>
    </>
  );
};

export default Dashboard;