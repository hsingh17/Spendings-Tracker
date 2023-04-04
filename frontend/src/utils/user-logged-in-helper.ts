import { NavigateFunction } from "react-router-dom";
import { Constants } from "./constants";
import makeFetchRequestWrapper from "./fetch-wrapper";
import { User } from "./types";

const isLoggedIn  = async (user: User | null, setUser: (user: User) => void, navigate: NavigateFunction, navigateIfLoggedIn: string | null, navigateIfNotLoggedIn: string | null) => {
    if (user !== null && user !== undefined) {
        return;
    }

    const apiUrl: string = Constants.BASE_URL + Constants.ME_ROUTE;
    const response = await makeFetchRequestWrapper<User>(apiUrl, "GET", "");

    // Failure: redirect
    if (!response.ok && navigateIfNotLoggedIn !== null) { 
        navigate(navigateIfNotLoggedIn);
    }

    if (response.ok) { // User is already logged in so set in the UserContext
        setUser(response.obj as User);
        if (navigateIfLoggedIn !== null) {
            navigate(navigateIfLoggedIn)
        }
    }    
}

export default isLoggedIn;