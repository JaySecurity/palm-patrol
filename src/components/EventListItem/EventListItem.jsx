import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

let report = {
  title: "car accident",
  incidentData: "September 14, 2016",
  // category: "accident",
  description:
    "car accident on Ambleside street Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo quis totam, voluptate ipsa eligendi aperiam voluptates facere! Architecto veniam illum adipisci nobis fuga corporis ut.",
};
function EventListItem() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={report.title}
        subheader={`${new Date(
          report.incidentData
        ).toLocaleDateString()} - ${new Date(
          report.incidentData
        ).toLocaleTimeString()}`}
      />

      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p' noWrap>
          {report.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}

export default EventListItem;

{
  /* <div>
    <h1>{report.title}detail:</h1>

    <span>Date: {report.incidentData}</span>
    <span>Category: {report.category}</span>
    <span>Description: {report.description}</span>
  </div>; */
}
