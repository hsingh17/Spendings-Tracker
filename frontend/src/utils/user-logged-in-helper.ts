import { NavigateFunction } from "react-router-dom";
import { Constants } from "./constants";
import makeFetchRequestWrapper from "./fetch-wrapper";
import { User } from "./types";

const isLoggedIn  = async (user: User | null, setUser: (user: User) => void, navigate: NavigateFunction, navigateIfLoggedIn: string | null, navigateIfNotLoggedIn: string | null) => {
    if (user !== null && user !== undefined) {
        return;
    }

    const apiUrl: string = Constants.BASE_URL + "/api/me";
    const response = await makeFetchRequestWrapper<User>(apiUrl, "GET", "");

    if (response.ok && navigateIfLoggedIn !== null) { // User is already logged in so set in the UserContext
        setUser(response.obj as User);
        navigate(navigateIfLoggedIn);
        return;
    }

    // Otherwise redirect to fallback page if not logged in
    if (!response.ok && navigateIfNotLoggedIn !== null) { 
        navigate(navigateIfNotLoggedIn);
    }
}

export default isLoggedIn;