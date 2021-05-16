import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Pokedex from './components/pokedex/Pokedex';
import Welcome from './components/welcome/Welcome';
import store from './store';

export const App: React.FC = (): JSX.Element => (

  <div className="container">
    <Provider store={ store }>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ Welcome } />
          <Route path="/pokedex" component={ Pokedex } />
          { /* Default route -- Redirect to welcome component */ }
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </div>

);

export default App;
