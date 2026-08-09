import React from 'react';
import HeroSection from '../components/HeroSection';
import MetricsBar from '../components/MetricsBar';
import FeatureGrid from '../components/FeatureGrid';
import NetworkGlobal from '../components/NetworkGlobal';
import CodeSection from '../components/CodeSection';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <MetricsBar />
      <FeatureGrid />
      <NetworkGlobal />
      <CodeSection />
    </>
  );
};

export default LandingPage;
