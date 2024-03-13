import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from './components/HomePage';
import StudentRoute from './components/StudentRoute';


function App() {
  return (
    <Router>
    <div className="App text-start">
      <Route path="/home" component={HomePage} />
      <Route path="/student" component={StudentRoute} />
      <Route exact path="/" render={() => { return (<Redirect to="/home"/>  ) }} />
    </div>
  </Router>
  );
}

export default App;
