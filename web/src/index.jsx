import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import * as stores from './stores';
import { authHydrate } from './utils/localPersist';
import Layout from './layouts/Layout';
import Login from './containers/login';

import './material_kit/assets/scss/material-kit-react.scss';

const history = createBrowserHistory();

authHydrate('Authorization', stores.authorization);

function App() {
  return (
    <Provider {...stores}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Layout />
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));

process.env.NODE_ENV !== 'prod' && module.hot && module.hot.accept();
