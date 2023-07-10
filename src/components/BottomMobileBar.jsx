import "../css/BottomMobileBar.css";
import { BsBookmarksFill } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { MdExplore } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useUsersData } from "../context/UsersContext";
import { useEffect } from "react";
const BottomMobileBar = () => {
  const iconStyle = {
    color: "black",
    fontSize: "25px",
    cursor: "pointer",
  };
  const navIcons = ({ isActive }) => ({
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    boxShadow: isActive ? "0 0px 20px 0px rgba(10, 7, 7, 0.495)" : "none",
  });
  const { setToken, activeUser } = useAuth();
  const {loggedInUser} = useUsersData() 

  
  return (
    <div className="bottom-nav-bar">
      <div className="bottom-nav-icons">
        <NavLink to="/" style={navIcons}>
          <AiFillHome style={iconStyle} />
        </NavLink>
        <NavLink to="/explore" style={navIcons}>
          <MdExplore style={iconStyle} />
        </NavLink>
        <NavLink to="/bookmarks" style={navIcons}>
          <BsBookmarksFill style={iconStyle} />
        </NavLink>
        <div onClick={() => setToken(null)} className="nav-items">
          <FiLogOut style={iconStyle} />
        </div>
      </div>
      <div className="user-profile-icon">
        <NavLink to={`/profile/${activeUser.username}`} style={navIcons}>
          <img src={loggedInUser?.profileAvatar} alt="profile"/>
        </NavLink>
      </div>
    </div>
  );
};
export default BottomMobileBar;
