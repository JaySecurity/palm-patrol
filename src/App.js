/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios';
import { useContext, useEffect } from 'react';
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import ReportCategories from './components/ReportCategories/ReportCategories';
import ReportDetail from './components/ReportDetail/ReportDetail';
import SignUp from './components/SignUp/SignUp';
import { UserContext } from './context/UserContext';
import AddReportPage from './pages/AddReportPage/AddReportPage';
import EditReportPage from './pages/EditReportPage/EditReportPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ReportsPage from './pages/ReportsPage/ReportsPage';

function App() {
  const [user, setUser] = useContext(UserContext);
  useEffect(async () => {
    let token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.post('/api/users/verify', { token });
        const validUser = res.data.decoded.user;
        setUser(validUser);
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Browser>
      <main className='App'>
        <Header />
        <div className='container'>
          <Switch>
            <Route
              path='/report/edit/:id'
              render={(props) => <EditReportPage {...props} />}
            />
            <Route path='/login' render={(props) => <Login {...props} />} />
            <Route path='/signup' render={(props) => <SignUp {...props} />} />
            <Route
              path='/profile'
              render={(props) => <ProfilePage {...props} />}
            />
            <Route
              path='/report/category'
              render={(props) => <ReportCategories {...props} />}
            />
            <Route
              path='/report/add'
              render={(props) => <AddReportPage {...props} />}
            />
            <Route
              path='/report/:id'
              render={(props) => <ReportDetail {...props} />}
            />
            <Route path='/' exact render={(props) => <ReportsPage />} />
          </Switch>
          <nav>
            <Nav />
          </nav>
        </div>
      </main>
    </Browser>
  );
}

export default App;
