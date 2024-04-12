import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./common/AppContainer";
import MainContentContainer from "./common/MainContentContainer";
import QueryClientConfig from "./config/QueryClientConfig";
import UserContext from "./context/UserContext";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Metrics from "./pages/metrics-page/Metrics";
import Navbar from "./pages/navbar/Navbar";
import SaveSpendings from "./pages/save/SaveSpendings";
import ViewSpendings from "./pages/view/ViewSpendings";
import {
  DASHBOARD_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  METRICS_PAGE,
  SAVE_SPENDINGS_PAGE,
  VIEW_SPENDINGS_PAGE,
} from "./utils/constants";
import { User } from "./utils/types";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <QueryClientProvider client={QueryClientConfig}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppContainer>
          <Navbar />
          <MainContentContainer>
            <Routes>
              <Route path={HOME_PAGE} element={<Home />} />
              <Route path={LOGIN_PAGE} element={<Login />} />
              <Route path={DASHBOARD_PAGE} element={<Dashboard />} />
              <Route path={VIEW_SPENDINGS_PAGE} element={<ViewSpendings />} />
              <Route
                path={`${SAVE_SPENDINGS_PAGE}/:date`}
                element={<SaveSpendings />}
              />
              <Route path={`${METRICS_PAGE}`} element={<Metrics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </MainContentContainer>
        </AppContainer>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
