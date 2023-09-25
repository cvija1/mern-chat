import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../context/users/UserContext";
import { getFriendsRequest } from "../context/users/UserActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserCard from "../components/UserCard";
import AuthContext from "../context/auth/AuthContext";

const FriendsRequest = () => {
  const { user } = useContext(AuthContext);
  const { dispatch, friendsRequest, isLoading, isError, message } =
    useContext(UserContext);
  const [params, setParams] = useState({
    pageSize: 10,
    page: 1,
    friendsRequest: user?.receivedRequests,
  });

  useEffect(() => {
    const getAllFriendsRequests = async () => {
      dispatch({ type: "GET_FRIENDS_REQUEST_PENDING" });
      try {
        const friendsRequest = await getFriendsRequest(params);
        dispatch({
          type: "GET_FRIENDS_REQUEST_FULFILLED",
          payload: friendsRequest,
        });
      } catch (error) {
        dispatch({
          type: "GET_FRIENDS_REQUEST_REJECTED",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    getAllFriendsRequests();
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
      <div className="d-flex mt-3 ">
        <Link className="text-decoration-none text-white">
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
        {friendsRequest?.length > 0 ? (
          friendsRequest.map((friendRequest) => {
            return (
              <UserCard key={friendRequest._id} userInfo={friendRequest} />
            );
          })
        ) : (
          <div>Nema likova</div>
        )}
      </div>
    </div>
  );
};

export default FriendsRequest;
