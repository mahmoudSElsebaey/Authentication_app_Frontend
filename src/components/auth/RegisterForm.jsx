import { useState } from "react";
import styles from "../../styles/Form.module.css";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";
import Cookies from "js-cookie";
import { Link , useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [inputsValues, setInputsValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    age: "",
  });

  const [register, { isError, isLoading, isSuccess, error }] =
    useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({
        fname: inputsValues.fname,
        lname: inputsValues.lname,
        email: inputsValues.email,
        password: inputsValues.password,
        age: inputsValues.age,
      });
      const accessToken = data.accessToken;
      if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: 7 });
        setInputsValues({
          fname: "",
          lname: "",
          email: "",
          password: "",
          age: "",
        });

        navigate("/dashboard");
        // Navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isError && error && (
        <p className={`${styles.error} ${styles["message-style"]}`}>
          {error.data.message}
        </p>
      )}
      {isSuccess && (
        <p className={`${styles.success} ${styles["message-style"]}`}>
          Registered Successfully
        </p>
      )}
      {isLoading && (
        <p className={`${styles.info} ${styles["message-style"]}`}>
          Loading...
        </p>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            required
            value={inputsValues.fname}
            onChange={(e) => {
              setInputsValues({ ...inputsValues, fname: e.target.value });
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            required
            value={inputsValues.lname}
            onChange={(e) => {
              setInputsValues({ ...inputsValues, lname: e.target.value });
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={inputsValues.email}
            onChange={(e) => {
              setInputsValues({ ...inputsValues, email: e.target.value });
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
              setInputsValues({ ...inputsValues, password: e.target.value });
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={inputsValues.age}
            onChange={(e) => {
              setInputsValues({ ...inputsValues, age: e.target.value });
            }}
          />
        </fieldset>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Account"}
        </button>
        <p>
          I already have an account. <Link to="/auth/login">Login here</Link>
        </p>
      </form>
    </>
  );
}
