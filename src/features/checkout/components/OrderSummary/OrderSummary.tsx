
import { useCartProducts } from '@/features/cart/hooks/useCartProducts';
import './OrderSummary.scss';

export const OrderSummary = () => {
  const { products: cartItems } = useCartProducts();

  console.log(cartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
              <div className="checkout_summary__name">
                {product.name}
              </div>

              <div className="checkout_summary__meta">
                <span>
                  {product.color} • {product.capacity} 
                </span>
                <span>
                  ${product.price} x {product.quantity}
                </span>
              </div>
            </div>

            <div className="checkout_summary__price">
              <span>${product.price * product.quantity}</span>
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
