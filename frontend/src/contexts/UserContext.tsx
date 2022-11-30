import { createContext } from "react";
import { User } from "../utils/types"

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: { userId: null, username: null },
  setUser: () => {}
});

export default UserContext;