import { Add, Remove } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../actions/user";
import "./friendsSuggestion.css";

const FriendSuggestion = ({ user, currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
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

  return (
    <>
      <div className="friendsSuggestionWrapper">
        <div className="peopleCard">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="profileImage"
          />
          <p className="profileName">{user.username}</p>
          <p className="mutualFriendCount">25 mutual Friends</p>
          <button className="addButton" onClick={handleClick}>
            {followed ? "UnFollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        </div>
      </div>
    </>
  );
};

export default FriendSuggestion;
