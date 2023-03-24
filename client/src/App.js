import "./App.css";
import "./styles.css";
import ListSightings from "./components/ListSightings";
import AddSighting from "./components/AddSighting";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Animal Sighting Tracker</h1>
      </header>
      <main>
        <AddSighting />
        <ListSightings />
      </main>
    </div>
  );
}

export default App;
