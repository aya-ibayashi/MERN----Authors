import React from 'react';
import './App.css';
import NewAuthor from './views/newAuthor'
import { Router } from '@reach/router'
import Main from './views/main'
import EditAuthor from "../src/views/editAuthor"

function App() {

  return (
    <div className="App">
      <h1>This is Home</h1>
      <Router style={{display:"flex", flexDirection:"column"}} basepath="authors">
        <NewAuthor path="/new"/>
        <Main path="/"/>
        <EditAuthor path="/edit/:id"/>
      </Router>
    </div>
  );
}

export default App;
