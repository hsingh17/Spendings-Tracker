import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ViewSpendings from "./pages/ViewSpendings";
import { User } from "./utils/types";
import SaveSpendings from "./pages/SaveSpendings";
import { Constants } from "./utils/constants";
import NotFound from "./pages/NotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import MainContentContainer from "./components/MainContentContainer";
import Navbar from "./components/Navbar";
import AppContainer from "./components/AppContainer";
import QueryClientConfig from "./config/QueryClientConfig";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <QueryClientProvider client={QueryClientConfig}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppContainer>
          <Navbar />
          <MainContentContainer>
            <Routes>
              <Route path={Constants.HOME_PAGE} element={<Home />} />
              <Route path={Constants.LOGIN_PAGE} element={<Login />} />
              <Route path={Constants.DASHBOARD_PAGE} element={<Dashboard />} />
              <Route
                path={Constants.VIEW_SPENDINGS_PAGE}
                element={<ViewSpendings />}
              />
              <Route
                path={`${Constants.SAVE_SPENDINGS_PAGE}/:date`}
                element={<SaveSpendings />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainContentContainer>
        </AppContainer>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
