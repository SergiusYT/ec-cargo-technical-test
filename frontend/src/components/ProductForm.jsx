import { useState } from 'react';

//Categorias que tiene la API predefinidas
const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];
/*Cabe recalcar que si quisieramos crear categorias y esto necesitariamos una BD 
para poder guardar las categorias que queramos aparte de las que ya hay en la API para
la persistencia de datos que necesitariamos en este caso*/

const initialState = {
  name: '',
  category: '',
  price: '',
  stock: '',
};

// Formateo número como moneda colombiana: 1000000 → 1.000.000
const formatCOP = (value) => {
  const num = value.replace(/\D/g, ''); // solo dígitos
  if (!num) return '';
  return Number(num).toLocaleString('es-CO');
};

// Quito el formato para enviar: 1.000.000 → 1000000
const parseCOP = (value) => {
  return value.replace(/\./g, '').replace(/,/g, '');
};

const ProductForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);
  const [priceDisplay, setPriceDisplay] = useState(''); // lo que ve el usuario
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.category) newErrors.category = 'La categoría es obligatoria';
    if (!form.price) newErrors.price = 'El precio es obligatorio';
    else if (Number(form.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (form.stock === '') newErrors.stock = 'El stock es obligatorio';
    else if (Number(form.stock) < 0) newErrors.stock = 'El stock no puede ser negativo';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePriceChange = (e) => {
        const raw = parseCOP(e.target.value);
    if (raw === '' || (!isNaN(raw) && Number(raw) >= 0)) {
      setPriceDisplay(formatCOP(e.target.value));
      setForm(prev => ({ ...prev, price: raw }));
      setErrors(prev => ({ ...prev, price: '' }));
    }
  };

      const priceWithVAT = form.price
      ? Number(form.price * 1.19).toLocaleString('es-CO')
      : null;

  const handleStockChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // solo enteros positivos
    setForm(prev => ({ ...prev, stock: value }));
    setErrors(prev => ({ ...prev, stock: '' }));
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
      price: parseFloat((Number(form.price) * 1.19).toFixed(2)), // ← con IVA
      stock: Number(form.stock),
    });
    if (result?.success) {
      setForm(initialState);
      setPriceDisplay('');
      setErrors({});
    }
  };

  return (
    <div className="form-card1">
      <div className="form-card2">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-heading">Agregar Producto</p>

          <div className="form-field">
            <input
              className="input-field"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              type="text"
            />
          </div>
          {errors.name && <span className="form-error">{errors.name}</span>}

          <div className="form-field">
            <select
              className="input-field input-select"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="" disabled>Selecciona una categoría</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {errors.category && <span className="form-error">{errors.category}</span>}

          {/* lo dejo como precio como texto con formato COP */}
          <div className="form-field">
            <input
              className="input-field"
              name="price"
              value={priceDisplay}
              onChange={handlePriceChange}
              placeholder="Precio"
              type="text"
              inputMode="numeric"
            />
          </div>

          {/*Hago un Preview del IVA solo si aparece cuando haya precio escrito */}
          {priceWithVAT && (
            <span style={{
              fontSize: '13px',
              color: '#46b0ef',
              paddingLeft: '1em',
              opacity: 0.8,
            }}>
              Precio final con IVA (19%): ${priceWithVAT}
            </span>
          )}
          {errors.price && <span className="form-error">{errors.price}</span>}

      
          <div className="form-field">
            <input
              className="input-field"
              name="stock"
              value={form.stock}
              onChange={handleStockChange}
              placeholder="Stock"
              type="text"
              inputMode="numeric"
            />
          </div>
          {errors.stock && <span className="form-error">{errors.stock}</span>}

          <button className="sendMessage-btn" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Agregar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;