import './CheckoutPage.scss';
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { OrderSummary } from '@/features/checkout/components/OrderSummary';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

export const CheckoutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="checkout">
      <h1 className="checkout_title">{t('checkout.title')}</h1>

      <div className="checkout_content">
        <CheckoutForm />
        <OrderSummary />
      </div>
    </div>
  );
};