import React from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

import Routes from "./Routes";

const App = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">მთავარი გვერდი</Link>
        </li>
        <li>
          <Link to="/cart">საყიდლები</Link>
        </li>
      </ul>
    </nav>
    <Routes />
  </div>
);

export default App;
