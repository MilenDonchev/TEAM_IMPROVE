import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './Home/Home';

const MainNavigator = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default MainNavigator;