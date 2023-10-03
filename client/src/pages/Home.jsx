import React, { useContext, useEffect, useRef, useState } from "react";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
const Home = () => {
  const [conversations, setConversations] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
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

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user?._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(
          user?.followings?.filter((f) => users.some((u) => u.userId === f))
        );
        console.log(users);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      const getConversations = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          };
          const res = await axios.get(
            "https://mern-chat-egjq.onrender.com/api/conversation/" + user?._id,
            config
          );
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const res = await axios.get(
          "https://mern-chat-egjq.onrender.com/api/message/" + currentChat?._id,
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
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.post(
        "https://mern-chat-egjq.onrender.com/api/message",
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
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.post(
        "https://mern-chat-egjq.onrender.com/api/conversation",
        {
          senderId: user?._id,
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
    if (currentChat) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 2400);
    }
  }, [currentChat]);

  useEffect(() => {
    if (messages) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <>
      {loading && <Spinner />}
      <section
        className={`${loading ? "invisible" : "visible"} bg-dark flex-grow-1`}
      >
        <div class=" container py-2">
          <div class="row ">
            <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 d-flex flex-column ">
              <h5 class="font-weight-bold mt-2 mb-3 text-center text-lg-start">
                Prijatelji
              </h5>

              <div class="card  overflow-auto" style={{ maxHeight: "565px" }}>
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
                              if (currentChat != c) {
                                c = await createConversation(e, friendId);
                                setCurrentChat(c);
                                setLoadingMessages(true);
                              }
                            }}
                          >
                            <Conversation
                              conversation={c ? c : {}}
                              currentUser={user}
                              friendId={friendId}
                              setLoading={setLoading}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            onClick={() => {
                              if (con != currentChat) {
                                setCurrentChat(con);
                                setLoadingMessages(true);
                              }
                            }}
                          >
                            <Conversation
                              conversation={con}
                              currentUser={user}
                              friendId={friendId}
                              setLoading={setLoading}
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
              {currentChat && messages?.length > 0 ? (
                <>
                  {loadingMessages && <Spinner />}
                  <ul
                    className={`${
                      loadingMessages ? "invisible" : "visible"
                    } list-unstyled overflow-auto`}
                    style={{ maxHeight: "480px" }}
                  >
                    {messages.map((m) => {
                      return (
                        <div ref={scrollRef}>
                          <Message
                            loadingMessages={loadingMessages}
                            currentUser={user}
                            message={m}
                            own={m.sender === user?._id}
                            setLoadingMessages={setLoadingMessages}
                            currentChat={currentChat}
                          />
                        </div>
                      );
                    })}
                  </ul>

                  {!loadingMessages && (
                    <div className="bg-white input-group mt-auto rounded-3">
                      <input
                        type="text"
                        id="myInput"
                        class="form-control py-3 shadow-none "
                        placeholder="Unesite poruku.."
                        aria-label="Unesite poruku"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        aria-describedby="button-addon2"
                      />
                      <button
                        onClick={handleSubmit}
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                      >
                        Pošalji
                      </button>
                    </div>
                  )}
                </>
              ) : currentChat && messages?.length === 0 ? (
                <>
                  {loadingMessages && <Spinner />}
                  <div
                    className={`${loadingMessages ? "invisible" : "visible"} `}
                  >
                    <Message
                      loadingMessages={loadingMessages}
                      setLoadingMessages={setLoadingMessages}
                      currentChat={currentChat}
                    />
                  </div>
                  {!loadingMessages && (
                    <div className="bg-white input-group mt-auto rounded-3">
                      <input
                        type="text"
                        id="myInput"
                        class="form-control py-3 shadow-none "
                        placeholder="Unesite poruku.."
                        aria-label="Unesite poruku"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        aria-describedby="button-addon2"
                      />
                      <button
                        onClick={handleSubmit}
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                      >
                        Pošalji
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
