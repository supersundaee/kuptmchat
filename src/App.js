import React, { Component } from 'react';
import { Button, Spacer, NextUIProvider, createTheme } from "@nextui-org/react";
import Login from "./component/login";
import Home from "./component/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const darkTheme = createTheme({
  type: 'dark',
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      user: null
    }
  }
  UNSAFE_componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ authenticated: true, user })
    }
  }
  isLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ authenticated: true, user })
  }
  isLogout = () => {
    localStorage.removeItem("user")
    this.setState({ authenticated: false, user: null })
  }

  render() {
    return (
      <NextUIProvider theme={darkTheme}>
        <Router basename='/project/kuptmchat/'>
          <Switch>
            <Route exact path="/">
              {this.state.authenticated === true
                ? <Redirect to='/chat' />
                : <Login isLogin={this.isLogin} />
              }
            </Route>
            <PrivateRoute
              path="/chat"
              authenticated={this.state.authenticated}
              component={() => <Home user={this.state.user} logout={this.isLogout} />}
            />
          </Switch>
        </Router>
      </NextUIProvider>
    );
  }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}
export default App;
