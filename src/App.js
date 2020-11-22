import React, { Component } from "react";
// import { browserHistory } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { rente } from "./rente";
import { test1 } from "./test1";
import { staaende } from "./staaende";
import { invest } from "./invest";
import { Optimering } from "./Optimering";
import { fin2020 } from "./fin2020";
import { Finans } from "./Finans";
import { ann } from "./ann";
import { kassekredit } from "./kassekredit";
import { kredit } from "./kredit";
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
              <Route exact path="/" component={rente} />
              <Route path="/test1" component={test1} />
              <Route path="/staaende" component={staaende} />
              <Route path="/finans" component={Finans} />
              <Route path="/invest" component={invest} />
              <Route path="/optimering" component={Optimering} />
              <Route path="/fin2020" component={fin2020} />
              <Route path="/ann" component={ann} />
              <Route path="/kassekredit" component={kassekredit} />
              <Route path="/kredit" component={kredit} />
              <Route path="/serie" component={serie} />
              <Route path="/*" component={rente} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
