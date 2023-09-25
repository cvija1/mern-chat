import React, { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
    users: [],
    friends: [],
    friendsRequest: [],
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        dispatch,
        ...state,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
