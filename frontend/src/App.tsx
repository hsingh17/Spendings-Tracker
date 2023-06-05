import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ViewSpendings from "./pages/ViewSpendings";
import { User } from "./utils/types"
import AddSpendings from "./pages/AddSpendings";
import EditSpendings from "./pages/EditSpendings";
import { Constants } from "./utils/constants";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const App = () => {
  const [ user, setUser ] = useState<User | null>(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path={Constants.HOME_PAGE} element={<Home/>}/>

        <Route path={Constants.LOGIN_PAGE} element={<Login/>}/>

        <Route path={Constants.DASHBOARD_PAGE} element={ 
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } 
        />

        <Route path={Constants.VIEW_SPENDINGS_PAGE} element={ 
            <ProtectedRoute>
              <ViewSpendings/>
            </ProtectedRoute>
          } 
        />

        <Route path={Constants.ADD_SPENDINGS_PAGE} element={ 
            <ProtectedRoute>
              <AddSpendings/>
            </ProtectedRoute>
          } 
        />

        <Route path={`${Constants.EDIT_SPENDINGS_PAGE}/:spendingDate`} element={ 
            <ProtectedRoute>
              <EditSpendings/>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound/>}/>
      </Routes>      
    </UserContext.Provider>
  )
};

export default App;
