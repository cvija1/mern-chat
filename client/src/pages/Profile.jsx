import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../context/auth/AuthContext";

import { Link, useNavigate, useParams } from "react-router-dom";
import ProfilePictureModal from "../components/ProfilePictureModal";
import PasswordModal from "../components/PasswordModal";
import Spinner from "../components/Spinner";
import { getUserProfileData, updateUser } from "../context/auth/AuthActions";
import { toast } from "react-toastify";

const Profile = () => {
  const {
    dispatch,
    user,
    userProfile,
    isLoading,
    isError,
    message,
    isSuccess,
  } = useContext(AuthContext);
  const initialState = { username: "", email: "" };
  const [userData, setUserData] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const { username, email } = userData;
  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_USER_PENDING" });
    try {
      const updatedUser = await updateUser(params.id, userData);
      dispatch({ type: "UPDATE_USER_FULFILLED", payload: updatedUser });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_REJECTED",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      dispatch({ type: "GET_USER_PROFILE_PENDING" });
      try {
        const userProfileData = await getUserProfileData(params.id);
        dispatch({
          type: "GET_USER_PROFILE_FULFILLED",
          payload: userProfileData,
        });
      } catch (error) {
        dispatch({
          type: "GET_USER_PROFILE_REJECTED",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
    getProfile();
  }, [params]);

  useEffect(() => {
    if (isError) {
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
      navigate(-1);
    }

    if (isSuccess) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isError, isSuccess, user?.avatarUrl]);
  useEffect(() => {
    if (userProfile) {
      setUserData({
        username: userProfile.username,
        email: userProfile.email,
      });
    }
  }, [userProfile]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container my-auto rounded bg-dark ">
        <div className="row">
          <div className="col-md-5 border-right d-flex justify-content-center mt-4 align-items-center">
            <div className="d-flex flex-column align-items-center  text-center p-3 pb-5 mb-4">
              <div className="container-image">
                <div className="outer">
                  {user.avatarUrl ? (
                    <img
                      className="rounded-circle  outer"
                      width="150px"
                      src={`http://localhost:5000/${user.avatarUrl}`}
                    />
                  ) : (
                    <img
                      className="rounded-circle  outer"
                      width="150px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    />
                  )}

                  <div className="inner bg-primary">
                    <button
                      className="bg-transparent inner border-outline-none button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    ></button>
                    <label className="mt-2">
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                      >
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <span className="font-weight-bold">
                {userProfile ? userProfile.username : ""}
              </span>
              <span className="text-white">
                {userProfile ? userProfile.email : ""}
              </span>
              <span> </span>
              <Link
                className="text-decoration-none my-4"
                to={`/${user._id}/friends`}
              >
                <div className="px-2 rounded py-2  border border-dark bg-primary ">
                  <p className="small text-white text-center mb-1">
                    Broj prijatelja
                  </p>
                  <p className="mb-0 text-center text-white">
                    <span className="align-middle ">
                      {user?.friends?.length}
                    </span>
                    {user?.receivedRequests?.length > 0 ? (
                      <span class="ms-2 badge bg-danger align-middle">!</span>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-6 border-right">
            <div className="p-3 py-3 pt-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-right">Izmjena profila</h4>
              </div>

              <div className="row mt-3">
                <form onSubmit={onSubmit}>
                  <div className="col-md-12">
                    <label className="labels mb-2">Korisničko ime</label>
                    <input
                      onChange={handleChange}
                      name="username"
                      type="text"
                      className="form-control bg-primary text-white"
                      placeholder="Unesite korisničko ime"
                      value={username}
                      required
                    />
                  </div>
                  <div className="col-md-12 mt-4">
                    <label className="labels mb-2">Email adresa</label>
                    <input
                      name="email"
                      onChange={handleChange}
                      type="email"
                      className="form-control bg-primary text-white"
                      placeholder="Unesite email adresu"
                      value={email}
                    />

                    <a
                      className="text-white pointer d-inline-block mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                    >
                      Da li želite da izmijenite lozinku?
                    </a>
                  </div>
                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-primary profile-button"
                      type="submit"
                    >
                      Izmijeni
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfilePictureModal />
      <PasswordModal />
    </>
  );
};

export default Profile;
