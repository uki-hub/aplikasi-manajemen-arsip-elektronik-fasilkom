import { QueryClientProvider } from "react-query";
import Router from "./view/_app/Router";
import queryService from "./lib/queryService";
import Loading from "./view/_app/Loading";
import MessageModel from "./view/_app/MessageModal";

const App = () => {
  return (
    <QueryClientProvider client={queryService.queryClient}>
      <Loading />
      <MessageModel />
      <Router />
    </QueryClientProvider>
  );
};

export default App;
