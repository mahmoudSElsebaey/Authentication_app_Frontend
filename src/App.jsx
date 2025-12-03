import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
// import Cookies from "js-cookie";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Home } from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

function App() {
  // const accessToken = Cookies.get("accessToken") || null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
