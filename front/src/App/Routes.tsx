import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import NavbarComponent from "../shared/components/NavbarComponent";
import router from "../shared/router";
import Guard from "./Guard";

const Routes: React.FC = () => (
    <Router history={router}>
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Switch>

        <Guard>
            <Route path="/" component={NavbarComponent} />
        </Guard>
    </Router>
);

export default Routes;
