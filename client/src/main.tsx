import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const server = "https://careerai-220z.onrender.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <GoogleOAuthProvider clientId="644202966738-lkktrq44jtdqsc19kku780jar55jqb7i.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
);
