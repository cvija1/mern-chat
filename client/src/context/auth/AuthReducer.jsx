const AuthReducer = (state, action) => {
  const user = JSON.parse(localStorage.getItem("user"));

  switch (action.type) {
    case "REGISTER_PENDING":
      return {
        isLoading: true,
      };
    case "REGISTER_FULFILLED":
      return {
        isLoading: false,
        isSuccess: true,
        message: action.payload.message,
      };
    case "REGISTER_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload,
        user: null,
      };
    case "LOGIN_PENDING":
      return {
        isLoading: true,
      };
    case "LOGIN_FULFILLED":
      return {
        isLoading: false,
        isSuccess: true,
        user: action.payload,
      };
    case "LOGIN_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload,
        user: null,
      };
    case "LOGOUT_PENDING":
      return {
        isLoading: true,
      };
    case "LOGOUT_FULFILLED":
      return {
        user: null,
      };
    case "VERIFY_USER_PENDING":
      return {
        isLoading: true,
      };
    case "VERIFY_USER_FULFILLED":
      return {
        message: action.payload.message,
        isLoading: false,
        isSuccess: true,
      };
    case "RESET_USER":
      return {
        user: user ? user : null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
        userProfile: user
          ? { username: user.username, email: user.email }
          : null,
      };
    case "GET_USER_PROFILE_PENDING":
      return {
        user: user ? user : null,
        isLoading: true,
      };
    case "GET_USER_PROFILE_FULFILLED":
      return {
        user: user ? user : null,
        isLoading: false,
        isError: false,
        isSuccess: true,
        userProfile: action.payload,
      };
    case "GET_USER_PROFILE_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload,
        user: user ? user : null,
      };

    case "UPDATE_USER_PENDING":
      return {
        isLoading: true,
      };
    case "UPDATE_USER_FULFILLED":
      return {
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        message: "Uspjesno sacuvan profil",
        userProfile: action.payload,
      };
    case "UPDATE_USER_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload,
        user: user ? user : null,
      };
    case "UPDATE_USER_AVATAR_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_USER_AVATAR_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        message: "Uspjesno sacuvana slika na profilu",
      };
    case "UPDATE_USER_AVATAR_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        user: user ? user : null,
      };
    case "SEND_REQUEST":
      return {
        ...state,
        user: user
          ? { ...user, sentRequests: action.payload.sentRequests }
          : null,
      };
    case "CANCEL_REQUEST":
      return {
        ...state,
        user: user
          ? { ...user, sentRequests: action.payload.sentRequests }
          : null,
      };
    case "ACCEPT_REQUEST":
      return {
        ...state,
        user: user
          ? {
              ...user,
              friends: action.payload.friends,
              receivedRequests: action.payload.receivedRequests,
            }
          : null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
