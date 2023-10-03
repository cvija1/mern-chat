import axios from "axios";
const API_URL = "https://mern-chat-egjq.onrender.com/api/users/";
export const getUsers = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const { pageSize, page, search } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { pageSize, page, search },
  };

  const response = await axios.get(API_URL, config);
  return response.data.responseUsers;
};

export const getFriends = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const { pageSize, page, friends } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { pageSize, page, friends },
  };

  const response = await axios.get(API_URL + "friends", config);
  return response.data.friendsArray;
};

export const getFriendsRequest = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const { pageSize, page, friendsRequest } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { pageSize, page, friendsRequest },
  };

  const response = await axios.get(API_URL + "friends/request", config);
  return response.data.friendsRequestArray;
};
