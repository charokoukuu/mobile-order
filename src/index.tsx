import React from "react";
import ReactDOM from "react-dom/client";
import "./views/styles/index.css";
import reportWebVitals from "./reportWebVitals";
import Router from "./router";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://c70cec8043cf4343b227e3a17087e16d@o4504265411526656.ingest.sentry.io/4504265413820416",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Router />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
