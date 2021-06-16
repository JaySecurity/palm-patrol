/* eslint-disable react-hooks/exhaustive-deps */

import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom';
import './App.css';
import ReportForm from './components/ReportForm/ReportForm';
import ReportCategories from './components/ReportCategories/ReportCategories';
import ReportDetail from './components/ReportDetail/ReportDetail';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import SignUp from './components/SignUp/SignUp';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import AddReportPage from './pages/AddReportPage/AddReportPage';

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
              path='/report/add'
              render={(props) => <AddReportPage {...props} />}
            />
            <Route
              path='/report/category'
              render={(props) => <ReportCategories {...props} />}
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
