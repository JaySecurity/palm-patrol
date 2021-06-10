import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import AddEvent from "./components/AddEvent/AddEvent";
import Comments from "./components/Comments/Comments";
import EventCategories from "./components/EventCategories/EventCategories";
import EventDetail from "./components/EventDetail/EventDetail";
import EventList from "./components/EventList/EventList";
function App() {
  return (
    <main className="App">
      App
      <SignUp />
      <Login />
      <AddEvent />
      <Comments />
      <EventCategories />
      <EventDetail />
      <EventList />
    </main>
  );
}

export default App;
