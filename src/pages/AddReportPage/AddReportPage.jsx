import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReportForm from '../../components/ReportForm/ReportForm';
import Spinner from '../../components/Spinner/Spinner';
import Uploader from '../../components/Uploader/Uploader';
import { UserContext } from '../../context/UserContext';
import './AddReportPage.css';

function AddReportPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useContext(UserContext);
  const history = useHistory();
  const [files, setFiles] = useState([]);
  const [report, setReport] = useState({
    user: user._id,
    title: '',
    incidentDate: '',
    incidentTime: '',
    category: props.location.category,
    location: {
      address: '',
      lat: 0,
      long: 0,
    },
    description: '',
    photos: [],
  });
  useEffect(() => {
    if (!user._id) history.push('/login');
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      if (res.status === 201) {
        setIsLoading(false);
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='AddReportPage'>
      {isLoading && <Spinner />}
      <h1>Add a {report.category} Report</h1>
      <ReportForm
        report={report}
        setReport={setReport}
        setIsLoading={setIsLoading}
      />
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
  );
}

export default AddReportPage;
