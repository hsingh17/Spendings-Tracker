import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

const App = () => {
  const [user, setUser] = useState<string>("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <h1>Hello World!</h1>
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/dashboard" />
      </Routes>      
    </UserContext.Provider>
  )
}

export default App;
