import "./App.css";

import { Provider } from "./lib/context";

import Display from "./components/Display";
import List from "./components/List";

function App() {
  return (
    <div className="App">
      <main>
        <Provider>
          <Display />
          <List />
        </Provider>
      </main>
    </div>
  );
}

export default App;
