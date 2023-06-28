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
import NotFound from "./pages/NotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const [ user, setUser ] = useState<User | null>(null);
  
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path={Constants.HOME_PAGE} element={<Home/>}/>
          <Route path={Constants.LOGIN_PAGE} element={<Login/>}/>
          <Route path={Constants.DASHBOARD_PAGE} element={<Dashboard/>}/>
          <Route path={Constants.VIEW_SPENDINGS_PAGE} element={<ViewSpendings/>}/>
          <Route path={Constants.ADD_SPENDINGS_PAGE} element={<AddSpendings/>}/>
          <Route path={`${Constants.EDIT_SPENDINGS_PAGE}/:spendingUserAggrId`} element={<EditSpendings/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>      
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
};

export default App;
