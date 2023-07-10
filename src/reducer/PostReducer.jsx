import { useAuth } from "../context/AuthContext";

export const PostReducer = (postState, action) => {
  const { activeUser } = useAuth();
  switch (action.type) {
    case "GET_POSTS":
      return { ...postState, posts: action.payload };
    case "GET_HOME_PAGE_POSTS":
      const activeUserPosts =  postState.posts.filter(({username})=>username===activeUser.username)
      const followingUser = activeUser.following.map((user) => user);
      const followingUserPosts = postState.posts.filter(({username})=>followingUser.some((user)=>user.username === username))
     const filteredHomePagePosts = [...activeUserPosts,...followingUserPosts]
      return { ...postState ,homePagePosts : filteredHomePagePosts};
    default:
      return { ...postState };
  }
};
export const initialState = { posts: [], homePagePosts: [] };
