import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './PhotoGallery.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PhotoGallery(props) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setPhotos(props.photos);
  }, [props.photos]);

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem('token');
      let res = await axios.delete(`/api/reports/photo/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setPhotos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(e.target.files.length, 'before');
    if (e.target.files.length !== 1) return;
    const data = new FormData();
    data.append('file', e.target.files[0]);
    console.log(data);
    try {
      let token = localStorage.getItem('token');
      const res = await axios.post(
        `/api/reports/${props.report}/photos`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );
      if (res.status === 201) {
        setPhotos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='PhotoGallery'>
      <div className='photos'>
        {photos.length > 0 ? (
          photos.map((photo, i) => (
            <div key={i} className='thumbnail'>
              <img src={photo.url} alt='' />
              <div className='control'>
                <IconButton
                  aria-label='delete'
                  onClick={() => {
                    handleDelete(photo._id);
                  }}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <h3>No Photos Yet...</h3>
        )}
      </div>
      <div className='control'>
        {photos.length < 5 ? (
          <form>
            <input
              accept='image/*'
              id='image-upload'
              type='file'
              onChange={handleAdd}
            />
            <label htmlFor='image-upload'>
              <Button variant='contained' color='primary' component='span'>
                <CloudUploadIcon />
              </Button>
            </label>
          </form>
        ) : null}
      </div>
    </div>
  );
}
