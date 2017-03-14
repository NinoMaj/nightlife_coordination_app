import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Login = (props, context) => (
  <Card className="container">
    <CardTitle title="Login" subtitle="This it the login page." />
  </Card>
);

export default Login;
