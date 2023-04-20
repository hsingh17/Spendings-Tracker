import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      <h1>Dashboard (TODO D3.js here)</h1>
      <button onClick={ () => { navigate(Constants.VIEW_SPENDINGS_PAGE) } }>View spendings</button>
      { user ? `Hi ${user.username}` : "Loading..." }
    </>
  );
};

export default Dashboard;