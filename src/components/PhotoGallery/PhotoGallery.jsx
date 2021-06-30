import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './PhotoGallery.css';

export default function PhotoGallery({ photos }) {
  return (
    <div className='PhotoGallery'>
      {photos.length > 0 ? (
        photos.map((photo, i) => (
          <div key={i} className='thumbnail'>
            <img src={photo.url} alt='' />
            <div className='control'>
              <IconButton aria-label='delete'>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </div>
          </div>
        ))
      ) : (
        <h3>No Photos Yet...</h3>
      )}
    </div>
  );
}
