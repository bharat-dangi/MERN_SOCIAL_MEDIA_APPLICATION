import { useEffect } from "react";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./profile.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAUser } from "../../actions/user";
import { getProfilePost } from "../../actions/post";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { username } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchAUser(username));
  }, [username, dispatch]);

  useEffect(() => {
    dispatch(getProfilePost(username));
  }, [username, dispatch]);
  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  currentUser?.coverPicture
                    ? PF + user?.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
                className="profileCoverImg"
              />

              <img
                src={
                  user?.profilePicture
                    ? PF + user?.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
