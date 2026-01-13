// hooks/useProfile.js
import { useQuery } from "@tanstack/react-query";
import api from '../services/api';

// Asumsi kamu punya cara ambil token, misalnya dari localStorage atau AuthContext.
// Jika pakai context, import dan gunakan di sini.
const getAuthToken = () => localStorage.getItem('token'); // Ganti sesuai implementasimu.

const useProfile = () => {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      try {
        // Tambah header auth jika diperlukan
        const token = getAuthToken();
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        // Log URL request untuk debug
        console.log('Fetching profile from:', api.defaults.baseURL + '/api/profile/me');

        const res = await api.get('/api/profile/me', config); // Ganti endpoint jika salah, misal '/profile/me'
        
        // Log response untuk debug
        console.log('Profile response:', res.data);
        
        return res.data.data; // Asumsi struktur response { data: { data: ... } }
      } catch (error) {
        console.error('Error fetching profile:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        
        // Handle spesifik untuk 404
        if (error.response?.status === 404) {
          throw new Error('Profil tidak ditemukan. Pastikan endpoint benar atau user sudah login.');
        }
        
        throw new Error(error.response?.data?.error || 'Gagal memuat profil');
      }
    },
    staleTime: 1000 * 60 * 5, // 5 menit
    retry: 2, // Retry 2 kali jika gagal
    refetchOnWindowFocus: false,
  });
};

export default useProfile;