import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { User } from "./utils/types"

const App = () => {
  const [user, setUser] = useState<User>({
    userId: null,
    username: null
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/dashboard" element={ <Dashboard />} />
      </Routes>      
    </UserContext.Provider>
  )
};

export default App;
