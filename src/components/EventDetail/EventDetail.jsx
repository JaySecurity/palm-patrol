import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
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
      setReport(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <CardMedia
        className={classes.media}
        // image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {report.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share">edit</IconButton>
        <IconButton
          aria-label="share"
          onClick={() => {
            handleDelete(report._id);
          }}
        >
          delete
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
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
