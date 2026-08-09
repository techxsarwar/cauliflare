import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import ReportsPage from './pages/ReportsPage';
import ArchivePage from './pages/ArchivePage';
import EditionsPage from './pages/EditionsPage';
import ApiDocsPage from './pages/ApiDocsPage';
import GenericPage from './pages/GenericPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SignInPage from './pages/SignInPage';
import StatusPage from './pages/StatusPage';
import TempMailProductPage from './pages/TempMailProductPage';

// Dashboard Pages
import DashboardIndex from './pages/dashboard/DashboardIndex';
import ApiKeysPage from './pages/dashboard/ApiKeysPage';
import PlaygroundPage from './pages/dashboard/PlaygroundPage';
import LogsPage from './pages/dashboard/LogsPage';
import ThreatsPage from './pages/dashboard/ThreatsPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import BillingPage from './pages/dashboard/BillingPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/editions" element={<EditionsPage />} />
          <Route path="/docs" element={<ApiDocsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/company/status" element={<StatusPage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignInPage />} />
          <Route path="/login" element={<Navigate to="/sign-in" replace />} />
          
          {/* Products */}
          <Route path="/products/scam-detection" element={<GenericPage title="Scam Detection" tag="PRODUCT" description="Advanced scam detection API powered by AI." />} />
          <Route path="/products/url-scanner" element={<GenericPage title="URL Scanner" tag="PRODUCT" description="Real-time URL threat intelligence and analysis." />} />
          <Route path="/products/search-api" element={<GenericPage title="Search API" tag="PRODUCT" description="Search through our massive database of flagged infrastructure." />} />
          <Route path="/products/temp-mail" element={<TempMailProductPage />} />
          <Route path="/products/ai-moderation" element={<GenericPage title="AI Moderation" tag="PRODUCT" description="Automated content moderation for modern platforms." />} />

          {/* Company */}
          <Route path="/company/about" element={<GenericPage title="About Cauliflare" tag="COMPANY" description="We build infrastructure APIs for the modern internet." />} />
          <Route path="/company/blog" element={<GenericPage title="Cauliflare Blog" tag="COMPANY" description="Latest news, updates, and threat research." />} />
          <Route path="/company/careers" element={<GenericPage title="Careers" tag="COMPANY" description="Join us in securing the web." />} />
          <Route path="/company/contact" element={<GenericPage title="Contact Us" tag="COMPANY" description="Get in touch with our enterprise sales and support teams." />} />

          {/* Legal */}
          <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/legal/terms" element={<GenericPage title="Terms of Service" tag="LEGAL" />} />
          <Route path="/legal/security" element={<GenericPage title="Security" tag="LEGAL" description="How we secure our infrastructure and your data." />} />

          {/* Developers */}
          <Route path="/changelog" element={<GenericPage title="Changelog" tag="DEVELOPERS" description="Track API updates and new features." />} />
        </Route>

        {/* DASHBOARD ROUTES — PROTECTED BY CLERK AUTH */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardIndex />} />
          <Route path="keys" element={<ApiKeysPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="threats" element={<ThreatsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="billing" element={<BillingPage />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
