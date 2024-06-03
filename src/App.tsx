import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { apiOperations } from "./services/priceData";
import { ApiOperationsProvider } from "./context/ApiOperationsContext";
const App = () => {
  return (
    <ApiOperationsProvider operations={apiOperations}>
      <RouterProvider router={router} />
    </ApiOperationsProvider>
  );
};

export default App;
