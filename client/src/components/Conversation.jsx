import React, { useState, useEffect } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser, friendId, setLoading }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const getUser = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          };
          const res = await axios(
            "https://mern-chat-egjq.onrender.com/api/users/" + friendId,
            config
          );

          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
  }, [currentUser, conversation]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2300);
  }, []);

  return (
    <li class="p-2 border-bottom">
      <a href="#!" class="d-flex justify-content-between text-decoration-none">
        <div class="d-flex flex-row">
          <img
            src={
              user?.avatarUrl
                ? `https://mern-chat-egjq.onrender.com/${user?.avatarUrl}`
                : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            }
            alt="avatar"
            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
            width="60"
          />
          <div class="pt-1">
            <p class="fw-bold mb-0">{user?.username}</p>
            <p class="small text-muted">Lorem ipsum dolor sit.</p>
          </div>
        </div>
        <div class="pt-1">
          <p class="small text-muted mb-1">5 mins ago</p>
        </div>
      </a>
    </li>
  );
};

export default Conversation;
