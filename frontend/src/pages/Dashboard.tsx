import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Constants } from "../utils/constants";
import { Nullable, User } from "../utils/types";

const Dashboard = () => {
  const user: Nullable<User> = useUser();
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