import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom';
import './App.css';
import AddEvent from './components/AddEvent/AddEvent';
import Comments from './components/Comments/Comments';
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
            <Route path='/SignUp' render={(props) => <SignUp {...props} />} />
            <Route path='/Login' render={(props) => <Login {...props} />} />
            <Route
              path='/AddEvent'
              render={(props) => <AddEvent {...props} />}
            />
            <Route
              path='/Comments'
              render={(props) => <Comments {...props} />}
            />
            <Route
              path='/EventCategories'
              render={(props) => <EventCategories {...props} />}
            />
            <Route
              path='/EventDetail'
              render={(props) => <EventDetail {...props} />}
            />
            <Route path='/reports' render={(props) => <ReportsPage />} />
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
