import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function AddComment({ id, setReport }) {
  const [user] = useContext(UserContext);
  const [commentData, setCommentData] = useState({
    user: user._id,
    description: "",
  });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.description) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`/api/reports/${id}/comments`, commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setReport(res.data);
      setCommentData({ ...commentData, description: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AddComment">
      <form className="AddComment-form" onSubmit={handleSubmit}>
        <div id="textbox">
          <TextField
            className="form-group"
            required
            id="description"
            name="description"
            multiline
            rows={2}
            value={commentData.description}
            placeholder="  write you comment here"
            id="outlined-basic"
            style={{
              backgroundColor: "#eaeaf3",
              width: "100%",
              borderRadius: "7px",
            }}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Add comment
        </Button>
      </form>
    </div>
  );
}

export default AddComment;
