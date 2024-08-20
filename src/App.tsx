import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
