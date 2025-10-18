import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import productService from '../services/productService';
import Layout from '../components/Layout';
import '../styles/layout.css';
import '../styles/pricelist.css';

const Pricelist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  
  const { language } = useLanguage();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleCellChange = (productId, field, value) => {
    setProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, [field]: value } : p)
    );
  };

  const handleCellBlur = async (product) => {
    try {
      await productService.updateProduct(product.id, product);
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to save changes');
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesArticle = product.article_no?.toLowerCase().includes(searchArticle.toLowerCase());
    const matchesProduct = product.product_service?.toLowerCase().includes(searchProduct.toLowerCase());
    return matchesArticle && matchesProduct;
  });

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading products...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-container">Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pricelist-page">
        <div className="pricelist-toolbar">
          <div className="search-group">
            <div className="search-box-inline">
              <input
                type="text"
                placeholder={language === 'en' ? 'Search Article No...' : 'Sök Artikelnr...'}
                value={searchArticle}
                onChange={(e) => setSearchArticle(e.target.value)}
                className="search-input-inline"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="search-box-inline">
              <input
                type="text"
                placeholder={language === 'en' ? 'Search Product...' : 'Sök Produkt...'}
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                className="search-input-inline"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="action-buttons-inline">
            <button className="action-btn-inline new-product-btn">
              <span className="btn-icon">+</span>
              <span>{language === 'en' ? 'New Product' : 'Ny Produkt'}</span>
            </button>
            <button className="action-btn-inline print-btn">
              <span className="btn-icon">🖨️</span>
              <span>{language === 'en' ? 'Print List' : 'Skriv ut'}</span>
            </button>
            <button className="action-btn-inline advanced-btn">
              <span className="btn-icon">⚙️</span>
              <span>{language === 'en' ? 'Advanced mode' : 'Avancerat'}</span>
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="products-table-main">
            <thead>
              <tr>
                <th className="col-select"></th>
                <th className="col-article">
                  {language === 'en' ? 'Article No.' : 'Artikelnr'} 
                  <span className="sort-arrow">↓</span>
                </th>
                <th className="col-product">
                  {language === 'en' ? 'Product/Service' : 'Produkt/Tjänst'} 
                  <span className="sort-arrow">↓</span>
                </th>
                <th className="col-number">{language === 'en' ? 'In Price' : 'Inpris'}</th>
                <th className="col-number">{language === 'en' ? 'Price' : 'Pris'}</th>
                <th className="col-unit">{language === 'en' ? 'Unit' : 'Enhet'}</th>
                <th className="col-number">{language === 'en' ? 'In Stock' : 'I lager'}</th>
                <th className="col-description">{language === 'en' ? 'Description' : 'Beskrivning'}</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="col-select">
                    <span className="row-arrow">→</span>
                  </td>
                  <td className="col-article">
                    <input
                      type="text"
                      value={product.article_no || ''}
                      onChange={(e) => handleCellChange(product.id, 'article_no', e.target.value)}
                      onBlur={() => handleCellBlur(product)}
                      className="cell-input"
                    />
                  </td>
                  <td className="col-product">
                    <input
                      type="text"
                      value={product.product_service || ''}
                      onChange={(e) => handleCellChange(product.id, 'product_service', e.target.value)}
                      onBlur={() => handleCellBlur(product)}
                      className="cell-input"
                    />
                  </td>
                  <td className="col-number">
                    <input
                      type="number"
                      value={product.in_price || ''}
                      onChange={(e) => handleCellChange(product.id, 'in_price', e.target.value)}
                      onBlur={() => handleCellBlur(product)}
                      className="cell-input text-right"
                    />
                  </td>
                  <td className="col-number">
                    <input
                      type="number"
                      value={product.price || ''}
                      onChange={(e) => handleCellChange(product.id, 'price', e.target.value)}
                      onBlur={() => handleCellBlur(product)}
                      className="cell-input text-right"
                    />
                  </td>
                  <td className="col-unit">
                    <input
                      type="text"
                      value={product.unit || ''}
                      onChange={(e) => handleCellChange(product.id, 'unit', e.target.value)}
                      onBlur={() => handleCellBlur(product)}
                      className="cell-input"
                    />
                  </td>
                  <td className="col-number">
                    <input
                      type="number"
                      value={product.in_stock || ''}
                      onChange={(e) => handleCellChange(product.id, 'in_stock', e.target.value)}
                      onBlur={() => handleCellBlur(product)}
                      className="cell-input text-right"
                    />
                  </td>
                  <td className="col-description">
                    <input
                      type="text"
                      value={product.description || ''}
                      onChange={(e) => handleCellChange(product.id, 'description', e.target.value)}
                      onBlur={() => handleCellBlur(product)}
                      className="cell-input"
                    />
                  </td>
                  <td className="col-actions">
                    <button className="more-btn">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Pricelist;