import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './Comments.css';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: '#dd33fa',
    height: 35,
    width: 35,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
}));

function Comments(props) {
  const classes = useStyles();

  return (
    <div id='comments-box'>
      <div id='avatar-box'>
        {props.comment.user.firstName ? (
          <Avatar aria-label='recipe' className={classes.avatar}>
            {props.comment.user.firstName &&
              `${props.comment.user.firstName[0]}${props.comment.user.lastName[0]}`}
          </Avatar>
        ) : null}
      </div>
      <div id='comments-text'>{props.comment.description}</div>
    </div>
  );
}

export default Comments;
