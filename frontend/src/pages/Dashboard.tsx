import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../utils/user-logged-in-helper";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
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

  useEffect(() => {
    isLoggedIn(user, setUser, navigate, null, "/login");
  }, [])
  
  return (
    <>
      <h1>Dashboard</h1>
      { user !== null ? `Hi ${user.username}` : "Loading..." }
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClick(e) }} id="viewSpendings">See all spendings</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClick(e) }} id="addSpendings">Add spendings</button>
    </>
  );
};

export default Dashboard;