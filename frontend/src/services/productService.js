import api from './api';

const productService = {
  getAllProducts: async () => {
    const response = await api.get('/pricelist/products');
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/pricelist/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/pricelist/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/pricelist/products/${id}`, productData);
    return response.data;
  },

  partialUpdateProduct: async (id, updates) => {
    const response = await api.patch(`/pricelist/products/${id}`, updates);
    return response.data;
  },

  bulkUpdateProducts: async (products) => {
    const response = await api.put('/pricelist/products', { products });
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/pricelist/products/${id}`);
    return response.data;
  }
};

export default productService;