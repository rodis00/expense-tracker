import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootElement from "./components/root-element/RootElement";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Incomes from "./pages/incomes/Incomes";
import Expenses from "./pages/expenses/Expenses";
import Summaries from "./pages/summaries/Summaries";
import Login from "./pages/login/Login";
import "./App.css";
import Signup from "./pages/signup/Signup";
import ErrorBoundary from "./components/error/ErrorBoundary";
import TransactionElement from "./pages/transactionElement/TransactionElement";
import AllTransactions from "./pages/allTransactions/AllTransactions";
import Settings from "./pages/settings/Settings";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    errorElement: <ErrorBoundary />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          {
            path: "incomes",
            element: <Incomes />,
          },
          { path: "incomes/:id", element: <TransactionElement /> },
          { path: "incomes/all-transactions", element: <AllTransactions /> },
          {
            path: "incomes/all-transactions/:id",
            element: <TransactionElement />,
          },
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
