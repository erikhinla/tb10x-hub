import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SocialAssetHub from "./pages/SocialAssetHub";
import ContentIndexPage from "./pages/ContentIndexPage";
import ContentEntryPage from "./pages/ContentEntryPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/social-assets" element={<SocialAssetHub />} />
      <Route path="/daily-truth" element={<ContentIndexPage series="daily-truth" />} />
      <Route path="/daily-truth/:slug" element={<ContentEntryPage series="daily-truth" />} />
      <Route
        path="/architecture-files"
        element={<ContentIndexPage series="architecture-files" />}
      />
      <Route
        path="/architecture-files/:slug"
        element={<ContentEntryPage series="architecture-files" />}
      />
      <Route
        path="/false-belief-systems"
        element={<ContentIndexPage series="false-belief-systems" />}
      />
      <Route
        path="/false-belief-systems/:slug"
        element={<ContentEntryPage series="false-belief-systems" />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
