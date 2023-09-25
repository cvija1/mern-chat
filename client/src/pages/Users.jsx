import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { getUsers } from "../context/users/UserActions";
import UserContext from "../context/users/UserContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";

const Users = () => {
  const { state } = useLocation();
  const search = state?.search ? state.search : "";
  const [params, setParams] = useState({
    pageSize: 10,
    page: 1,
    search,
  });
  const { dispatch, users, isLoading, isError, message } =
    useContext(UserContext);

  useEffect(() => {
    setParams((prev) => ({ ...prev, search }));
  }, [search]);

  useEffect(() => {
    const getAllUsers = async () => {
      dispatch({ type: "GET_USERS_PENDING" });
      try {
        const users = await getUsers(params);
        dispatch({
          type: "GET_USERS_FULFILLED",
          payload: users,
        });
      } catch (error) {
        dispatch({
          type: "GET_USERS_REJECTED",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    getAllUsers();
  }, [params]);

  useEffect(() => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }, [isError]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container ">
      <div className="row d-flex justify-content-between">
        {users?.length > 0 ? (
          users.map((user) => {
            return <UserCard key={user._id} userInfo={user} />;
          })
        ) : (
          <div>Nema likova</div>
        )}
      </div>
    </div>
  );
};

export default Users;
