import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CssBaseline />
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
