import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Spendings from "./components/Spendings";
import { User } from "./utils/types"

const App = () => {
  const [user, setUser] = useState<User>({
    userId: null, 
    username: null, 
    password: null, 
    authorities: null, 
    accountNonExpired: null, 
    accountNonLocked: null, 
    credentialsNonExpired: null, 
    enabled: null 
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/spendings" element={ <Spendings />} />
      </Routes>      
    </UserContext.Provider>
  )
};

export default App;
