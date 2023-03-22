import "./App.css";
import "./styles.css";
import Students from "./components/students";
import ListSightings from "./components/ListSightings";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Animal Sighting Tracker</h1>
      </header>
      <main>
        <ListSightings />
      </main>
      {/* <Students /> */}
    </div>
  );
}

export default App;
