import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AppContainer from "./common/AppContainer";
import MainContentContainer from "./common/MainContentContainer";
import LocalStorageLoader from "./config/LocalStorageLoader";
import queryClient from "./config/QueryClientConfig";
import UserContext from "./context/UserContext";
import Navbar from "./pages/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { User } from "./utils/types";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppContainer>
          <Navbar />
          <LocalStorageLoader />
          <MainContentContainer>
            <AppRoutes />
            <Toaster />
          </MainContentContainer>
        </AppContainer>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
