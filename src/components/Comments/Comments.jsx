import React from "react";
import "./Comments.css";

function Comments(props) {
  return (
    <div id="comments-box">
      <div id="comments-text">{props.comment.description}</div>
    </div>
  );
}

export default Comments;
