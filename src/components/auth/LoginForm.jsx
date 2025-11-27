import { useState } from "react";
import styles from "../../styles/Form.module.css";
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import   Cookies  from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [inputsValues, setInputsValues] = useState({ email: "", password: "" });

  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        email: inputsValues.email,
        password: inputsValues.password,
      });

      const accessToken = data.accessToken;
      if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: 7 }); //7 days expiration
        setInputsValues({ email: "", password: "" });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={inputsValues.email}
            onChange={(e) => {
              setInputsValues((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={inputsValues.password}
            onChange={(e) => {
              setInputsValues((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
        </fieldset>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p>I don't have an account. <Link to="/auth/register">Register here</Link></p>
      </form>
      {isError && <p className={`${styles.error} ${styles["message-style"]}`}>{error?.data?.message}</p>}
      {isSuccess && <p className={`${styles.success} ${styles["message-style"]}`}>Login Successful!</p>}
      {isLoading && <p className={`${styles.info} ${styles["message-style"]}`}>Loading...</p>}
    </>
  );
}
