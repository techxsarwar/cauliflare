import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, RedirectToSignIn } from '../clerk';
import { 
  LayoutDashboard, 
  Key, 
  BarChart3, 
  Activity, 
  ShieldAlert, 
  Search, 
  Settings, 
  CreditCard, 
  BookOpen,
  Bell
} from 'lucide-react';

const DashboardLayoutContent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = currentPath === to;
    return (
      <Link to={to} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        textDecoration: 'none',
        color: isActive ? 'var(--surface)' : 'var(--on-surface)',
        backgroundColor: isActive ? 'var(--on-surface)' : 'transparent',
        border: '2px solid transparent',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
      }}
      className={isActive ? '' : 'dash-nav-hover'}
      >
        <Icon size={20} />
        <span className="font-label-caps" style={{ fontSize: '14px' }}>{label}</span>
      </Link>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--surface-container-lowest)' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--surface)',
        borderRight: '3px solid var(--on-surface)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100
      }}>
        <div style={{ padding: '24px', borderBottom: '3px solid var(--on-surface)', height: '72px', display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="font-display-xl" style={{ textDecoration: 'none', color: 'var(--on-surface)', fontSize: '24px' }}>
            CAULIFLARE
          </Link>
        </div>
        
        <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
          <div className="font-label-caps" style={{ fontSize: '12px', paddingLeft: '16px', marginBottom: '8px', color: 'var(--on-surface)', fontWeight: '800', opacity: 0.8 }}>MAIN</div>
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/dashboard/keys" icon={Key} label="API Keys" />
          <NavItem to="/dashboard/playground" icon={Activity} label="Playground" />
          
          <div className="font-label-caps" style={{ fontSize: '12px', paddingLeft: '16px', marginTop: '24px', marginBottom: '8px', color: 'var(--on-surface)', fontWeight: '800', opacity: 0.8 }}>OBSERVABILITY</div>
          <NavItem to="/dashboard/logs" icon={Search} label="Request Logs" />
          <NavItem to="/dashboard/threats" icon={ShieldAlert} label="Threat Logs" />
          <NavItem to="/dashboard/analytics" icon={BarChart3} label="Analytics" />

          <div className="font-label-caps" style={{ fontSize: '12px', paddingLeft: '16px', marginTop: '24px', marginBottom: '8px', color: 'var(--on-surface)', fontWeight: '800', opacity: 0.8 }}>ACCOUNT</div>
          <NavItem to="/dashboard/settings" icon={Settings} label="Settings" />
          <NavItem to="/dashboard/billing" icon={CreditCard} label="Billing" />
          
          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <NavItem to="/docs" icon={BookOpen} label="Documentation" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        
        {/* TOPBAR */}
        <header style={{
          height: '72px',
          backgroundColor: 'var(--surface)',
          borderBottom: '3px solid var(--on-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          
          {/* Topbar Left (Search) */}
          <div style={{ display: 'flex', alignItems: 'center', width: '320px', border: '2px solid var(--on-surface)', backgroundColor: 'var(--surface-container-lowest)', padding: '8px 16px', gap: '10px', boxShadow: '2px 2px 0px var(--on-surface)' }}>
            <Search size={18} style={{ color: 'var(--on-surface)' }} />
            <input 
              type="text" 
              placeholder="Search logs, keys..." 
              style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--on-surface)', width: '100%', fontFamily: '"Inter", sans-serif', fontWeight: '600' }} 
            />
          </div>

          {/* Topbar Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a 
              href="https://github.com/techxsarwar/cauliflare" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="press-button font-label-caps font-bold"
              style={{ padding: '6px 12px', fontSize: '11px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg> GITHUB REPO
            </a>

            <Link to="/status" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid var(--on-surface)', padding: '6px 12px', backgroundColor: 'var(--surface-container)' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#00ff00', borderRadius: '50%', boxShadow: '0 0 8px #00ff00' }}></span>
              <span className="font-label-caps" style={{ fontSize: '10px', fontWeight: 'bold' }}>ALL SYSTEMS OPERATIONAL</span>
            </Link>

            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Bell size={20} className="text-on-surface" />
            </button>

            <div style={{ borderLeft: '2px solid var(--on-surface)', height: '32px' }}></div>
            
            <UserButton appearance={{ elements: { userButtonAvatarBox: { border: '2px solid var(--on-surface)', borderRadius: '0', width: '36px', height: '36px' } } }} />
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main style={{ padding: '32px', flex: 1, overflowX: 'hidden' }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
};

const DashboardLayout = () => {
  return <DashboardLayoutContent />;
};

export default DashboardLayout;
