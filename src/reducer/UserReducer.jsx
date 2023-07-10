

export const UserReducer = (userState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...userState, users: action.payload };
    
    default:
      return { ...userState };
  }
};
export const initialState = { users: [] };
