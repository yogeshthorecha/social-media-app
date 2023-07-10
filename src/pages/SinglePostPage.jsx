import { useEffect } from "react"
import BottomMobileBar from "../components/BottomMobileBar"
import "../css/SinglePostPage.css"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import {BiArrowBack} from "react-icons/bi"
import { usePosts } from "../context/PostContext"
import { useUsersData } from "../context/UsersContext"

import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import dayjs from "dayjs";
import { BsBookmark, BsFillBookmarkHeartFill } from "react-icons/bs";
export const SinglePostPage = () => {
    const {getPostById,singlePost,likePost, dislikePost} = usePosts()
    const {getUserByUsername,loggedInUser, bookmarkPost,
        removeBookmarkPost} = useUsersData()
    const {postId} = useParams()
     useEffect(()=>{getPostById(postId)},[])
    const activePostUser = getUserByUsername(singlePost?.username)
    const navigate = useNavigate()
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
        <div className="single-post-page">
          <BottomMobileBar/>
           <div className="profile-nav">
        <NavLink to={-1} style={navIcon}>
          <BiArrowBack style={iconStyle} />
        </NavLink>
        <span>
          {activePostUser?.firstName} {activePostUser?.lastName}
        </span>
      </div>
      <div className="post-block">
      <div className="section-1">
                    <div className="post-header-left-part">
                      <img
                        onClick={() => navigate(`/profile/${singlePost?.username}`)}
                        src={activePostUser?.profileAvatar}
                        alt="profile"
                      />
                      <div
                        onClick={() => navigate(`/profile/${singlePost?.username}`)}
                        className="name-username"
                      >
                        <span className="name">
                          {activePostUser?.firstName}{" "}
                          {activePostUser?.lastName}
                        </span>
                        <span className="username">@{activePostUser?.username}</span>
                      </div>
                      <span className="date">
                        · {dayjs(singlePost?.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </div>
                    <div className="post-header-right-part">
                      <span>
                        <SlOptions />
                      </span>
                    </div>
                  </div>
                  <div className="section-2">
                    <p className="content">{singlePost?.content}</p>
                    {singlePost?.image ? <img src={singlePost?.image}  alt="post" /> : ""}
                  </div>
                  <div className="section-3">
                    <span>
                      {singlePost?.likedBy?.find(
                        ({ username }) => username === loggedInUser.username
                      ) ? (
                        <AiFillHeart onClick={() => dislikePost(singlePost?._id)} />
                      ) : (
                        <AiOutlineHeart onClick={() => likePost(singlePost?._id)} />
                      )}{" "}
                      {singlePost?.likeCount}
                    </span>
                    <span>
                      <BiComment />
                    </span>
                    <span>
                      {loggedInUser?.bookmarks?.find(
                        (post) => post._id === singlePost?._id
                      ) ? (
                        <BsFillBookmarkHeartFill
                          onClick={() => removeBookmarkPost(singlePost?._id)}
                        />
                      ) : (
                        <BsBookmark onClick={() => bookmarkPost(singlePost?._id)} />
                      )}
                    </span>
                  </div>
                  </div>
        </div>
    )
}