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
import { Link } from "react-router-dom";
import "./EventCategories.css";

export default function EventCategories() {
  return (
    <List className="categoryItem">
      <Link to={{ pathname: "/AddEvent", category: "Accident" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DriveEtaIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="accident" />
        </ListItem>
      </Link>

      <Link to={{ pathname: "/AddEvent", category: "Theft" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AssignmentLateIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Theft" />
        </ListItem>
      </Link>

      <Link to={{ pathname: "/AddEvent", category: "Lost&Found" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Lost&Found" />
        </ListItem>
      </Link>

      <Link to={{ pathname: "/AddEvent", category: "Vandalism" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vandalism" />
        </ListItem>
      </Link>

      <Link to={{ pathname: "/AddEvent", category: "Other" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LibraryAddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Other" />
        </ListItem>
      </Link>
    </List>
  );
}
