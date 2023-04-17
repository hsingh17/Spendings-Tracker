import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import { Nullable, User } from "../utils/types";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user)
  return (
    <>
      <h1>Dashboard (TODO D3.js here)</h1>
      <button onClick={ () => { navigate(Constants.VIEW_SPENDINGS_PAGE) } }>View spendings</button>
      { user ? `Hi ${user.username}` : "Loading..." }
    </>
  );
};

export default Dashboard;