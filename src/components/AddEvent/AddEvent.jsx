import React, { useState } from 'react';

function AddEvent(props) {
  const [location, setLocation] = useState('');
  const [report, setReport] = useState({
    user: '',
    incidentData: '',
    category: props.type,
    location: {
      address: 'test',
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
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }
    if (!value) {
      return schema[pList[len - 1]];
    }
    schema[pList[len - 1]] = value;
  }

  const handleChange = (e) => {
    let update = report;
    nestedObjectGetUpdate(update, e.target.name, e.target.value);
    setReport(update);
    console.log(update, report);
  };
  return (
    <div>
      <h1>Add a {props.type} Report</h1>
      <form autoComplete='off'>
        <input
          id='report.location.address'
          name='report.location.address'
          value={report.location.address}
          label='Location'
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default AddEvent;
