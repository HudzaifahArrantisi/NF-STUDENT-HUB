// src/utils/profileUtils.js
export const getProfilePhotoUrl = (photoPath) => {
  if (!photoPath) return null;
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  
  // Jika photoPath sudah full URL, return langsung
  if (photoPath.startsWith('http')) {
    return photoPath;
  }
  
  // Jika photoPath relative, gabungkan dengan API_URL
  // Pastikan path diawali dengan slash
  const normalizedPath = photoPath.startsWith('/') ? photoPath : `/${photoPath}`;
  return `${API_URL}${normalizedPath}`;
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name.charAt(0).toUpperCase();
};

export const cleanUsername = (username) => {
  if (!username) return '';
  return username.toLowerCase()
    .replace(/^ormawa_/, '')
    .replace(/^ukm_/, '')
    .replace(/^admin_/, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .trim();
};