const LOW_STOCK_THRESHOLD = 5;

const ProductTable = ({ products }) => {
  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className={product.stock < LOW_STOCK_THRESHOLD ? 'low-stock-row' : ''}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                {product.stock}
                {product.stock < LOW_STOCK_THRESHOLD && (
                  <span className="low-stock-badge">⚠ Stock bajo</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;