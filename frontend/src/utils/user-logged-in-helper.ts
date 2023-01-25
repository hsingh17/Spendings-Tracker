import { NavigateFunction } from "react-router-dom";
import { Constants } from "./constants";
import { User } from "./types";

const isLoggedIn  = async (user: User | null, setUser: (user: User) => void, navigate: NavigateFunction, navigateIfLoggedIn: string | null, navigateIfNotLoggedIn: string | null) => {
    if (user !== null && user !== undefined) {
        return;
    }
    
    const apiUrl: string = Constants.BASE_URL + "/api/me";

    const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include"
    });

    if (response.ok) { // User is already logged in so set in the UserContext
        setUser(await response.json() as User);
        if (navigateIfLoggedIn !== null) { // Redirect if successful and not null
            navigate(navigateIfLoggedIn);
        }
        return;
    }

    // Otherwise redirect to whatever page if not null
    if (navigateIfNotLoggedIn !== null) { 
        navigate(navigateIfNotLoggedIn);
    }
}

export default isLoggedIn;