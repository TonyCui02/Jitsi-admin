import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@aws-amplify/ui-react/styles.css";

import { Amplify, Storage } from "aws-amplify";
import config from "./aws-exports";
import { AmplifyProvider } from "@aws-amplify/ui-react";

Amplify.configure(config);
Storage.configure({
  customPrefix: {
    public: "",
    protected: "protected/",
    private: "private/",
  },
});

ReactDOM.render(
  <AmplifyProvider>
    <App />
  </AmplifyProvider>,
  document.getElementById("root")
);
