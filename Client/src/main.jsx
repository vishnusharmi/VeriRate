import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import "./index.css";
import AuthProvider from "./components/Context/Contextapi.jsx";
import { CompanyProvider } from "./components/Context/CompanyContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CompanyProvider>
        <ToastContainer position="top-right" autoClose={3000} />
          <App />
        </CompanyProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

