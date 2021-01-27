import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//auth component
import Login from "./authComponent/Login";
import Signin from "./authComponent/Signin";

//main component
import Home from "./mainComponent/Home";

const App = () => {
    return(
        <div>
            <div>{/* SVG Image Here */}</div>
            <div>
                <Router>
                    <Switch>
                        <Route path = "/" exact> <Signin /> </Route>
                        <Route path = "/login"> <Login /> </Route>
                        <Route path = "/home"><Home /></Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;