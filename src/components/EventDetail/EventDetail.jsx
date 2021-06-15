import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

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

function EventDetail(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [report, setReport] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const res = await axios.get(`/api/reports/${props.params.id}`);
      if (res.data) {
        setReport(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let RReport = {
    _id: 1,
    title: 'car accident',
    incidentData: 'September 14, 2016',
    // category: "accident",
    description:
      'car accident on Ambleside street Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo quis totam, voluptate ipsa eligendi aperiam voluptates facere! Architecto veniam illum adipisci nobis fuga corporis ut.',
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        title={'Shrimp and Chorizo Paella'}
        subheader='September 14, 2016'
      />
      <CardMedia
        className={classes.media}
        // image="/static/images/cards/paella.jpg"
        title='Paella dish'
      />

      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label='share'>edit</IconButton>
        <Link to={`/api/reports/${RReport._id}/delete`}>
          <IconButton aria-label='share'>delete</IconButton>
        </Link>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>comments:</Typography>
          <Typography paragraph>comment 1: comment 2:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default EventDetail;

{
  /* <div>
    <h1>{report.title}detail:</h1>

    <span>Date: {report.incidentData}</span>
    <span>Category: {report.category}</span>
    <span>Description: {report.description}</span>
  </div>; */
}
