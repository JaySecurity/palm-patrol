import "./App.css";
import Leaflet from './components/Map/Map';
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import AddEvent from "./components/AddEvent/AddEvent";
import Comments from "./components/Comments/Comments";
import EventCategories from "./components/EventCategories/EventCategories";
import EventDetail from "./components/EventDetail/EventDetail";
import EventList from "./components/EventList/EventList";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";
function App() {
  return (
    <main className="App">
      <header></header>
      App
      <SignUp />
      <Login />
      <AddEvent />
      <Comments />
      <EventCategories />
      <EventDetail />
      <EventList />
      <Leaflet />
      <nav>
        <AddAlarmIcon />
      </nav>


     
    </main>
  );
}

export default App;
