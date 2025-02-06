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
import TransactionElement from "./util/transactionElement/TransactionElement";
import AllTransactions from "./util/AllTransactions";
import Settings from "./components/profileSettings/Settings";

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
      { path: "incomes/all-transactions", element: <AllTransactions /> },
      { path: "incomes/all-transactions/:id", element: <TransactionElement /> },
      { path: "expenses", element: <Expenses /> },
      { path: "expenses/:id", element: <TransactionElement /> },
      { path: "expenses/all-transactions", element: <AllTransactions /> },
      {
        path: "expenses/all-transactions/:id",
        element: <TransactionElement />,
      },
      { path: "summaries", element: <Summaries /> },
      { path: "settings", element: <Settings /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
