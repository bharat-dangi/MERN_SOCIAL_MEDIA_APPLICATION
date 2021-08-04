import { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./profile.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAUser, uploadImage } from "../../actions/user";
import { getProfilePost } from "../../actions/post";
import { Cancel } from "@material-ui/icons";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { username } = useParams();
  const [file, setFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const { user: currentUser, token } = JSON.parse(
    localStorage.getItem("profile")
  );
  const dispatch = useDispatch();

  const user = useSelector((state) =>
    state.userReducer.user?.find((u) => u.username === username)
  );

  useEffect(() => {
    dispatch(fetchAUser(username));
  }, [username, dispatch]);

  useEffect(() => {
    dispatch(getProfilePost(username, token));
  }, [username, dispatch, token]);

  const handleCoverImgUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (file) {
      data.append("file", file);
    }
    dispatch(uploadImage(data, username, token));
    setFile(null);
  };

  const handleProfileImgUpload = (e) => {
    e.preventDefault();
    const data = new FormData();

    if (profileFile) {
      data.append("file", profileFile);
      data.append("profile", true);
    }
    dispatch(uploadImage(data, username, token));
    setProfileFile(null);
  };

  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {file && (
                <div className="shareImgContainer">
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="shareImg"
                  />
                  <Cancel
                    className="shareCancelImg"
                    onClick={() => setFile(null)}
                  />
                  <button className="saveButton" onClick={handleCoverImgUpload}>
                    Save
                  </button>
                </div>
              )}
              {!file && (
                <label htmlFor="file">
                  <img
                    src={
                      user?.coverPicture
                        ? user.coverPicture
                        : PF + "person/noCover.png"
                    }
                    alt=""
                    className="profileCoverImg"
                  />
                  {currentUser.username === username && (
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    ></input>
                  )}
                </label>
              )}

              {profileFile && (
                <>
                  <img
                    src={URL.createObjectURL(profileFile)}
                    alt=""
                    className="uploadProfileImg"
                  />
                  <Cancel
                    className="uploadCancelProfileImg"
                    onClick={() => setProfileFile(null)}
                  />

                  <CheckCircleSharpIcon
                    className="uploadSuccessProfileImg"
                    onClick={handleProfileImgUpload}
                  />
                </>
              )}
              {!profileFile && (
                <label htmlFor="profileFile">
                  <img
                    src={
                      user?.profilePicture
                        ? user.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="profileUserImg"
                  />
                  {currentUser.username === username && (
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="profileFile"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setProfileFile(e.target.files[0])}
                    />
                  )}
                </label>
              )}
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
