import React, { Suspense } from "react";
import "./App.css";
import "./i18n";

import { Provider } from "./lib/context";

import Display from "./components/Display";
import List from "./components/List";
import LangSelect from "./lib/LangSelect";

function App() {
  return (
    <div className="App">
      <main>
        <Suspense fallback={null}>
          <Provider>
            <LangSelect />
            <Display />
            <List />
          </Provider>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
