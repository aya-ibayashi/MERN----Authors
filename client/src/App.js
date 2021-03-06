import React from 'react';
import './App.css';
import { Router, Link, navigate } from '@reach/router'
import NewAuthor from '../src/views/newAuthor'
import EditAuthor from '../src/views/editAuthor'
import Main from '../src/views/main'
import GroupList from '../src/views/groupList'
import RegistrationForm from '../src/views/register'
import Login from '../src/views/login'
import axios from 'axios'

function App() {

  return (
    <div style={{backgroundColor:"pink", width:700, margin: "0 auto"}}className="App">
        <h3><Link to="/authors/">Manage Authors</Link> | {" "} 
        <Link to="/status/groups/1">Manage Author Status</Link></h3>
        <Router basepath="status/groups">
          <GroupList path="/:num"/>
        </Router>
        <Router style={{display:"flex", flexDirection:"column"}} basepath="authors">
          <NewAuthor path="/new"/>
          <Main path="/"/>
          <EditAuthor path="/edit/:id"/>
        </Router>
        <Router>
          <RegistrationForm path="/register/"/>
          <Login path="/login"/>
        </Router>
    </div>
  );
}

export default App;
