import React from "react";
import Chart from "./Chart";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Chart} />
          <Route component={NoMatchPage} />
        </Switch>
        <Redirect to="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
