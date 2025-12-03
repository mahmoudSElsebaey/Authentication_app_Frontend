import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "150px" ,lineHeight:"2" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;
