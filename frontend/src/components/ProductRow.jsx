import { useState } from 'react';

const ProductRow = ({ product, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (field, value) => {
    setEditedProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = async () => {
    if (JSON.stringify(editedProduct) !== JSON.stringify(product)) {
      await onUpdate(editedProduct);
    }
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={editedProduct.article_no}
          onChange={(e) => handleChange('article_no', e.target.value)}
          onBlur={handleBlur}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedProduct.product_service}
          onChange={(e) => handleChange('product_service', e.target.value)}
          onBlur={handleBlur}
        />
      </td>
      <td>
        <input
          type="number"
          value={editedProduct.in_price}
          onChange={(e) => handleChange('in_price', e.target.value)}
          onBlur={handleBlur}
        />
      </td>
      <td>
        <input
          type="number"
          value={editedProduct.price}
          onChange={(e) => handleChange('price', e.target.value)}
          onBlur={handleBlur}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedProduct.unit}
          onChange={(e) => handleChange('unit', e.target.value)}
          onBlur={handleBlur}
        />
      </td>
      <td>
        <input
          type="number"
          value={editedProduct.in_stock}
          onChange={(e) => handleChange('in_stock', e.target.value)}
          onBlur={handleBlur}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedProduct.description}
          onChange={(e) => handleChange('description', e.target.value)}
          onBlur={handleBlur}
        />
      </td>
    </tr>
  );
};

export default ProductRow;