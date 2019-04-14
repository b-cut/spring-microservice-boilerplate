import Dashboard from '@material-ui/icons/Dashboard';
import Login from '../containers/login';

const routes = [
  {
    path: '/login',
    name: 'Login',
    icon: Dashboard,
    component: Login,
    layout: '/admin',
  },
];

export default routes;
