
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log(' API URL:', API_URL);


export const IMAGES = {
  background: 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg',
  logo: 'https://storage.123fakturera.se/public/icons/diamond.png',
  flags: {
    sv: 'https://storage.123fakturere.no/public/flags/SE.png',
    en: 'https://storage.123fakturere.no/public/flags/GB.png'
  }
};

export const ROUTES = {
  LOGIN: '/login',
  TERMS: '/terms',
  PRICELIST: '/pricelist',
  HOME: '/'
};