import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';
import './SignUp.css';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const [, setUser] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      let res = await axios.post('/api/users/signup', {
        firstName,
        lastName,
        email,
        password,
        confirm,
      });
      let token = `Bearer ${res.data}`;
      localStorage.setItem('token', token);
      res = await axios.post('/api/users/verify', { token });
      const validUser = res.data.decoded.user;
      setUser(validUser);
      history.push('/');
    } catch (e) {
      setUser(null);
      let {
        response: {
          data: { msg },
        },
      } = e;
      setMsg(msg);
    }
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  return (
    <div className='SignUp'>
      <h1>SignUp</h1>
      {msg && <Alert severity='error'>{msg}</Alert>}
      <form className='SignUp-form' onSubmit={handleSubmit}>
        <TextField
          className='form-group'
          required
          type='text'
          id='firstName'
          name='firstName'
          value={firstName}
          label='First Name'
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          className='form-group'
          required
          type='text'
          id='lastName'
          name='lastName'
          value={lastName}
          label='Last Name'
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          className='form-group'
          required
          type='email'
          id='email'
          name='email'
          value={email}
          label='Email'
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />

        <TextField
          className='form-group'
          required
          type='password'
          id='password'
          name='password'
          value={password}
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className='form-group'
          required
          type='password'
          id='confirm'
          name='confirm'
          value={confirm}
          label='Confirm'
          onChange={(e) => setConfirm(e.target.value)}
        />
        {/* <TextField
          className="form-group"
          type="text"
          id="location"
          name="location"
          value={location}
          label="Location"
          onChange={(e) => setLocation(e.target.value)} */}
        {/* /> */}
        <Button
          variant='contained'
          color='primary'
          size='small'
          endIcon={<ExitToApp />}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
