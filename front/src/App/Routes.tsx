import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import NavbarComponent from "../shared/components/NavbarComponent";
import router from "../shared/router";

const Routes: React.FC = () => (
    <Router history={router}>
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Switch>

        <Route path="/" component={NavbarComponent} />
    </Router>
);

export default Routes;
