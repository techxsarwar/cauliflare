import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/react';
import { Key, Plus, Trash2, Copy, RefreshCw, Check, X, ShieldCheck } from 'lucide-react';

const ApiKeysPage = () => {
  const { user } = useUser();
  const userId = user?.id || 'sarwar_admin';
  const userName = user?.firstName || user?.username || 'Sarwar';
  const storageKey = `cauliflare_user_keys_${userId}`;

  // Constant platform prefix: always sarwar_cauliflare
  const PREFIX_LIVE = 'cf_sarwar_cauliflare_live_';
  const PREFIX_TEST = 'cf_sarwar_cauliflare_test_';
  const PREFIX_DEV = 'cf_sarwar_cauliflare_dev_';

  // Default initial keys
  const defaultKeys = [
    {
      id: 1,
      name: `Sarwar - Production Key`,
      keyString: `cf_sarwar_cauliflare_live_x829a47f01b92c81d`,
      created: 'May 1, 2026',
      lastUsed: '2m ago',
      env: 'Production'
    },
    {
      id: 2,
      name: `Sarwar - Staging Key`,
      keyString: `cf_sarwar_cauliflare_test_b9102c38d49a71f02`,
      created: 'May 15, 2026',
      lastUsed: 'Never',
      env: 'Staging'
    }
  ];

  const [keys, setKeys] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Normalize any old keys to the standard cf_sarwar_cauliflare_ prefix
        return parsed.map(k => ({
          ...k,
          keyString: k.keyString.replace(/^cf_[a-z0-9_-]+_live_/, PREFIX_LIVE).replace(/^cf_[a-z0-9_-]+_test_/, PREFIX_TEST).replace(/^cf_[a-z0-9_-]+_dev_/, PREFIX_DEV)
        }));
      }
    } catch (e) {
      console.error(e);
    }
    return defaultKeys;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const normalized = parsed.map(k => ({
          ...k,
          keyString: k.keyString.replace(/^cf_[a-z0-9_-]+_live_/, PREFIX_LIVE).replace(/^cf_[a-z0-9_-]+_test_/, PREFIX_TEST).replace(/^cf_[a-z0-9_-]+_dev_/, PREFIX_DEV)
        }));
        setKeys(normalized);
        localStorage.setItem(storageKey, JSON.stringify(normalized));
      } else {
        setKeys(defaultKeys);
        localStorage.setItem(storageKey, JSON.stringify(defaultKeys));
      }
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  const saveKeys = (newKeys) => {
    setKeys(newKeys);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newKeys));
    } catch (e) {
      console.error(e);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyNameInput, setKeyNameInput] = useState('');
  const [keyEnvInput, setKeyEnvInput] = useState('Production');
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (id, keyString) => {
    navigator.clipboard.writeText(keyString);
    setCopiedId(id);
    showToast('API Key copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRotate = (id, name) => {
    const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const prefix = name.toLowerCase().includes('staging') || name.toLowerCase().includes('test') 
      ? PREFIX_TEST 
      : PREFIX_LIVE;
    const updatedString = prefix + randomHex;

    const updated = keys.map(k => k.id === id ? { ...k, keyString: updatedString, created: 'Just now' } : k);
    saveKeys(updated);
    showToast(`Rotated API key for "${name}"!`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to revoke and delete "${name}"?`)) {
      const updated = keys.filter(k => k.id !== id);
      saveKeys(updated);
      showToast(`Revoked API key "${name}"`);
    }
  };

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!keyNameInput.trim()) return;

    const prefix = keyEnvInput === 'Staging' 
      ? PREFIX_TEST 
      : keyEnvInput === 'Development' 
        ? PREFIX_DEV 
        : PREFIX_LIVE;
    const randomHex = Array.from({ length: 18 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const fullKey = prefix + randomHex;

    const newKeyObj = {
      id: Date.now(),
      name: keyNameInput.trim(),
      keyString: fullKey,
      created: 'Just now',
      lastUsed: 'Never',
      env: keyEnvInput
    };

    saveKeys([newKeyObj, ...keys]);
    setNewlyCreatedKey(fullKey);
    showToast(`Created API Key "${keyNameInput}"!`);
    setKeyNameInput('');
    setIsModalOpen(false);
  };

  const maskKey = (str) => {
    if (str.length <= 28) return str;
    return str.substring(0, 28) + '*****************';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
      
      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          padding: '12px 24px',
          border: '2px solid var(--on-surface)',
          boxShadow: '4px 4px 0px var(--on-surface)',
          zIndex: 1000,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="font-code-md">
          <ShieldCheck size={18} /> {toastMessage}
        </div>
      )}

      {/* NEW KEY CREATED ANNOUNCEMENT MODAL */}
      {newlyCreatedKey && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '560px',
            backgroundColor: 'var(--surface)',
            border: '3px solid var(--on-surface)',
            boxShadow: '10px 10px 0px var(--on-surface)',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="font-display-xl" style={{ fontSize: '24px', color: 'var(--primary)' }}>API KEY GENERATED</h3>
              <button onClick={() => setNewlyCreatedKey(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <p className="font-body-lg" style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--on-surface)' }}>
              Make sure to copy your API key now. For security purposes, you won't be able to view the full secret again.
            </p>
            <div style={{ backgroundColor: '#121212', padding: '14px 18px', border: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span className="font-code-md" style={{ color: '#00e676', wordBreak: 'break-all', fontSize: '14px' }}>{newlyCreatedKey}</span>
              <button 
                onClick={() => { navigator.clipboard.writeText(newlyCreatedKey); showToast('Copied to clipboard!'); }}
                className="press-button font-label-caps"
                style={{ padding: '6px 12px', backgroundColor: 'var(--primary)', color: '#ffffff', fontSize: '12px', border: '1px solid var(--on-surface)', cursor: 'pointer' }}
              >
                <Copy size={14} /> COPY
              </button>
            </div>
            <button 
              onClick={() => setNewlyCreatedKey(null)}
              className="press-button font-label-caps font-bold"
              style={{ width: '100%', padding: '12px', backgroundColor: 'var(--on-surface)', color: 'var(--surface)', border: '2px solid var(--on-surface)', cursor: 'pointer' }}
            >
              DONE / CLOSE
            </button>
          </div>
        </div>
      )}

      {/* CREATE KEY INPUT MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            backgroundColor: 'var(--surface)',
            border: '3px solid var(--on-surface)',
            boxShadow: '10px 10px 0px var(--on-surface)',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="font-display-xl" style={{ fontSize: '24px' }}>Create New API Key</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateKey} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>KEY NAME / DESCRIPTION</label>
                <input 
                  type="text" 
                  value={keyNameInput}
                  onChange={(e) => setKeyNameInput(e.target.value)}
                  placeholder="e.g. Production Server, Mobile App Client"
                  required
                  className="font-code-md"
                  style={{ width: '100%', padding: '12px 16px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none' }}
                />
              </div>

              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>ENVIRONMENT</label>
                <select 
                  value={keyEnvInput}
                  onChange={(e) => setKeyEnvInput(e.target.value)}
                  className="font-code-md"
                  style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', outline: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  <option value="Production">Production (cf_sarwar_cauliflare_live_...)</option>
                  <option value="Staging">Staging (cf_sarwar_cauliflare_test_...)</option>
                  <option value="Development">Development (cf_sarwar_cauliflare_dev_...)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="press-button font-label-caps"
                  style={{ flex: 1, padding: '12px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', cursor: 'pointer' }}
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="press-button font-label-caps font-bold"
                  style={{ flex: 1, padding: '12px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Plus size={16} /> GENERATE KEY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>API Keys</h1>
          <p className="font-body-lg" style={{ color: 'var(--on-surface)', opacity: 0.85, fontWeight: '600' }}>
            Manage authentication keys for <strong>Sarwar</strong> ({user?.primaryEmailAddress?.emailAddress || 'sarwar@cauliflare.in'}).
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="glow-button font-label-caps font-bold" 
          style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid var(--on-surface)', backgroundColor: 'var(--primary)', color: '#ffffff', cursor: 'pointer' }}
        >
          <Plus size={16} /> CREATE NEW KEY
        </button>
      </section>

      {/* KEYS LIST */}
      <section style={{ border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>ACTIVE SECRETS ({keys.length})</h2>
          <span className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>Authorization: Bearer YOUR_API_KEY</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {keys.length > 0 ? (
            keys.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderBottom: '2px solid var(--surface-container-high)', backgroundColor: 'var(--surface-container)', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="font-bold" style={{ fontSize: '16px' }}>{item.name}</span>
                    <span className="font-label-caps" style={{ 
                      fontSize: '10px', 
                      padding: '2px 8px', 
                      border: '1px solid var(--on-surface)', 
                      backgroundColor: item.env === 'Production' ? 'var(--primary-container)' : 'var(--surface-container-highest)', 
                      color: item.env === 'Production' ? 'var(--on-primary-container)' : 'var(--on-surface)' 
                    }}>
                      {item.env}
                    </span>
                  </div>
                  <div className="font-code-md" style={{ fontSize: '12px', color: 'var(--on-surface)', opacity: 0.7 }}>Created {item.created}</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#121212', padding: '8px 16px', border: '2px solid var(--on-surface)' }}>
                    <span className="font-code-md text-primary" style={{ fontSize: '13px' }}>{maskKey(item.keyString)}</span>
                    <button 
                      onClick={() => handleCopy(item.id, item.keyString)}
                      style={{ background: 'transparent', border: 'none', color: copiedId === item.id ? '#00e676' : '#ffffff', cursor: 'pointer', marginLeft: '16px', display: 'flex', alignItems: 'center' }} 
                      title="Copy Key"
                    >
                      {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  
                  <div style={{ fontSize: '12px', width: '110px', textAlign: 'right', color: 'var(--on-surface)', opacity: 0.85, fontWeight: 'bold' }}>
                    Last used: {item.lastUsed}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleRotate(item.id, item.name)}
                      style={{ padding: '8px', background: 'var(--surface)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                      title="Rotate Key"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.name)}
                      style={{ padding: '8px', background: 'var(--surface)', border: '2px solid var(--on-surface)', cursor: 'pointer', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                      title="Revoke / Delete Key"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '32px', textAlign: 'center' }} className="font-code-md text-on-surface-variant">
              No API keys generated. Click "CREATE NEW KEY" to create your first API secret.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ApiKeysPage;
