import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootElement from "./components/root-element/RootElement";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Incomes from "./components/incomes/Incomes";
import Expenses from "./components/expenses/Expenses";
import Summaries from "./components/summaries/Summaries";
import Login from "./components/login/Login";
import "./App.css";
import Signup from "./components/signup/Signup";
import ErrorBoundary from "./components/error/ErrorBoundary";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import { useEffect } from "react";
import TransactionElement from "./util/transactionElement/TransactionElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    errorElement: <ErrorBoundary />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "incomes",
        element: <Incomes />,
      },
      { path: "incomes/:id", element: <TransactionElement /> },
      { path: "expenses", element: <Expenses /> },
      { path: "expenses/:id", element: <TransactionElement /> },
      { path: "summaries", element: <Summaries /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleTokenExpiration = () => {
      const token = localStorage.getItem("token");
      const currentDate = new Date();
      if (token) {
        const userId = jwtDecode(token).userId;
        const exp = jwtDecode(token).exp;
        const tokenDate = new Date(exp * 1000);
        if (currentDate > tokenDate) {
          localStorage.removeItem("token");
          dispatch(authActions.logout());
          window.location.href = "/login";
        } else {
          dispatch(authActions.login(userId));
        }
      }
    };

    handleTokenExpiration();

    const interval = setInterval(handleTokenExpiration, 1000);

    return () => clearInterval(interval);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
