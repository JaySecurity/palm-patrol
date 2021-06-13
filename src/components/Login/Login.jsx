import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ExitToApp } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useState } from 'react';
import './Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubmit = async () => {
    setMsg(null);
    try {
      let res = await axios.post('/api/users/login', { email, password });
    } catch (e) {
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
    <div className='Login'>
      <h1>Login</h1>
      {msg && <Alert severity='error'>{msg}</Alert>}
      <form autoComplete='off'>
        <TextField
          className='form-group'
          type='email'
          id='email'
          name='email'
          value={email}
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className='form-group'
          type='password'
          id='password'
          name='password'
          value={password}
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          size='small'
          endIcon={<ExitToApp />}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
