import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReportForm from '../../components/ReportForm/ReportForm';
import Spinner from '../../components/Spinner/Spinner';
import { UserContext } from '../../context/UserContext';
import './EditReportPage.css';

function EditReportPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useContext(UserContext);
  const history = useHistory();
  // const [files, setFiles] = useState([]);
  const [report, setReport] = useState({
    user: user._id,
    title: '',
    incidentData: '',
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
      await setReport(res.data);
      // res.data.incidentData = new Date(res.data.incidentData).toGMTString();
      console.log(res.data.date);
      console.log(res.data.time);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    return;
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
