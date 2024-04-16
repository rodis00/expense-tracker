import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import Earnings from "./components/Earnings/Earnings";
import Summaries from "./components/Summaries/Summaries";
import Login from "./components/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      { path: "expenses", element: <Expenses /> },
      { path: "earnings", element: <Earnings /> },
      { path: "summaries", element: <Summaries /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
