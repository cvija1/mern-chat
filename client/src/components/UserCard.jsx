import React, { useContext } from "react";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  sendFriendRequest,
} from "../context/auth/AuthActions";
import AuthContext from "../context/auth/AuthContext";

const UserCard = ({ userInfo }) => {
  const { username, email } = userInfo;
  const { dispatch, user } = useContext(AuthContext);

  return (
    <div className="col my-5 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <div className="card" style={{ borderRadius: "15px" }}>
        <div className="card-body p-4">
          <div className="d-flex text-black">
            <div className="d-none d-sm-block flex-shrink-0">
              <img
                src={
                  userInfo.avatarUrl
                    ? `https://mern-chat-egjq.onrender.com/${userInfo.avatarUrl}`
                    : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                }
                alt="Generic placeholder image"
                className="img-fluid"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="flex-grow-1 ms-0 ms-sm-3">
              <h5 className="mb-1 text-center text-white">{username}</h5>

              <div
                className="mt-3 rounded-3 p-2 mb-2"
                style={{ backgroundColor: "#efefef" }}
              >
                <div className="px-3">
                  <p className="small text-muted text-center mb-1">
                    Broj prijatelja
                  </p>
                  <p className="mb-0 text-center">
                    {userInfo?.friends?.length}
                  </p>
                </div>
              </div>
              <div className="d-flex pt-1">
                <button
                  onClick={async () => {
                    if (
                      !user?.sentRequests?.includes(userInfo._id) &&
                      !user?.receivedRequests?.includes(userInfo._id)
                    ) {
                      const friendRequests = await sendFriendRequest(
                        userInfo._id
                      );
                      dispatch({
                        type: "SEND_REQUEST",
                        payload: friendRequests,
                      });
                    } else if (user?.sentRequests?.includes(userInfo._id)) {
                      const friendRequests = await cancelFriendRequest(
                        userInfo._id
                      );
                      dispatch({
                        type: "CANCEL_REQUEST",
                        payload: friendRequests,
                      });
                    } else if (user?.receivedRequests?.includes(userInfo._id)) {
                      const friends = await acceptFriendRequest(userInfo._id);
                      dispatch({
                        type: "ACCEPT_REQUEST",
                        payload: friends,
                      });
                    }
                  }}
                  type="button"
                  className="btn btn-primary flex-grow-1"
                  disabled={user?.friends.includes(userInfo._id)}
                >
                  {user?.sentRequests?.includes(userInfo._id)
                    ? "Odbaci zahtjev"
                    : user?.receivedRequests?.includes(userInfo._id)
                    ? "Prihvati zahtjev"
                    : user?.friends.includes(userInfo._id)
                    ? "Prijatelji"
                    : "Dodaj prijatelja"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
