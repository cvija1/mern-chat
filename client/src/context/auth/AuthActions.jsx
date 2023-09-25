import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";

export const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const verifyUser = async (code) => {
  const response = await axios.get(`${API_URL}/confirm/` + code);
  return response.data;
};

export const getUserProfileData = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/profile/${id}`, config);

  return response.data;
};

export const updateUser = async (id, userData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/profile/${id}`,
    userData,
    config
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const updateUserAvatar = async (id, file) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  const formData = new FormData();
  console.log(file);
  formData.append("data", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/profile/avatar/${id}`,
    formData,
    config
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const sendFriendRequest = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "request", { id }, config);
  if (response.data) {
    user.sentRequests = response.data.sentRequests;
    localStorage.setItem("user", JSON.stringify(user));
  }

  return response.data;
};

export const cancelFriendRequest = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { id },
  };
  //put ne moze sa data moracu u config da stavim
  const response = await axios.delete(API_URL + "request", config);
  if (response.data) {
    user.sentRequests = response.data.sentRequests;
    localStorage.setItem("user", JSON.stringify(user));
  }
  return response.data;
};

export const acceptFriendRequest = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { id },
  };

  const response = await axios.put(API_URL + "request", null, config);
  if (response.data) {
    user.receivedRequests = user.receivedRequests.filter((request) => {
      return !response.data.friends.includes(request);
    });

    user.friends = response.data.friends;
    localStorage.setItem("user", JSON.stringify(user));
  }
  return response.data;
};
