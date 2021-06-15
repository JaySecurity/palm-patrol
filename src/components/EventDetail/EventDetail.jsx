/* eslint-disable react-hooks/exhaustive-deps */

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentIcon from '@material-ui/icons/Comment';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function EventDetail(props) {
  const [user] = useContext(UserContext);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [photos, setPhotos] = useState([]);
  const [report, setReport] = useState({
    user: "",
    title: "",
    incidentData: "",
    category: "",
    location: {
      address: "",
      lat: 0,
      long: 0,
    },
    description: "",
    photos: [],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/reports/${props.match.params.id}`);
      await setReport(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(async () => {
    let imgArr = await report.photos.map((photo, i) => ({
      label: `Photo ${i + 1}`,
      imgPath: photo.url,
    }));

    setPhotos(imgArr);
  }, [report]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`/api/reports/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setIsLoading(false);
      history.push("/");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <Card className={classes.root}>
      {isLoading && <Spinner />}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={report.title}
        subheader={`${new Date(
          report.incidentData
        ).toLocaleDateString()} - ${new Date(
          report.incidentData
        ).toLocaleTimeString()}`}
      />
      {photos.length ? <ImageCarousel photos={photos} /> : null}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {report.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user && user._id === report.user ? (
          <>
            <IconButton aria-label='share'>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label='share'
              onClick={() => {
                handleDelete(report._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : null}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>comments:</Typography>
          <Typography paragraph>comment 1: comment 2:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default EventDetail;
