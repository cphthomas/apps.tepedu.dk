import React, { Component } from "react";
// import { browserHistory } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Fremskrivning } from "./Fremskrivning";
import { staaende } from "./staaende";
// import { Pris } from "./Pris";
import { Optimering } from "./Optimering";
import { fin2020 } from "./fin2020";

import { Finans } from "./Finans";
import { annuitet } from "./annuitet";
import { f4 } from "./f4";
import { serie } from "./serie";
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
              <Route path="/staaende" component={staaende} />
              <Route path="/finans" component={Finans} />
              <Route path="/pris" component={annuitet} />
              <Route path="/optimering" component={Optimering} />
              <Route path="/fin2020" component={fin2020} />
              <Route path="/annuitet" component={annuitet} />
              <Route path="/f4" component={f4} />
              <Route path="/serie" component={serie} />
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
