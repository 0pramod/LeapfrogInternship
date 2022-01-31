import logo from "./logo.svg";
import "./App.css";
import Component1 from "./Component1";
import Component2 from "./Component2";
import { States } from "./states";

function App() {
  const colorChange = {
    backgroundColor: "red",
  };

  return (
    <div style={colorChange} className="App">
      <header className="App-header" style={{ color: "brown" }}>
        <States />
      </header>
    </div>
  );
}

export default App;
