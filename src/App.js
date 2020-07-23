import React, { Component } from "react";
// import { browserHistory } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Fremskrivning } from "./Fremskrivning";
import { Annuitet } from "./Annuitet";
import { Pris } from "./Pris";
import { Optimering } from "./Optimering";
import { Optimering2 } from "./Optimering2";

import { Finans } from "./Finans";
import { f3 } from "./f3";
import { f4 } from "./f4";
import { f5 } from "./f5";
import { NoMatch } from "./NoMatch";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavigationBar";
import { Jumbotron } from "./components/Jumbotron";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/fremskrivning" component={Fremskrivning} />
              <Route path="/annuitet" component={Annuitet} />
              <Route path="/finans" component={Finans} />
              <Route path="/pris" component={Pris} />
              <Route path="/optimering" component={Optimering} />
              <Route path="/optimering2" component={Optimering2} />
              <Route path="/f3" component={f3} />
              <Route path="/f4" component={f4} />
              <Route path="/f5" component={f5} />
              <Route path="/*" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
