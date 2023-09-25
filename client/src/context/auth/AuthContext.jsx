import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userProfile: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
