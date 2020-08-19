import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./routes/privateRoute";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/profile/Profile";
import Weight from "./components/weight/Weight";
import Meal from "./components/meal/Meal";
import Activity from "./components/activity/Activity";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/weight">
          <Weight />
        </PrivateRoute>
        <PrivateRoute path="/meal">
          <Meal />
        </PrivateRoute>
        <PrivateRoute path="/activity">
          <Activity />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
