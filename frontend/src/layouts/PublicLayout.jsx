import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

const PublicLayout = () => {
  return (
    <>
      <TopNavBar />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
