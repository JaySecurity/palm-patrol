/* eslint-disable react-hooks/exhaustive-deps */

import { BrowserRouter as Browser, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import ReportCategories from "./components/ReportCategories/ReportCategories";
import ReportDetail from "./components/ReportDetail/ReportDetail";
import SignUp from "./components/SignUp/SignUp";
import AddReportPage from "./pages/AddReportPage/AddReportPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ReportsPage from "./pages/ReportsPage/ReportsPage";

function App() {
  return (
    <Browser>
      <main className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/signup" render={(props) => <SignUp {...props} />} />
            <Route
              path="/profile"
              render={(props) => <ProfilePage {...props} />}
            />
            <Route
              path="/report/add"
              render={(props) => <AddReportPage {...props} />}
            />
            <Route
              path="/report/category"
              render={(props) => <ReportCategories {...props} />}
            />
            <Route
              path="/report/:id"
              render={(props) => <ReportDetail {...props} />}
            />
            <Route path="/" exact render={(props) => <ReportsPage />} />
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
