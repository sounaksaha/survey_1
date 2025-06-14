import toast, { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <>
    <Toaster
      position="top-center" // you can choose: top-right, top-center, bottom-left, etc.
      reverseOrder={false}
    />
    <AppRoutes />
  </>
);

export default App;
