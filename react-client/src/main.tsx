import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { AuthLayout } from "./pages/AuthLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { TransactionList } from "./pages/TransactionList";
import { Transaction } from "./pages/Transaction";
import { NewTransaction } from "./pages/NewTransaction";
import { UpdateTransaction } from "./pages/UpdateTransaction";
import { PageNotFound } from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "/transactions/:id",
            element: <Transaction />,
          },
          {
            path: "/transactions",
            element: <TransactionList />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/new-transaction",
            element: <NewTransaction />,
          },
          {
            path: "/update-transaction/:id",
            element: <UpdateTransaction />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
