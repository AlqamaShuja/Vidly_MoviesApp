import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './component/Movies';
import Customers from './component/customer';
import Rentals from './component/rentals';
import NotFound from './component/notFound';
import NavBar from './component/navBar';
import MovieForm from './component/movieForm'
import LoginForm from './component/loginForm';
import Logout from './component/logout';
import Register from './component/register';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


class App extends Component {
  state = { user: "" };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
