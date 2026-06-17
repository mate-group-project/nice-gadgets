import { useCart } from '@/features/products/hooks/useLocalStorageList';
import { useProductsList } from '@/features/products/hooks/useProductsList';
import './OrderSummary.scss';

export const OrderSummary = () => {
  const { items: cartIds } = useCart();
  const { products } = useProductsList();

  const cartItems = products.filter((p) =>
    cartIds.map((item) => item.id).includes(p.id),
  );
  console.log(products);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className="checkout_summary">
      <h2 className="checkout_summary__title">Order summary</h2>

      <div className="checkout_summary__list">
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="checkout_summary__item"
          >
            <div className="checkout_summary__info">
              <div className="checkout_summary__name">{product.name}</div>

              <div className="checkout_summary__meta">
                {product.color} • {product.capacity}
              </div>
            </div>

            <div className="checkout_summary__price">
              <span>${product.price}</span>

              {product.price !== product.fullPrice && (
                <span className="checkout_summary__price-old">{`$${product.fullPrice}`}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="checkout_summary__footer">
        <div className="checkout_summary__row">
          <span>Total</span>
          <span>
            <strong>${total}</strong>
          </span>
        </div>
      </div>
    </aside>
  );
};
