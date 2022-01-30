import React from 'react';
import '../App.css';
import Navbar from './NavLinks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Stock from '../Stock';
import Crypto from "../Crypto";
import SignIn from "../SignIn";
import Register from "../Register";
import MarketData from "../MarketData";



function ReactRouter() {
  return (
      <Router>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/crypto' component={Crypto} />
            <Route path='/stockData' component={Stock} />
            <Route path='/sign_in' component={SignIn} />
            <Route path='/register' component={Register} />
            <Route path='/marketData' component={MarketData} />
        </Switch>
      </Router>
  );
}

export default ReactRouter;
