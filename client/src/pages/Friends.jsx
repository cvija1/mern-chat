import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../context/users/UserContext";
import { getFriends } from "../context/users/UserActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserCard from "../components/UserCard";
import AuthContext from "../context/auth/AuthContext";

const Friends = () => {
  const { user } = useContext(AuthContext);
  const { dispatch, users, friends, isLoading, isError, message } =
    useContext(UserContext);
  const [params, setParams] = useState({
    pageSize: 10,
    page: 1,
    friends: user?.friends,
  });

  useEffect(() => {
    const getAllFriends = async () => {
      dispatch({ type: "GET_FRIENDS_PENDING" });
      try {
        const friends = await getFriends(params);
        dispatch({
          type: "GET_FRIENDS_FULFILLED",
          payload: friends,
        });
      } catch (error) {
        dispatch({
          type: "GET_FRIENDS_REJECTED",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    getAllFriends();
  }, []);

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
      <div className="d-flex mt-3 justify-content-between">
        <div>Prijatelji</div>
        <Link
          to={`/${user._id}/friends/request`}
          className="text-decoration-none text-white"
        >
          Zahtjevi za prijateljstvo{" "}
          {user?.receivedRequests?.length > 0 ? (
            <span class="ms-1 badge bg-danger">
              {user?.receivedRequests?.length}
            </span>
          ) : (
            <></>
          )}
        </Link>
      </div>
      <div className="row d-flex justify-content-between">
        {friends?.length > 0 ? (
          friends.map((friend) => {
            return <UserCard key={friend._id} userInfo={friend} />;
          })
        ) : (
          <div>Nema likova</div>
        )}
      </div>
    </div>
  );
};

export default Friends;
