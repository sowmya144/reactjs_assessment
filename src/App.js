import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Counter from "./components/Counter";
import Github from "./components/Github";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Github />
      </div>
    );
  }
}

export default App;
