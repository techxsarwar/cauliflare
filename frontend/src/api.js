// Centralized API configuration helper for Cauliflare
// Dynamically resolves API endpoints for Local Development & Production Vercel/Render deployments

const PRODUCTION_RENDER_BACKEND = 'https://cauliflare-backend.onrender.com';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? '' 
    : PRODUCTION_RENDER_BACKEND);

export const getApiUrl = (path) => {
  if (!path) return API_BASE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};
