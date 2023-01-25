import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ViewSpendings from "./pages/ViewSpendings";
import AddSpendings from "./pages/AddSpendings";
import EditSpending from "./pages/EditSpending";
import { User } from "./utils/types"

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/view-spendings" element={ <ViewSpendings />} />
        <Route path="/add-spendings" element={ <AddSpendings />} />
        <Route path="/edit-spending/" element={ <EditSpending />} />
      </Routes>      
    </UserContext.Provider>
  )
};

export default App;
