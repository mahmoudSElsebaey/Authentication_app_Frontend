import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Nav.module.css";
import { useLogoutMutation } from "../redux/features/auth/authApiSlice";
import Cookies from "js-cookie";

export default function Navbar() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  const handleLogout = () => {
    logout();
    Cookies.remove("accessToken");
    navigate("/auth/login");
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <div className={styles.line}></div>

        {!accessToken && (
          <>
            <Link to="/auth/login">login</Link>
            <Link to="/auth/register">register</Link>
          </>
        )}
        {accessToken && (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </>
  );
}
