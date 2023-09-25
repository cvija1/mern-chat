const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS_PENDING":
      return {
        isLoading: true,
      };
    case "GET_USERS_FULFILLED":
      return {
        isLoading: false,
        isSuccess: true,
        users: action.payload,
      };
    case "GET_USERS_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload,
        users: [],
      };
    case "GET_FRIENDS_PENDING":
      return {
        isLoading: true,
      };
    case "GET_FRIENDS_FULFILLED":
      return {
        isLoading: false,
        isSuccess: true,
        friends: action.payload,
      };
    case "GET_FRIENDS_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload,
        friends: [],
      };
    case "GET_FRIENDS_REQUEST_PENDING":
      return {
        isLoading: true,
      };
    case "GET_FRIENDS_REQUEST_FULFILLED":
      return {
        isLoading: false,
        isSuccess: true,
        friendsRequest: action.payload,
      };
    case "GET_FRIENDS_REQUEST_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload,
        friendsRequest: [],
      };

    default:
      return state;
  }
};

export default UserReducer;
