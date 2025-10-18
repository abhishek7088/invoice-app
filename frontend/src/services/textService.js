import api from './api';

const textService = {
  getAllTexts: async () => {
    const response = await api.get('/texts');
    return response.data;
  },

  getPageTexts: async (page, language) => {
    const response = await api.get(`/texts/${page}/${language}`);
    return response.data;
  }
};

export default textService;