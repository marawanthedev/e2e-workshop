import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import KeysLab from "./components/KeysLab";
import "./styles/app.css";

// Open /?lab=keys for the keys and Profiler lab
const isLab = new URLSearchParams(window.location.search).get("lab") === "keys";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isLab ? (
      <main className="main">
        <KeysLab />
      </main>
    ) : (
      <App />
    )}
  </StrictMode>,
);
