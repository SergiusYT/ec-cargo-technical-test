const LOW_STOCK_THRESHOLD = 5;

const CATEGORY_ICONS = {
  "men's clothing": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#46b0ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
    </svg>
  ),
  "women's clothing": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
    </svg>
  ),
  "jewelery": (
    <svg width="20px" height="20px" viewBox="0 0 50 50" version="1.2" baseProfile="tiny" fill="#fbbf24" stroke="#fbbf24" strokeWidth="0.5" xmlns="http://www.w3.org/2000/svg" overflow="inherit">
      <path d="M46.476 20.662l-.013-.101c-.028-.141-.08-.283-.127-.362l-6.336-10.199s-.808-1-1-1h-27l-8.12 10.853-.096.1-.013.047c-.064.101-.119.215-.168.35l-.033.097c-.048.166-.07.31-.064.526.007.14.032.279.077.424l.038.109c.051.129.114.247.188.352l19.631 24.867.04.057c.101.13.224.245.374.35l.114.071c.112.07.229.126.399.188l.111.037c.192.049.359.072.522.072.165 0 .326-.022.543-.078l.133-.047c.13-.046.247-.103.388-.19l.088-.055c.151-.107.272-.223.339-.314l19.656-24.893c.088-.114.162-.242.25-.469.048-.126.069-.248.08-.321l.015-.129.008-.102-.024-.24zm-10.54-.662l2.798-5.063 2.796 5.063h-5.594zm-1.678 3h6.638l-11.064 14.015 4.426-14.015zm-1.642-4.518l-4.041-5.482h7.07l-3.029 5.482zm-12.944 4.518h10.659l-5.331 16.877-5.328-16.877zm1.057-3l4.271-5.796 4.271 5.796h-8.542zm-3.008-1.972l-1.852-5.028h5.557l-3.705 5.028zm2.449 18.988l-11.065-14.016h6.639l4.426 14.016zm-7.505-22.044l1.853 5.028h-5.558l3.705-5.028z"/>
    </svg>
  ),
  "electronics": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const ProductTable = ({ products = [] }) => {
  
  const getStockStatus = (stock) => {
    if (stock === 0) return 'out';
    if (stock < LOW_STOCK_THRESHOLD) return 'low';
    return 'ok';
  };

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className={`
              ${getStockStatus(product.stock) === 'out' ? 'out-of-stock-row' : ''}
              ${getStockStatus(product.stock) === 'low' ? 'low-stock-row' : ''}
            `}>
              <td>{product.id}</td>
              <td>
                <div className="category-cell">
                  {CATEGORY_ICONS[product.category] || DEFAULT_ICON}
                  <span className="category-label">{product.category}</span>
                </div>
              </td>
              <td>{product.name}</td>
              <td>${product.price.toLocaleString('es-CO')}</td>
              <td>
                <div className="stock-cell">
                  <span className={`stock-number ${
                    getStockStatus(product.stock) === 'out' ? 'stock-out' :
                    getStockStatus(product.stock) === 'low' ? 'stock-low' : ''
                  }`}>
                    {product.stock}
                  </span>
                  {getStockStatus(product.stock) === 'out' && (
                    <span className="out-of-stock-badge">✖️ Agotado</span>
                  )}
                  {getStockStatus(product.stock) === 'low' && (
                    <span className="low-stock-badge">⚠️ Stock bajo</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;