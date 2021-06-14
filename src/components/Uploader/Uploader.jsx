import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React from 'react';
import './Uploader.css';

function Uploader({ files, setFiles }) {
  function generate(element) {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <div className='Uploader'>
      <div className='list'>
        <List dense={false}>
          {generate(
            <ListItem>
              <ListItemText primary='Single-line item' />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </div>
      <input accept='image/*' id='image-upload' type='file' />
      <label htmlFor='image-upload'>
        <Button
          variant='contained'
          color='primary'
          component='span'
          endIcon={<PhotoCamera />}
        >
          Upload Photo
        </Button>
      </label>
    </div>
  );
}

export default Uploader;
