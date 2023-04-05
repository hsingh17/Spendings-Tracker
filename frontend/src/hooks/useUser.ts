import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";
import { Nullable, User } from "../utils/types";
import useApi from "./useApi";

// #######################################################################################
// #######################################################################################
//                                      HOOK
// #######################################################################################
// #######################################################################################

function useUser(navigateTo: Nullable<string> = null) : Nullable<User> {
  // TODO: Early abort is user is already defined

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { loading, response } = useApi<User>(Constants.BASE_API_URL  + Constants.ME_API_ROUTE, "GET");

  // Done loading API response
  if (!loading) {
    // Error occurred while trying to see if user was logged in, then redirect to /login page
    if (!response || response.obj === null || response.error) { 
      navigate(Constants.LOGIN_PAGE);
      return null;
    }
    
    setUser(response.obj); // Set the user object
    if (navigateTo) { // Navigate to the passed in page if successfully logged in
      navigate(navigateTo);
    }

    return response.obj;
  }

  return null;
};

export default useUser;