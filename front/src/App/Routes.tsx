import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import router from "../shared/router";

const Routes: React.FC = () => (
    <Router history={router}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
    </Router>
);

export default Routes;
