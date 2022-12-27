import { createContext } from "react";
import { User } from "../utils/types"

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: { 
    userId: null, 
    username: null, 
    password: null, 
    authorities: null, 
    accountNonExpired: null, 
    accountNonLocked: null, 
    credentialsNonExpired: null, 
    enabled: null 
  },
  setUser: () => {}
});

export default UserContext;