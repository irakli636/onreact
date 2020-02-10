import React from "react";
import { Switch, Route } from "react-router-dom";
import Shop from "./Shop";
import Cart from "./Cart";

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Shop} />
      <Route path="/cart" component={Cart} />
    </Switch>
  </main>
);

export default Routes;
