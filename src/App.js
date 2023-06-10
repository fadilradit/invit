import React, {Component} from "react";
import {BrowserRouter, Route, HashRouter, Switch} from 'react-router-dom'

import Home from "./Page/Home/Home"
import Invite from "./Page/Invite/Invite";
import Dashboard from "./Page/Dashboard/Dashboard";

class App extends Component{


  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path = "/" exact component = {Home} />
          <Route path = "/dashboard" component = {Dashboard} />
          <Route path = "/invite/:visitor" component = {Invite} />
        </Switch>
      </HashRouter>

      // <BrowserRouter>
      //   <Route path = "/" exact component = {Home} />
      //     <Route path = "/dashboard" component = {Dashboard} />
      //     <Route path = "/invite/:visitor" component = {Invite} />
      // </BrowserRouter>
    )
  }


}

export default App;