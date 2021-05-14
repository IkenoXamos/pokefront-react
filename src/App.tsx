import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Pokedex from './components/pokedex/Pokedex';
import Welcome from './components/welcome/Welcome';

export const App: React.FC = (): JSX.Element => (
  <Router>
    <div className="container">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/pokedex">
          <Pokedex />
        </Route>
        <Route path="/welcome">
          <Redirect to="/" />
        </Route>
        {/* Default route -- Redirect to welcome component */}
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
