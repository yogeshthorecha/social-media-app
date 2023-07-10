import BottomMobileBar from "../components/BottomMobileBar";
import NavBar from "../components/NavBar";
import { BsFillBookmarkHeartFill, BsBookmark } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import dayjs from "dayjs";
import { SlOptions } from "react-icons/sl";
import { useUsersData } from "../context/UsersContext";
import "../css/BookmarksPage.css";
import { usePosts } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
const BookmarksPage = () => {
  const navigate = useNavigate()
  const {likePost,dislikePost} = usePosts()
  const {setToken} = useAuth()
  const {
    loggedInUser,
    removeBookmarkPost,
    bookmarkPost,
    userState
  } = useUsersData();
  const followingUsers = loggedInUser?.following?.map((user) => user);
  const suggestionUsers = userState?.users?.filter(
    ({ _id }) =>
      _id !== loggedInUser._id &&
      followingUsers.every((user) => _id !== user._id)
  );
  // setLoggedInUser(
  //   userState?.users.find(({ username }) => username === activeUser.username)
  // );
  const navLinkStyle = ({isActive}) => ({
    fontSize:isActive?"22px" :"20px",
    textDecoration:"none",
    color:isActive?"#ff4c67" :"black",
    fontWeight:"bolder"
  })
  return (
    <>
    
         <BottomMobileBar className="bottom-nav-bar"/>
      
    
    <div className="bookmarks-page">
    
      
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
           
              <img src={loggedInUser.profileAvatar} alt="profile" />
              <div className="name-username">
                <span>{loggedInUser.firstName + loggedInUser.lastName}</span>
                <span>@{loggedInUser.username}</span>
              </div>
         </div>
         </div>
      </div>
      <div className="home-section-2">
      <div className="posts-block">
        {loggedInUser?.bookmarks?.length > 0 ? (
          <ul>
            {loggedInUser?.bookmarks.map(
              ({
                _id,
                content,
                likes,
                image,
                username,
                createdAt,
              }) => (
                <li key={_id}>
                  <div className="section-1">
                    <div className="post-header-left-part">
                      <img src={loggedInUser.profileAvatar} alt="profile" />
                      <div className="name-username">
                        <span className="name">
                          {loggedInUser.firstName} {loggedInUser.lastName}
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
                    <img onClick={()=>navigate(`/singlepost/${_id}`)} src={image} alt="post" />
                  </div>
                  <div className="section-3">
                    <span>
                    {likes?.likedBy?.find(({username})=>username===loggedInUser.username)? <AiFillHeart onClick={()=>dislikePost(_id)}/>: <AiOutlineHeart onClick={()=>likePost(_id)}/>} {likes?.likeCount}
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
          <div className="no-bookmarks-div">
            <img src="https://i.postimg.cc/PJPpR7xd/image.png" alt="sad-dogo" />
            <p>No Bookmarks</p>
          </div>
        )}
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
export default BookmarksPage;
