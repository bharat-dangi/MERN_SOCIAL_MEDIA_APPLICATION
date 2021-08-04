import "./share.css";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/post";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [postDesc, setPostDesc] = useState({
    desc: "",
  });

  const dispatch = useDispatch();

  const loggedUser = JSON.parse(localStorage.getItem("profile")).user;

  const user = useSelector((state) =>
    state.userReducer.user?.find((u) => u._id === loggedUser?._id)
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", user._id);
    data.append("desc", postDesc.desc);
    if (file) {
      data.append("file", file);
    }
    dispatch(createPost(data));
    setFile(null);
    setPostDesc({
      desc: "",
    });
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"What's in your mind " + user?.username + "?"}
            className="shareInput"
            onChange={(e) => setPostDesc({ ...postDesc, desc: e.target.value })}
            value={postDesc.desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
