import { createContext, useContext, useReducer,useEffect, useState} from "react";
import { UserReducer, initialState } from "../reducer/UserReducer";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const { token,activeUser } = useAuth();
  const [userState, userDispatch] = useReducer(UserReducer, initialState);
  const loggedInUser =  userState?.users?.find(({ username }) => username === activeUser?.username)
  const [searchInput,setSearchInput] = useState(null)
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const searchPopupHandler = (e) => {
       setSearchInput(e.target.value.toUpperCase())
       setSearchPopupOpen(true)
  }
  const searchedUsers = searchInput == ""? [] : userState.users.filter(({firstName})=>firstName.toUpperCase().includes(searchInput))
  const getAllUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.status === 200 || res.status === 201) {
        const { users } = await res.json();
        userDispatch({ type: "GET_USERS", payload: users });
        setSearchPopupOpen(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const followUser = async (userId) => {
    try {
      const res = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("followed Succesfully");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async (userId) => {
    try {
      const res = await fetch(`/api/users/unfollow/${userId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("unfollowed Succesfully");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const bookmarkPost = async (postId) => {
    try {
      const res = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Post Bookmarked");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeBookmarkPost = async (postId) => {
    try {
      const res = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Bookmark Removed");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBookmarkedPosts = async () => {
    try {
      const res = await fetch("/api/users/bookmark", {
        headers: { authorization: token },
      });
      if (res.status === 200 || res.status === 201) {
        console.log(await res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editUserData = async(userData) => {
    try {
        const res = await fetch("/api/users/edit",{
          method:"POST",
          headers:{authorization:token},
          body:JSON.stringify({userData})
        })
        if(res.status === 200 || res.status === 201){
          getAllUsers();
          toast.success("Edited Succesfully");
         }
    } catch (error) {
      console.log(error)
    }
  }
  const getUserByUsername = (usernameParam) =>
    userState.users.find(({ username }) => username === usernameParam);
    
    useEffect(()=>{getAllUsers()},[])
  return (
    <UsersContext.Provider
      value={{
        bookmarkPost,
        removeBookmarkPost,
        getAllBookmarkedPosts,
        getAllUsers,
        getUserByUsername,
        userState,
        userDispatch,
        followUser,
        unfollowUser,
        loggedInUser,
        editUserData,
        searchPopupHandler,
        searchInput,
        searchedUsers,
        searchPopupOpen
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersData = () => useContext(UsersContext);
