import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

function AddEvent(props) {
  const [location, setLocation] = useState('');
  const [report, setReport] = useState({
    user: '',
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
    setReport({ ...report, update });
    //setReport({ ...report, [e.target.name]: e.target.value });
    console.log(report);
  };

  return (
    <div>
      <h1>Add a {props.type} Report</h1>
      <form autoComplete='off'>
        <TextField
          id='report.location.address'
          name='location.address'
          value={report.location.address}
          label='Location'
          onChange={handleChange}
        />
        <TextField
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
          id='description'
          name='description'
          multiline
          rows={5}
          value={report.description}
          label='Description'
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default AddEvent;
