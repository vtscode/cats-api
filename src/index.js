import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import reportWebVitals from "./reportWebVitals";
import "./config/global.css";

const LazyApp = lazy(() => import("./pages/homepages"));
const root = document.getElementById("root");

const globalStyle = {
  loading: {
    margin: "0px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
};

const Application = (
  <BrowserRouter>
    <Suspense fallback={<Spin size="large" style={globalStyle.loading} />}>
      <Routes>
        <Route path="/" element={<LazyApp />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root).render(Application);
} else {
  ReactDOM.createRoot(root).render(Application);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
