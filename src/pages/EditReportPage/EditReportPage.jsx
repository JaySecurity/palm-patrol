import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReportForm from '../../components/ReportForm/ReportForm';
import Spinner from '../../components/Spinner/Spinner';
import { UserContext } from '../../context/UserContext';
import './EditReportPage.css';
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery';

function EditReportPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useContext(UserContext);
  const history = useHistory();
  // const [files, setFiles] = useState([]);
  const [report, setReport] = useState({
    user: user._id,
    title: '',
    incidentDate: '',
    incidentTime: '',
    category: '',
    location: {
      address: '',
      lat: 0,
      long: 0,
    },
    description: '',
    photos: [],
  });

  useEffect(() => {
    if (!user) history.push('/login');
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/reports/${props.match.params.id}`);
      res.data.incidentDate = new Date(res.data.incidentDate)
        .toISOString()
        .slice(0, 10);
      await setReport(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem('token');
      const res = await axios.put(`/api/reports/${report._id}`, report, {
        headers: {
          'Content-Type': 'application/json',
          Authoization: token,
        },
      });
      history.push(`/report/${report._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='EditReportPage'>
      {isLoading && <Spinner />}
      <h1>Edit Report</h1>
      <ReportForm
        report={report}
        setReport={setReport}
        setIsLoading={setIsLoading}
      />
      <PhotoGallery photos={report.photos} report={report._id} />
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

export default EditReportPage;
