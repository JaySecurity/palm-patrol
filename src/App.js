/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios';
import { useContext, useEffect } from 'react';
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom';
import './App.css';
import AddEvent from './components/AddEvent/AddEvent';
import Comments from './components/Comments/Comments';
import EventCategories from './components/EventCategories/EventCategories';
import EventDetail from './components/EventDetail/EventDetail';
import EventListItem from './components/EventListItem/EventListItem';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import SignUp from './components/SignUp/SignUp';
import { UserContext } from './context/UserContext';
import ReportsPage from './pages/ReportsPage/ReportsPage';

function App() {
  const [, setUser] = useContext(UserContext);

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
            <Route path='/SignUp' render={(props) => <SignUp {...props} />} />
            <Route path='/Login' render={(props) => <Login {...props} />} />
            <Route
              path='/report/add/detail'
              render={(props) => <AddEvent {...props} />}
            />
            <Route
              path='/Comments'
              render={(props) => <Comments {...props} />}
            />
            <Route
              path='/report/add'
              render={(props) => <EventCategories {...props} />}
            />
            <Route
              path='/report/:id'
              render={(props) => <EventDetail {...props} />}
            />
            <Route
              path='/EventListItem'
              render={(props) => <EventListItem {...props} />}
            />

            <Route path='/' exact render={(props) => <ReportsPage />} />
            <Route path='/reports' render={(props) => <ReportsPage />} />
            <Route
              path='/EventCategories'
              render={(props) => <EventCategories />}
            />
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
