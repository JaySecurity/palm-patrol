import React from "react";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DeckIcon from "@material-ui/icons/Deck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function EventCategories() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DriveEtaIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="accident" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AssignmentLateIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Theft" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Lost&Found" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LibraryAddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Other" />
      </ListItem>
    </List>
  );
}
// function EventCategories() {
//   return (
//     <div>
//       car accident
//       <DriveEtaIcon />
//       Theft
//       <DeckIcon />
//       LostFound
//       <AssignmentLateIcon />
//       others <LibraryAddIcon />
//     </div>
//   );
// }
