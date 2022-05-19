import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@aws-amplify/ui-react/styles.css";

import {Amplify} from "aws-amplify";
import config from "./aws-exports";
import { AmplifyProvider } from "@aws-amplify/ui-react";

Amplify.configure(config);

ReactDOM.render(
  <AmplifyProvider>
    <App />
  </AmplifyProvider>,
  document.getElementById("root")
);
