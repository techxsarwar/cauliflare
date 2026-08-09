import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "../clerk";

const TopNavBar = () => {
  return (
    <>
      <style>
        {`
          .top-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 32px;
            height: 80px;
            background: var(--surface);
            border-bottom: 2px solid var(--on-surface);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
          }

          .nav-center {
            display: flex;
            align-items: center;
            gap: 32px;
            height: 100%;
          }

          .nav-item {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            cursor: pointer;
          }

          .nav-link {
            text-decoration: none;
            color: var(--on-surface);
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: color 0.2s;
            font-size: 14px;
          }

          .nav-link:hover {
            color: var(--primary);
          }

          .dropdown-content {
            display: none;
            position: absolute;
            background-color: var(--surface);
            min-width: 240px;
            box-shadow: 4px 4px 0px var(--on-surface);
            border: 2px solid var(--on-surface);
            z-index: 100;
            top: 100%;
            left: 0;
            padding: 8px 0;
            flex-direction: column;
          }

          .nav-item:hover .dropdown-content {
            display: flex;
          }

          .dropdown-content a {
            color: var(--on-surface);
            padding: 12px 16px;
            text-decoration: none;
            font-weight: bold;
            border-left: 2px solid transparent;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .dropdown-content a:hover {
            background-color: var(--surface-container-high);
            color: var(--primary);
            border-left: 4px solid var(--primary);
            padding-left: 20px;
          }

          .nav-right {
            display: flex;
            align-items: center;
            gap: 24px;
            height: 100%;
          }

          .glow-button {
            background: var(--primary);
            color: var(--on-primary);
            box-shadow: 0 0 15px rgba(217, 255, 0, 0.4);
            border: 2px solid var(--on-surface);
            padding: 12px 24px;
            text-transform: uppercase;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .glow-button:hover {
            box-shadow: 0 0 25px rgba(217, 255, 0, 0.8);
            transform: translateY(-2px);
          }
          
          .status-indicator {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            border: 2px solid var(--on-surface);
            background: var(--surface-container);
            transition: all 0.2s;
          }

          .status-indicator:hover {
            background: var(--on-surface);
            color: var(--surface);
          }

          .status-dot {
            width: 8px;
            height: 8px;
            background-color: #00ff00;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px #00ff00;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(0, 255, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
          }
        `}
      </style>
      <nav className="top-nav">
        {/* LEFT: LOGO + CENTER NAV CONTAINER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', height: '100%' }}>
          <Link to="/" className="font-display-xl" style={{ textDecoration: 'none', color: 'var(--on-surface)', fontSize: '24px' }}>
            CAULIFLARE
          </Link>

          {/* CENTER: NAVIGATION */}
          <div className="nav-center font-label-caps">
            
            <div className="nav-item">
              <span className="nav-link">PRODUCTS ▾</span>
              <div className="dropdown-content">
                <Link to="/products/scam-detection">Scam Detection</Link>
                <Link to="/products/search-api">Search API</Link>
                <Link to="/products/url-scanner">URL Scanner</Link>
                <Link to="/products/temp-mail">Temp Mail Detection</Link>
                <Link to="/products/ai-moderation">AI Moderation</Link>
              </div>
            </div>

            <div className="nav-item">
              <span className="nav-link">DEVELOPERS ▾</span>
              <div className="dropdown-content">
                <Link to="/docs">Documentation</Link>
                <a href="/docs#endpoints">API Reference</a>
                <a href="/docs#sdk-examples">SDKs</a>
                <Link to="/status">Status</Link>
                <a href="https://github.com/techxsarwar/cauliflare">GitHub</a>
                <Link to="/changelog">Changelog</Link>
              </div>
            </div>

            <div className="nav-item">
              <Link to="/pricing" className="nav-link">FREE TIER ($0)</Link>
            </div>

            <div className="nav-item">
              <a href="https://github.com/techxsarwar/cauliflare" className="nav-link">OPEN SOURCE</a>
            </div>

            <div className="nav-item">
              <span className="nav-link">RESOURCES ▾</span>
              <div className="dropdown-content">
                <Link to="/company/blog">Blog</Link>
                <Link to="/company/about">Research</Link>
                <Link to="/legal/security">Trust Center</Link>
                <Link to="/company/contact">Community</Link>
                <Link to="/company/contact">Contact</Link>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="nav-right font-label-caps">
          
          <Link to="/status" className="status-indicator" style={{ textDecoration: 'none', color: 'inherit', border: 'none', background: 'transparent', padding: '8px' }} title="Systems Operational">
            <span className="status-dot"></span>
          </Link>

          <div style={{ cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface)" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="nav-link" style={{ fontSize: '14px', marginLeft: '8px', marginRight: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--on-surface)', letterSpacing: '0.5px' }}>SIGN IN</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ elements: { userButtonAvatarBox: { border: '2px solid var(--on-surface)', borderRadius: '0', width: '32px', height: '32px' } } }} />
          </SignedIn>
          
          <SignedIn>
            <Link to="/dashboard/keys" className="glow-button font-label-caps font-code-md" style={{ textDecoration: 'none', display: 'inline-block' }}>Get API Key</Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="glow-button font-label-caps font-code-md" style={{ cursor: 'pointer' }}>Get API Key</button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </>
  );
};

export default TopNavBar;
