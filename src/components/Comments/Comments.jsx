import React from 'react';
import './Comments.css';

// const useStyles = makeStyles((theme) => ({
//   avatar: {
//     backgroundColor: '#dd33fa',
//   },
// }));

function Comments(props) {
  return (
    <div id='comments-box'>
      <div id='comments-text'>
        {/* <Avatar aria-label='recipe' className={classes.avatar}>
          {props.comment.user &&
            `${props.comment.user.firstName[0]}${props.comment.user.lastName[0]}`}
        </Avatar> */}
        {props.comment.description}
      </div>
    </div>
  );
}

export default Comments;
