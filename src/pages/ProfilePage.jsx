import BottomMobileBar from "../components/BottomMobileBar";
import { BiArrowBack, BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import dayjs from "dayjs";
import { SlOptions } from "react-icons/sl";
import { GiCrossedBones } from "react-icons/gi";
import { BsGrid3X3, BsFillBookmarkHeartFill, BsBookmark } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../css/ProfilePage.css";
import { BsCameraFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { usePosts } from "../context/PostContext";
import { useUsersData } from "../context/UsersContext";
const ProfilePage = () => {
  const { usernameParam } = useParams();
  const {
    optionsPopupHandler,
    setOptionsPopupOpen,
    optionsPopupActiveId,
    optionsPopupOpen,
    deletePost,
    getPostsByUsername,
    activeProfilePosts,
    likePost,
    dislikePost,
    editPost
  } = usePosts();
  const [buttonPressed, setButtonPressed] = useState("posts");
  const {  setToken } = useAuth();
  const [editPopupOpen,setEditPopupOpen] = useState(false)
  const editProfilePicRef = useRef(null);
  const {
    bookmarkPost,
    removeBookmarkPost,
    getUserByUsername,
    loggedInUser,
    unfollowUser,
    followUser,
    editUserData,
  } = useUsersData();
  const [activeEditPost,setActiveEditPost] = useState(null)
  const [editProfileData,setEditProfileData] = useState({
   ...loggedInUser
  })
 
  const [popupOpen, setPopupOpen] = useState(false);
  const activeProfileUser = getUserByUsername(usernameParam);

  const uploadProfilePicClick = () => {
    editProfilePicRef.current.click();
  };
  const handleEditProfilePic = (e) => {
    setEditProfileData({
      ...editProfileData,
      profileAvatar: URL.createObjectURL(e.target.files[0]),
    });
  };
  const saveEditPostHandler = () => {
    editPost(activeEditPost._id,activeEditPost);
    setEditPopupOpen(false)
  }
  useEffect(() => {
    getPostsByUsername(usernameParam);
  }, [getPostsByUsername, usernameParam]);
 
  
  const navigate = useNavigate()
  // setLoggedInUser(
  //   userState.users.find(({ username }) => username === activeUser.username)
  // );

  const saveEditProfileHandler = () => {
    editUserData(editProfileData);
    setPopupOpen(false)
  };
  const editButtonHandler = (postId)=> {
    setActiveEditPost(activeProfilePosts.find(({_id})=>_id===postId))
    setEditPopupOpen(true);
    setOptionsPopupOpen(false)
  }
  const iconStyle = {
    color: "white",
    fontSize: "25px",
    cursor: "pointer",
  };
  const navIcon = ({ isActive }) => ({
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    boxShadow: "0 0px 10px 0px rgba(10, 7, 7, 0.295)",
  });
  return (
    <div>
      {popupOpen ? (
        <div className="main">
          <div className="popup">
            <div className="popup-header">
              <span>Edit Profile</span>
              <span onClick={() => setPopupOpen(false)}>
                <GiCrossedBones />
              </span>
            </div>
            <div className="popup-form">
              <div className="edit-image-div">
                <img src={loggedInUser.profileAvatar} alt="profile" />
                <div className="edit-image-logo-div">
                  <BsCameraFill
                    onClick={() => uploadProfilePicClick()}
                    size="25"
                  />
                  <input
                    onChange={(e) => handleEditProfilePic(e)}
                    ref={editProfilePicRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <label>First Name </label>
              <input
                value={editProfileData.firstName}
                onChange={(e) =>
                  setEditProfileData({
                    ...editProfileData,
                    firstName: e.target.value,
                  })
                }
              />
              <label>Last Name </label>
              <input
                value={editProfileData.lastName}
                onChange={(e) =>
                  setEditProfileData({ ...editProfileData, lastName: e.target.value })
                }
              />
              <label>Bio </label>
              <input
                type="text"
                value={editProfileData.bio}
                onChange={(e) =>
                  setEditProfileData({ ...editProfileData, bio: e.target.value })
                }
              />
              <label>Website</label>
              <input
                type="text"
                value={editProfileData.website}
                onChange={(e) =>
                  setEditProfileData({ ...editProfileData, website: e.target.value })
                }
              />
              <button onClick={() => saveEditProfileHandler()}>Save</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {editPopupOpen? 
        <div className="main">
        <div className="popup">
          <div className="popup-header">
            <span>Edit Post</span>
            <span onClick={() => setEditPopupOpen(false)}>
              <GiCrossedBones />
            </span>
          </div>
          <div className="popup-form">
            <input value={activeEditPost?.content} onChange={(e)=>setActiveEditPost({...activeEditPost,content:e.target.value})} type="text" style={{border:"none"}} />
               
             <button onClick={()=>saveEditPostHandler()}>Save Changes</button>
          </div>
        </div>
      </div>:""}
      
      <BottomMobileBar />

      <div className="profile-nav">
        <NavLink to={-1} style={navIcon}>
          <BiArrowBack style={iconStyle} />
        </NavLink>
        <span>
          {activeProfileUser.firstName} {activeProfileUser.lastName}
        </span>
      </div>
      <div className="profile-page">
        <div className="profile-block">
          <div className="cover"></div>
          <div className="profile-details">
            <div className="name-username">
              <span className="name">
                {activeProfileUser.firstName} {activeProfileUser.lastName}
              </span>
              <span className="username">@{activeProfileUser.username}</span>
            </div>
            <img src={activeProfileUser.profileAvatar} alt="profile-pic" />
            <button
              style={{
                visibility:
                  loggedInUser.username === usernameParam ? "" : "hidden",
              }}
              onClick={() => setPopupOpen(true)}
            >
              Edit Profile
            </button>
          </div>
          <span className="bio">{activeProfileUser.bio}</span>
          <div className="website">
            <CiGlobe style={{ color: "#ff052a" }} />
            <a href={activeProfileUser.website}>website</a>
          </div>
          <div className="followers-following">
            <span>{activeProfilePosts.length} Posts </span>|
            <span> {activeProfileUser.following.length} Following </span>|{" "}
            <span>{activeProfileUser.followers.length} Followers</span>
          </div>
          <div className="logout-btn">
            {loggedInUser.username === usernameParam ? (
              <button onClick={() => setToken(null)}>Logout</button>
            ) : loggedInUser.following.find(
                ({ username }) => username === usernameParam
              ) ? (
              <button onClick={() => unfollowUser(activeProfileUser._id)}>
                Unfollow
              </button>
            ) : (
              <button onClick={() => followUser(activeProfileUser._id)}>
                Follow
              </button>
            )}
          </div>
          <div className="posts-bookmarks-btn">
            <button
              onClick={() => setButtonPressed("posts")}
              style={{
                width:activeProfileUser._id===loggedInUser._id?"":"100%",
                backgroundColor:
                  buttonPressed === "posts" ? "rgb(248, 176, 176)" : "",
              }}
            >
              <BsGrid3X3 /> POSTS
            </button>
            <button
              onClick={() => setButtonPressed("bookmarks")}
              style={{
                display:activeProfileUser._id===loggedInUser._id?"":"none" ,
                backgroundColor:
                  buttonPressed === "bookmarks" ? "rgb(248, 176, 176)" : "",
              }}
            >
              <BsBookmark /> BOOKMARKS
            </button>
          </div>
        </div>
        {buttonPressed === "posts" ? (
          <div className="posts-block">
            {activeProfilePosts?.length > 0 ? (
              <ul>
                {activeProfilePosts.map(
                  ({
                    _id,
                    content,
                    likes,
                    website,
                    image,
                    username,
                    createdAt,
                    likes: { likeCount, likedBy },
                  }) => (
                    <li key={_id}>
                      <div className="section-1">
                        <div className="post-header-left-part">
                          <img
                            src={activeProfileUser.profileAvatar}
                            alt="profile"
                          />
                          <div className="name-username">
                            <span className="name">
                              {activeProfileUser.firstName}{" "}
                              {activeProfileUser.lastName}
                            </span>
                            <span className="username">@{username}</span>
                          </div>
                          <span className="date">
                            · {dayjs(createdAt).format("MMM DD, YYYY")}
                          </span>
                        </div>
                        <div className="post-header-right-part">
                          <span>
                            <SlOptions
                              onClick={() => optionsPopupHandler(_id)}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="section-2">
                        {optionsPopupOpen && optionsPopupActiveId === _id ? (
                          <div
                            style={{ display: optionsPopupOpen ? "" : "none" }}
                            className="popup-menu"
                          >
                            <span
                              onClick={() => deletePost(_id)}
                              className="delete-span"
                            >
                              Delete
                            </span>
                            <span
                            onClick={()=>editButtonHandler(_id)}
                            >Edit</span>
                          </div>
                        ) : (
                          ""
                        )}

                        <p className="content">{content}</p>
                        {image ? <img onClick={()=>navigate(`/singlepost/${_id}`)} src={image} alt="post" /> : ""}
                      </div>
                      <div className="section-3">
                        <span>
                          {likedBy.find(
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
                          {" "}
                          {loggedInUser?.bookmarks.find(
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
            ) : (
              <div className="no-posts">
                <img
                  src="https://i.postimg.cc/PJPpR7xd/image.png"
                  alt="sad-dogo"
                />
                <p>No Posts</p>
              </div>
            )}
          </div>
        ) : (
          <div className="posts-block">
            {activeProfileUser?.bookmarks?.length > 0 ? (
              <ul>
                {activeProfileUser?.bookmarks.map(
                  ({
                    _id,
                    content,
                    likes,
                    website,
                    image,
                    username,
                    createdAt,
                  }) => (
                    <li key={_id}>
                      <div className="section-1">
                        <div className="post-header-left-part">
                          <img
                            src={activeProfileUser.profileAvatar}
                            alt="profile"
                          />
                          <div className="name-username">
                            <span className="name">
                              {activeProfileUser.firstName}{" "}
                              {activeProfileUser.lastName}
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
                        {/* <div className="popup-menu">
                             <span className="delete-span">Delete</span>
                             <span>Edit</span>
                             </div> */}
                      </div>
                      <div className="section-2">
                        <p className="content">{content}</p>
                        <img src={image} alt="post" />
                      </div>
                      <div className="section-3">
                        <span>
                          <AiOutlineHeart />
                        </span>
                        <span>
                          <BiComment />
                        </span>
                        <span>
                          {" "}
                          {loggedInUser?.bookmarks.find(
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
            ) : (
              <div className="no-bookmarks">
                <img
                  src="https://i.postimg.cc/PJPpR7xd/image.png"
                  alt="sad-dogo"
                />
                <p>No Bookmarks</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
