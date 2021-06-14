import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Uploader from '../Uploader/Uploader';
import './AddEvent.css';

function AddEvent(props) {
  //const [location, setLocation] = useState('');
  const [user, setUser] = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [report, setReport] = useState({
    user,
    title: '',
    incidentData: '',
    category: props.category,
    location: {
      address: '',
      lat: 0,
      long: 0,
    },
    description: '',
    photos: [],
  });
  const history = useHistory();

  useEffect(() => {
    if (!user) history.push('/login');
  });

  // GeoSearch Provider
  const provider = new OpenStreetMapProvider({
    params: {
      email: 'jasonnicholls1981@gmail.com',
      'accept-language': 'en',
      countrycodes: 'ca',
    },
  });

  // set nested objects on change
  function nestedObjectGetUpdate(data, field, value) {
    let schema = data; // a moving reference to internal objects within obj
    const pList = field.split('.');
    const len = pList.length;
    //debugger;
    for (let i = 0; i < len - 1; i++) {
      let elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }
    if (value === null || value === undefined) {
      return schema[pList[len - 1]];
    }
    schema[pList[len - 1]] = value;
  }

  const handleChange = (e) => {
    let update = report;
    nestedObjectGetUpdate(update, e.target.name, e.target.value);
    setReport({ ...report, ...update });
    //setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleAddress = async () => {
    try {
      let address = report.location.address;
      let result = await provider.search({ query: address });
      result = result[0];
      console.log(result);
      address = result.label;
      const lat = result.y;
      const long = result.x;
      setReport({ ...report, location: { address, lat, long } });
      console.log(report);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    files.map((file, i) => data.append(`files`, file));
    data.append('report', JSON.stringify(report));

    try {
      let token = localStorage.getItem('token');
      const res = await axios.post('/api/reports/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='AddEvent'>
      <h1>Add a {report.category} Report</h1>
      <div className='add-form'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <TextField
            className='form-group'
            required
            id='report.location.address'
            name='location.address'
            value={report.location.address}
            label='Location'
            placeholder='Enter Address'
            onChange={handleChange}
            onBlur={handleAddress}
          />
          <TextField
            className='form-group'
            required
            id='report.title'
            name='title'
            value={report.title}
            label='Title'
            placeholder='Report Title'
            onChange={handleChange}
          />
          <TextField
            className='form-group'
            required
            id='incidentData'
            name='incidentData'
            label='Date / Time of Incident'
            type='datetime-local'
            defaultValue={report.incidentData}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            className='form-group'
            required
            id='description'
            name='description'
            multiline
            rows={5}
            value={report.description}
            label='Description'
            onChange={handleChange}
          />
        </form>
        <Uploader files={files} setFiles={setFiles} />
        <Button
          variant='contained'
          color='primary'
          size='small'
          startIcon={<SaveIcon />}
          className='save-btn'
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default AddEvent;
