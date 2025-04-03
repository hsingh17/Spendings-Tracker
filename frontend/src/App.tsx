import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppContainer from "./common/AppContainer";
import MainContentContainer from "./common/MainContentContainer";
import LocalStorageLoader from "./config/LocalStorageLoader";
import queryClient from "./config/QueryClientConfig";
import AppContext from "./context/AppContext";
import Navbar from "./pages/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <AppContainer>
          <Navbar />
          <LocalStorageLoader />
          <MainContentContainer>
            <AppRoutes />
            <Toaster />
          </MainContentContainer>
        </AppContainer>
      </AppContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
