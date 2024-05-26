import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import Earnings from "./components/Earnings/Earnings";
import Summaries from "./components/Summaries/Summaries";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Error from "./components/Error-page/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "expenses", element: <Expenses /> },
          { path: "earnings", element: <Earnings /> },
          { path: "summaries", element: <Summaries /> },
        ],
      },
      {
        element: <ProtectedAuthRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
