import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ExitToApp } from '@material-ui/icons';
import CreateIcon from '@material-ui/icons/Create';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      let res = await axios.post('/api/users/login', { email, password });
      let token = `Bearer ${res.data.token}`;
      localStorage.setItem('token', token);
      setUser(res.data.user);
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
    <div className='Login'>
      <h1>Login</h1>
      {msg && <Alert severity='error'>{msg}</Alert>}
      <form className='login-form' onSubmit={handleSubmit}>
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
        <div id='div-buttons'>
          <Button
            variant='contained'
            color='primary'
            size='small'
            id='login-button'
            endIcon={<ExitToApp />}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Link to='/signup'>
            <Button
              variant='contained'
              color='primary'
              size='small'
              id='signup-button'
              endIcon={<CreateIcon />}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
