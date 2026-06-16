import './CheckoutPage.scss';

import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { OrderSummary } from '@/features/checkout/components/OrderSummary';

export const CheckoutPage = () => {
  return (
    <div className="checkout">
      <h1 className="checkout_title">Checkout</h1>

      <div className="checkout_content">
        <CheckoutForm />

        <OrderSummary />
      </div>
    </div>
  );
};
