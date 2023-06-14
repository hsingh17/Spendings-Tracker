import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import useUser from "../hooks/useUser";

const Dashboard = () => {
  const {data: response} = useUser();
  const navigate = useNavigate();
  const user = response?.data;

  return (
    <>
      <h1>Dashboard (TODO D3.js here)</h1>
      <button onClick={() => navigate(Constants.VIEW_SPENDINGS_PAGE)}>View spendings</button>
      { user ? `Hi ${user.username}` : "Loading..." }
    </>
  );
};

export default Dashboard;