import TextField from '@material-ui/core/TextField';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import './ReportForm.css';

function ReportForm({ report, setReport, setIsLoading }) {
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
      address = result.label;
      const lat = result.y;
      const long = result.x;
      setReport({ ...report, location: { address, lat, long } });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className='ReportForm'>
      <div className='add-form'>
        <form autoComplete='off'>
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
      </div>
    </div>
  );
}

export default ReportForm;
