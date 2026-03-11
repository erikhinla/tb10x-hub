import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SocialAssetHub from "./pages/SocialAssetHub";
import ContentIndexPage from "./pages/ContentIndexPage";
import ContentEntryPage from "./pages/ContentEntryPage";
import WinPage from "./pages/WinPage";
import FlowAgentPage from "./pages/FlowAgentPage";
import BizBotMarketingPage from "./pages/BizBotMarketingPage";
import BizBuildersAIPage from "./pages/BizBuildersAIPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/social-assets" element={<SocialAssetHub />} />
      <Route path="/daily-truth" element={<ContentIndexPage series="daily-truth" />} />
      <Route path="/daily-truth/:slug" element={<ContentEntryPage series="daily-truth" />} />
      <Route path="/architecture-files" element={<ContentIndexPage series="architecture-files" />} />
      <Route path="/architecture-files/:slug" element={<ContentEntryPage series="architecture-files" />} />
      <Route path="/false-belief-systems" element={<ContentIndexPage series="false-belief-systems" />} />
      <Route path="/false-belief-systems/:slug" element={<ContentEntryPage series="false-belief-systems" />} />

      {/* === NEW PAGES === */}
      <Route path="/win" element={<WinPage />} />
      <Route path="/flow-agent" element={<FlowAgentPage />} />
      <Route path="/bizbot-marketing" element={<BizBotMarketingPage />} />
      <Route path="/bizbuilders-ai" element={<BizBuildersAIPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
