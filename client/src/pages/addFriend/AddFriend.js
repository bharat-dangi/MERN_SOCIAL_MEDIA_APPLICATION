import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAUser, fetchFriendSuggestion } from "../../actions/user";
import FriendSuggestion from "../../components/friendSuggestion/FriendSuggestion";
import RightBar from "../../components/rightbar/RightBar";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import "./addFriend.css";

const AddFriend = () => {
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const { user, token } = JSON.parse(localStorage.getItem("profile"));
  const { friendSuggestion } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (friendSuggestion) setSuggestions(friendSuggestion);
  }, [friendSuggestion]);

  useEffect(() => {
    dispatch(fetchAUser(user.username));
  }, [user.username, dispatch]);

  useEffect(() => {
    dispatch(fetchFriendSuggestion(user?.username, token));
  }, [dispatch, token, user?.username]);

  return (
    <>
      <TopBar />
      <div className="addFriendContainer">
        <SideBar />
        <div className="friendSuggestion">
          <div className="friendSuggestionWrapper">
            {suggestions.map((singleSuggestion) => (
              <FriendSuggestion
                key={singleSuggestion._id}
                user={singleSuggestion}
                currentUser={user}
              />
            ))}
          </div>
        </div>
        <RightBar />
      </div>
    </>
  );
};

export default AddFriend;
