
import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import MyFirstComponent from './component/MyFirstComponent';
import MySecondComponent from './component/MySecondComponent';
import MyThirdComponent from './component/MyThirdComponent';
import DigitalClock from './digitalClock';
import ApiCall from './apiCall';
import CovidCard from './component/covidCard';
import MaterialHome from './material-example/material-home';


export default class Routes extends Component {
    render() {
        return (
        <div>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <MyFirstComponent />
                </Route>

                {/* Second Routing */}
                {/* exact instruct exact path with exact link name/url */}
                <Route path="/MySecondComponent" exact>
                    <MySecondComponent/>
                </Route>

                <Route path="/MyThirdComponent" exact>
                    <MyThirdComponent/>
                </Route>

                {/* Digital Clock */}
                <Route path="/digitalClock" exact>
                    <DigitalClock />
                </Route>

                {/* ApiCall Route */}
                <Route path="/api-Call" exact>
                    <ApiCall />
                </Route>

                {/* dynamic Route  with any id --numbers, strings and its value */}
                <Route path="/dynamicRoute/:id/:value" exact>
                    <MySecondComponent />
                </Route>

                {/* Route for Simple Material UI example */}
                <Route path="/mui" exact>
                    <MaterialHome />
                </Route>


          </Switch>
        </Router>
        </div>
        );
    }
}
