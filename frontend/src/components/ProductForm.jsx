import { useState } from 'react';

const initialState = {
  name: '',
  category: '',
  price: '',
  stock: '',
};

const ProductForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.category.trim()) newErrors.category = 'La categoría es obligatoria';
    if (!form.price) newErrors.price = 'El precio es obligatorio';
    else if (Number(form.price) < 0) newErrors.price = 'El precio no puede ser negativo';
    if (form.stock === '') newErrors.stock = 'El stock es obligatorio';
    else if (Number(form.stock) < 0) newErrors.stock = 'El stock no puede ser negativo';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = await onSubmit({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
    });
    if (result?.success) {
      setForm(initialState);
      setErrors({});
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>

      <div className="form-group">
        <label>Nombre</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre del producto" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" />
        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0.00" />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="0" />
        {errors.stock && <span className="error">{errors.stock}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Agregar Producto'}
      </button>
    </form>
  );
};

export default ProductForm;