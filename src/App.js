import "./App.css";
import {
  BrowserRouter as Browser,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Leaflet from "./components/Map/Map";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import AddEvent from "./components/AddEvent/AddEvent";
import Comments from "./components/Comments/Comments";
import EventCategories from "./components/EventCategories/EventCategories";
import EventDetail from "./components/EventDetail/EventDetail";
import EventList from "./components/EventList/EventList";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
function App() {
  return (
    <Browser>
      <main className="App">
        <Header />

        <Switch>
          <Route path="/SignUp" render={(props) => <SignUp {...props} />} />
          <Route path="/Login" render={(props) => <Login {...props} />} />
          <Route path="/AddEvent" render={(props) => <AddEvent {...props} />} />
          <Route path="/Comments" render={(props) => <Comments {...props} />} />
          <Route
            path="/EventCategories"
            render={(props) => <EventCategories {...props} />}
          />
          <Route
            path="/EventDetail"
            render={(props) => <EventDetail {...props} />}
          />
          <Route
            path="/EventList"
            render={(props) => <EventList {...props} />}
          />
          <Leaflet />
        </Switch>
        <nav>
          <Nav />
        </nav>
      </main>
    </Browser>
  );
}

export default App;
