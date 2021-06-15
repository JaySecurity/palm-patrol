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
  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    setFiles((prevFiles) => {
      return [e.target.files[0], ...prevFiles];
    });
  };

  const handleDelete = (filename) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== filename));
  };

  return (
    <div className='Uploader'>
      <div className='list'>
        <List dense={false}>
          {files.map((file, i) => (
            <ListItem key={i}>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => handleDelete(file.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <form>
        <input
          accept='image/*'
          id='image-upload'
          type='file'
          onChange={handleChange}
        />
        <label htmlFor='image-upload'>
          {files.length < 4 ? (
            <Button
              variant='contained'
              color='primary'
              component='span'
              endIcon={<PhotoCamera />}
            >
              Upload Photo
            </Button>
          ) : null}
        </label>
      </form>
    </div>
  );
}

export default Uploader;
