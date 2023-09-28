import React, { useContext, useEffect, useRef, useState } from "react";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Conversation from "../components/Conversation";
const Home = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(`/login`);
    }
    setFriends(user?.friends);
  }, [user]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(
          "http://localhost:5000/api/conversation/" + user._id,
          config
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(
          "http://localhost:5000/api/message/" + currentChat?._id,
          config
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api//messages",
        message,
        config
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const createConversation = async (e, friendId) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/conversation",
        {
          senderId: user._id,
          receiverId: friendId,
        },
        config
      );
      setConversations([...conversations, res.data]);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <section className="bg-dark flex-grow-1">
        <div class=" container py-2">
          <div class="row ">
            <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 d-flex flex-column ">
              <h5 class="font-weight-bold mt-2 mb-3 text-center text-lg-start">
                Prijatelji
              </h5>

              <div
                class="card flex-grow-1 overflow-auto"
                style={{ maxHeight: "565px" }}
              >
                <div class="card-body bg-primary  ">
                  <ul class="list-unstyled mb-0 ">
                    {friends.map((friendId) => {
                      const con = conversations?.find((con) =>
                        con?.members.includes(friendId)
                      );
                      if (!con) {
                        let c;
                        return (
                          <div
                            onClick={async (e) => {
                              c = await createConversation(e, friendId);
                              setCurrentChat(c);
                            }}
                          >
                            <Conversation
                              conversation={c ? c : {}}
                              currentUser={user}
                              friendId={friendId}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div onClick={() => setCurrentChat(con)}>
                            <Conversation
                              conversation={con}
                              currentUser={user}
                              friendId={friendId}
                            />
                          </div>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-7 col-xl-8 mt-5 ">
              <ul
                class="list-unstyled overflow-auto"
                style={{ maxHeight: "480px" }}
              >
                <li class="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <div class="card">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Brad Pitt</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 12 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
                <li class="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <div class="card">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Brad Pitt</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 12 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
                <li class="d-flex justify-content-between mb-4">
                  <div class="card w-100">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Lara Croft</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 13 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width="60"
                  />
                </li>
                <li class="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <div class="card">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Brad Pitt</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 10 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="bg-white input-group mt-auto rounded-3">
                <input
                  type="text"
                  id="myInput"
                  class="form-control py-3 shadow-none "
                  placeholder="Unesite poruku.."
                  aria-label="Unesite poruku"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Pošalji
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
