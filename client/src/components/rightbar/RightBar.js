import { useEffect, useState } from "react";
import Online from "../online/Online";
import "./rightbar.css";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAUser,
  fetchFriendList,
  followUser,
  unFollowUser,
} from "../../actions/user";

const RightBar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("profile")).user;
  const friendList = useSelector((state) => state.userReducer.friendList);

  const dispatch = useDispatch();
  const [followed, setFollowed] = useState();

  useEffect(() => {
    if (user?.followers.includes(currentUser?._id)) setFollowed(true);
  }, [currentUser?._id, user?.followers]);

  useEffect(() => {
    dispatch(fetchAUser(currentUser.username));
  }, [currentUser.username, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchFriendList(user?._id));
    } else {
      dispatch(fetchFriendList(currentUser?._id));
    }
  }, [user, dispatch, currentUser?._id]);

  useEffect(() => {
    if (friendList) setFriends(friendList);
  }, [friendList]);

  const handleClick = (e) => {
    e.preventDefault();
    const followerUserId = {
      userId: currentUser._id,
    };
    if (followed) {
      dispatch(unFollowUser(user._id, followerUserId));
    } else {
      dispatch(followUser(user._id, followerUserId));
    }
    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b> Ploa Foster</b> and <b> 3 other friends</b> have birthday today
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((friend) => (
            <Online key={friend._id} user={friend} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user?.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Realtionship:</span>
            <span className="rightbarInfoValue">
              {user?.relationship === 1
                ? "Single"
                : user?.relationship === 2
                ? "Married"
                : "Not Mentioned"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend?.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend?.profilePicture
                      ? friend?.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {friend?.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default RightBar;
