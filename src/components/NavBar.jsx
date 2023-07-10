import dog_header_img from "../images/dog-img.jpg";
import "../css/NavBar.css";
import { useUsersData } from "../context/UsersContext";
import { useNavigate } from "react-router";
const NavBar = () => {
  const navigate = useNavigate()
  const { searchedUsers,searchPopupHandler,searchPopupOpen} = useUsersData();
  return (
    <div className="navbar">
      <div className="nav-header">
        <img src={dog_header_img} alt="dog_header" />
        <div>
          <h1>tindog</h1>
        </div>
      </div>
      <div className="search-bar">
        <input onChange={(e)=>searchPopupHandler(e)} type="text" placeholder="Search..." />
        {searchPopupOpen ? (
          <div className="search-popup">
            {searchedUsers.length > 0?searchedUsers?.map(({id,firstName,lastName,profileAvatar,username})=>
            <div className="suggestion-profile">
                       
           <img src={profileAvatar} alt="profile" onClick={() => navigate(`/profile/${username}`)}/>
              <div className="name-username" onClick={() => navigate(`/profile/${username}`)}>
                <span>{firstName +" "+ lastName}</span>
                <span>@{username}</span>
              </div>
           </div>
            ):
            <span>No matching users....</span>
            }
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default NavBar;
