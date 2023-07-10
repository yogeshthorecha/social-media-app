import BottomMobileBar from "../components/BottomMobileBar";
import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { MdOutlineWaves } from "react-icons/md";

import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import dayjs from "dayjs";
import { BsBookmark, BsFillBookmarkHeartFill } from "react-icons/bs";
import { FaGripfire } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import { useUsersData } from "../context/UsersContext";
import { usePosts } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [postData, setPostData] = useState({ content: "", image: null });

  const {
    bookmarkPost,
    removeBookmarkPost,
    loggedInUser,
    getAllUsers,
    userState,
    getUserByUsername,
    followUser,
  } = useUsersData();
  const { createPost, postState, getAllPostsData, likePost, dislikePost } =
    usePosts();
  const [filterButtonPressed, setFilterButtonPressed] = useState("latest");
  const {setToken} = useAuth()

  
  const createPostHandler = (postData) => {
    setPostData({ content: "", image: null });
    createPost(postData);
  };
  const suggestionUsers = userState?.users?.filter(
    ({ _id }) =>
      _id !== loggedInUser?._id &&
      loggedInUser?.following
        ?.map((user) => user)
        .every((user) => _id !== user._id)
  );
  const activeUserPosts = postState?.posts?.filter(
    ({ username }) => username === loggedInUser?.username
  );
  const followingUserPosts = postState?.posts?.filter(({ username }) =>
    loggedInUser?.following
      .map((user) => user)
      .some((user) => user.username === username)
  );
  const homePagePosts = [...activeUserPosts, ...followingUserPosts];
  const filteredHomePagePosts =
    filterButtonPressed === "latest"
      ? homePagePosts.sort(
          (a, b) =>
            Date.parse(dayjs(b.createdAt).format("YYYY-MM-DD")) -
            Date.parse(dayjs(a.createdAt).format("YYYY-MM-DD"))
        )
      : homePagePosts.filter(({ trending }) => trending);
  const navIcons = ({ isActive }) => ({
    width: "35px",
    height: "35px",
    borderRadius: "100%",
    boxShadow: isActive ? "0 0px 20px 0px rgba(10, 7, 7, 0.495)" : "none",
  });
  const handlePostImageUploadClick = () => {
    imageRef.current.click();
  };
  const handlePostImageUpload = (e) => {
    setPostData({ ...postData, image: URL.createObjectURL(e.target.files[0]) });
  };
  const navLinkStyle = ({isActive}) => ({
    fontSize:isActive?"22px" :"20px",
    textDecoration:"none",
    color:isActive?"#ff4c67" :"black",
    fontWeight:"bolder"
  })
  useEffect(() => {
    getAllUsers();
    getAllPostsData();
  }, []);
  return (
    <>
      <div className="bottom-mobile-bar">
      <BottomMobileBar />
      </div>
      
      <div className="home-page">
      <NavBar />
      <div className="home-section-1">
      <div className="home-left-part">
         <div className="left-nav-bar"> 
            <NavLink to="/" className="navLink" style={navLinkStyle}>Home</NavLink>
            <NavLink to="/explore" className="navLink" style={navLinkStyle}>Explore</NavLink>
            <NavLink to="/bookmarks" className="navLink" style={navLinkStyle}>Bookmarks</NavLink>
            <span onClick={()=>setToken(null)} style={{fontWeight:"bolder",fontSize:"20px",color:"black",cursor:"pointer"}} className="navLink">Logout</span>
         </div>
         <div className="profile-bar">
           
              <img src={loggedInUser.profileAvatar} alt="profile" onClick={()=>navigate(`/profile/${loggedInUser?.username}`)}/>
              <div className="name-username" onClick={()=>navigate(`/profile/${loggedInUser?.username}`)}>
                <span>{loggedInUser.firstName + loggedInUser.lastName}</span>
                <span>@{loggedInUser.username}</span>
              </div>
         </div>
         </div>
      </div>
        <div className="home-section-2">
        <div className="create-post">
          <div className="profile-icon">
            <NavLink to="/profile" style={navIcons}>
              <img src={loggedInUser?.profileAvatar} alt="profile" />
            </NavLink>
          </div>
          <div className="create-form">
            <textarea value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              } placeholder="What's happening"   />

            <div className="icon-btn">
              <RiImageAddFill
                onClick={handlePostImageUploadClick}
                style={{ fontSize: "23px", cursor: "pointer" }}
              />
              <input
                ref={imageRef}
                onChange={(e) => handlePostImageUpload(e)}
                type="file"
                style={{ display: "none" }}
              />
              <button onClick={() => createPostHandler(postData)}>Post</button>
            </div>
          </div>
        </div>
        <div className="filters">
          <button
            onClick={() => setFilterButtonPressed("latest")}
            style={{
              backgroundColor:
                filterButtonPressed === "latest" ? "rgb(248, 176, 176)" : "",
            }}
          >
            <MdOutlineWaves style={{ fontSize: "14px", marginRight: "2px" }} />
            Latest
          </button>
          <button
            onClick={() => setFilterButtonPressed("trending")}
            style={{
              backgroundColor:
                filterButtonPressed === "trending" ? "rgb(248, 176, 176)" : "",
            }}
          >
            <FaGripfire style={{ fontSize: "14px", marginRight: "2px" }} />
            Trending
          </button>
        </div>
        <div className="wrapper">
          {suggestionUsers?.map(
            ({ _id, firstName, lastName, profileAvatar, username }) => (
              <div key={_id} className="wrapper-item">
                <img
                  onClick={() => navigate(`/profile/${username}`)}
                  src={profileAvatar}
                  alt="profile"
                />
                <p onClick={() => navigate(`/profile/${username}`)}>
                  {firstName} {lastName}
                </p>
                <button onClick={() => followUser(_id)}>Follow</button>
              </div>
            )
          )}
        </div>
        <div className="posts-block">
          <ul>
            {filteredHomePagePosts?.map(
              ({
                _id,
                content,
                image,
                username,
                createdAt,
                likes: { likeCount, likedBy },
              }) => (
                <li key={_id}>
                  <div className="section-1">
                    <div className="post-header-left-part">
                      <img
                        onClick={() => navigate(`/profile/${username}`)}
                        src={getUserByUsername(username)?.profileAvatar}
                        alt="profile"
                      />
                      <div
                        onClick={() => navigate(`/profile/${username}`)}
                        className="name-username"
                      >
                        <span className="name">
                          {getUserByUsername(username)?.firstName}{" "}
                          {getUserByUsername(username)?.lastName}
                        </span>
                        <span className="username">@{username}</span>
                      </div>
                      <span className="date">
                        · {dayjs(createdAt).format("MMM DD, YYYY")}
                      </span>
                    </div>
                    <div className="post-header-right-part">
                      <span>
                        <SlOptions />
                      </span>
                    </div>
                  </div>
                  <div className="section-2">
                    <p className="content">{content}</p>
                    {image ? <img src={image} onClick={()=>navigate(`/singlepost/${_id}`)} alt="post" /> : ""}
                  </div>
                  <div className="section-3">
                    <span>
                      {likedBy?.find(
                        ({ username }) => username === loggedInUser.username
                      ) ? (
                        <AiFillHeart onClick={() => dislikePost(_id)} />
                      ) : (
                        <AiOutlineHeart onClick={() => likePost(_id)} />
                      )}{" "}
                      {likeCount}
                    </span>
                    <span>
                      <BiComment />
                    </span>
                    <span>
                      {loggedInUser?.bookmarks?.find(
                        (post) => post._id === _id
                      ) ? (
                        <BsFillBookmarkHeartFill
                          onClick={() => removeBookmarkPost(_id)}
                        />
                      ) : (
                        <BsBookmark onClick={() => bookmarkPost(_id)} />
                      )}
                    </span>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
        </div>
        <div className="home-section-3">
          
           <div className="big-screen-suggestion-bar">
           <span className="suggestion-heading">Suggested Users</span>
           <ul>
           {suggestionUsers.map(({_id,profileAvatar,username,firstName,lastName})=><div className="suggestion-profile">
                       
           <img src={profileAvatar} alt="profile" onClick={() => navigate(`/profile/${username}`)}/>
              <div className="name-username" onClick={() => navigate(`/profile/${username}`)}>
                <span>{firstName +" "+ lastName}</span>
                <span>@{username}</span>
              </div>
           </div>)}
           </ul>
           </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
