import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function AddComment({ id, setReport }) {
  const [user] = useContext(UserContext);
  const [commentData, setCommentData] = useState({
    _id: user._id,
    description: "",
  });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(err.response.data);
    }
  };

  return (
    <div className="AddComment">
      <form className="AddComment-form" onSubmit={handleSubmit}>
        <TextField
          className="form-group"
          required
          id="description"
          name="description"
          multiline
          rows={2}
          value={commentData.description}
          placeholder="write you comment here"
          variant="filled"
          onChange={handleChange}
        />

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
