import React from 'react';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import { Link } from 'react-router-dom';
import './ReportCategories.css';

export default function ReportCategories() {
  return (
    <List className='categoryItem'>
      <Link to={{ pathname: '/report/add/detail', category: 'Accident' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DriveEtaIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='accident' />
        </ListItem>
      </Link>

      <Link to={{ pathname: '/report/add/detail', category: 'Theft' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AssignmentLateIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Theft' />
        </ListItem>
      </Link>

      <Link to={{ pathname: '/report/add/detail', category: 'Lost&Found' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Lost&Found' />
        </ListItem>
      </Link>

      <Link to={{ pathname: '/report/add/detail', category: 'Vandalism' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Vandalism' />
        </ListItem>
      </Link>

      <Link to={{ pathname: '/report/add/detail', category: 'Other' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LibraryAddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Other' />
        </ListItem>
      </Link>
    </List>
  );
}
