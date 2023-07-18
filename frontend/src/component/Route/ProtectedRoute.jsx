import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          element={
            isAuthenticated === true ? (
              isAdmin === true && user.role !== "admin" ? (
                <Navigate to="/login" replace />
              ) : (
                <Component />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;