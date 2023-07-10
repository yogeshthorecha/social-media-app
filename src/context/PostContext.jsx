import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
} from "react";
import { toast } from "react-hot-toast";
import { PostReducer, initialState } from "../reducer/PostReducer";
import { useAuth } from "./AuthContext";
const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const {token} = useAuth()
  const [optionsPopupActiveId, setOptionsPopupActiveId] = useState(null);
  const optionsPopupHandler = (id) => {
    setOptionsPopupOpen(!optionsPopupOpen);
    setOptionsPopupActiveId(id);
  };
  const [optionsPopupOpen, setOptionsPopupOpen] = useState(false);
  const [activeProfilePosts, setActiveProfilePosts] = useState([]);
  const [postState, postDispatch] = useReducer(PostReducer, initialState);
  const [singlePost,setSinglePost] = useState()
  const getAllPostsData = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.status === 200 || res.status === 201) {
        // console.log(res)
        const { posts } = await res.json();
        postDispatch({ type: "GET_POSTS", payload: posts });
      } else console.log("diff status");
    } catch (error) {
      console.log(error);
    }
  };
  const getPostsByUsername = async (username) => {
    try {
      const res = await fetch(`/api/posts/user/${username}`);
      if (res.status === 200 || res.status === 201) {
        const { posts } = await res.json();
        setActiveProfilePosts(posts);
      } else console.log("diff status");
    } catch (error) {
      console.log(error);
    }
  };
  const likePost = async(postId) => {
    try {
        const res = await fetch(`/api/posts/like/${postId}`,{
          method:"POST",
          headers:{authorization:token}
        })
        if(res.status === 200 || res.status === 201){
          console.log(await res.json())
          getAllPostsData()
        }
    } catch (error) {
      console.log(error)
    }
  }
  const dislikePost = async(postId) => {
    try {
        const res = await fetch(`/api/posts/dislike/${postId}`,{
          method:"POST",
          headers:{authorization:token}
        })
        if(res.status === 200 || res.status === 201){
          console.log(await res.json())
          getAllPostsData()
        }
    } catch (error) {
      console.log(error)
    }
  }
  const createPost = async(postData) => {
    try {
      const res = await fetch("/api/posts",{
        method:"POST",
        headers:{authorization:token},
        body:JSON.stringify({postData})
      })
      if(res.status === 200 || res.status === 201){
        getAllPostsData()
        toast.success("Post Created Succesfully");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deletePost = async (postId) => {
    try{ 
       const res = await fetch(`/api/posts/${postId}`,{
        method:"DELETE",
        headers:{authorization:token}
       })
       if(res.status === 200 || res.status ===201){
        console.log("deleted" , await res.json())
        toast.success("Post Deleted");
       }
       else console.log("delete nai hua")
    }
    catch(error){
      console.error(error);
    }
  }
  const editPost = async(postId,postData) => {
   try {
     const res = await fetch(`/api/posts/edit/${postId}`,{
      method:"POST",
      headers:{authorization:token},
      body:JSON.stringify({postData})
     })
     if(res.status === 201 || res.status===200){
      console.log(await res.json())
      toast.success("Post Edited Succesfully");
     }
   } catch (error) {
    console.log(error)
   }
  }
  const getPostById = async(postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      if (res.status === 200 || res.status === 201) {
        const { post } = await res.json();
        setSinglePost(post);
      } else console.log("diff status");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{getAllPostsData()},[])
  return (
    <PostContext.Provider
      value={{
        singlePost,
        getPostById,
        createPost,
        likePost,
        dislikePost,
        getPostsByUsername,
        activeProfilePosts,
        postDispatch,
        postState,
        getAllPostsData,
        deletePost,optionsPopupHandler,optionsPopupActiveId,optionsPopupOpen,setOptionsPopupOpen,editPost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
