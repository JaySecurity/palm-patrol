import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import { red, yellow } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: { width: "95%", margin: "auto", marginBottom: "1.3vh" },
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
    backgroundColor: "#dd33fa",
  },
}));

function ReportListItem({ report }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
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
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
          {report.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}

export default ReportListItem;
