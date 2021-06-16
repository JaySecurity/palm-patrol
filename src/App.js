/* eslint-disable react-hooks/exhaustive-deps */

import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom';
import './App.css';
import AddEvent from './components/AddEvent/AddEvent';
import EventCategories from './components/EventCategories/EventCategories';
import EventDetail from './components/EventDetail/EventDetail';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import SignUp from './components/SignUp/SignUp';
import ReportsPage from './pages/ReportsPage/ReportsPage';

function App() {
  return (
    <Browser>
      <main className='App'>
        <Header />
        <div className='container'>
          <Switch>
            <Route path='/login' render={(props) => <Login {...props} />} />
            <Route path='/signup' render={(props) => <SignUp {...props} />} />
            <Route
              path='/report/add/detail'
              render={(props) => <AddEvent {...props} />}
            />
            <Route
              path='/report/add'
              render={(props) => <EventCategories {...props} />}
            />
            <Route
              path='/report/:id'
              render={(props) => <EventDetail {...props} />}
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
