import { QueryClient } from "react-query";

const queryService = (function () {
  const queryClient = new QueryClient();

  return {
    queryClient,
  };
})();

export default queryService;
