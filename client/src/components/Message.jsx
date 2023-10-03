import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, register } from "timeago.js";
import { localeFunc } from "./assets/timeSerbia";

const Message = ({
  message,
  loadingMessages,
  own,
  currentUser,
  setLoadingMessages,
  currentChat,
}) => {
  const [user, setUser] = useState(null);
  register("sr", localeFunc);
  console.log(currentChat._id);

  useEffect(() => {
    const getUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        };
        const res = await axios(
          "https://mern-chat-egjq.onrender.com/api/users/" + message?.sender,
          config
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (message) {
      getUser();
    }
  }, [message]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingMessages(false);
    }, 2300);
  }, [currentChat]);

  if (!message) {
    return <p className="text-center mb-5">Unesi prvu poruku</p>;
  }

  return (
    <>
      {loadingMessages ? (
        <></>
      ) : !own ? (
        <li class="d-flex justify-content-between mb-4">
          <div>
            <img
              src={
                user?.avatarUrl
                  ? `https://mern-chat-egjq.onrender.com/${user?.avatarUrl}`
                  : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              }
              alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
          </div>
          <div class="card flex-grow-1">
            <div class="card-header d-flex justify-content-between p-3">
              <p class="fw-bold mb-0">{user?.username}</p>
              <p class="text-muted small mb-0">
                <i class="far fa-clock"></i> {format(message?.createdAt, "sr")}
              </p>
            </div>
            <div class="card-body">
              <p class="mb-0">{message?.text}</p>
            </div>
          </div>
        </li>
      ) : (
        <li class="d-flex justify-content-between mb-4">
          <div class="card w-100">
            <div class="card-header d-flex justify-content-between p-3">
              <p class="fw-bold mb-0">{user?.username}</p>
              <p class="text-muted small mb-0">
                <i class="far fa-clock"></i> {format(message?.createdAt, "sr")}
              </p>
            </div>
            <div class="card-body">
              <p class="mb-0">{message?.text}</p>
            </div>
          </div>
          <img
            src={
              user?.avatarUrl
                ? `https://mern-chat-egjq.onrender.com/${user?.avatarUrl}`
                : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            }
            alt="avatar"
            class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
            width="60"
          />
        </li>
      )}
    </>
  );
};

export default Message;
