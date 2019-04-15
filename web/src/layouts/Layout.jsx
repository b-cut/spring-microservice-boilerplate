import React from 'react';
import ReactPropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { observer, inject, PropTypes } from 'mobx-react';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Navbar from '../material_kit/components/Navbar/Navbar';
import Sidebar from '../material_kit/components/Sidebar/Sidebar';
import routes from '../routes';

import dashboardStyle from '../styles/jss/containers/dashboardStyle';
import logo from '../material_kit/assets/img/reactlogo.png';
import backImg from '../material_kit/assets/img/bg.jpg';

const switchRoutes = (
  <Switch>
    {routes.map(route => (
      <Route
        path={route.path}
        exact
        component={route.component}
        key={route.path}
        {...route}
      />
    ))}
  </Switch>
);

@inject('authorization')
@observer
class Layout extends React.Component {
  render() {
    const { authorization, classes, ...rest } = this.props;
    if (!authorization.authorized) {
      return <Redirect to="/login" />;
    }
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText="SaintDan"
          logo={logo}
          image={backImg}
          handleDrawerToggle={this.handleDrawerToggle}
          open={false}
          color={classes.primaryColor}
          {...rest}
        />
        <div className={classes.mainPanel} ref={(r) => { this.mainPanel = r; }}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        </div>
      </div>
    );
  }
}
Layout.propTypes = {
  children: ReactPropTypes.element.isRequired,
  classes: ReactPropTypes.shape().isRequired,
  location: ReactPropTypes.shape({
    pathname: ReactPropTypes.string,
  }).isRequired,
};

Layout.wrappedComponent.propTypes = {
  authorization: PropTypes.observableObject.isRequired,
};

export default withStyles(dashboardStyle)(Layout);
