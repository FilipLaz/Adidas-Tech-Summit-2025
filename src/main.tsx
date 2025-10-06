import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/index.css";
import SignUpPage from "./signup.page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
