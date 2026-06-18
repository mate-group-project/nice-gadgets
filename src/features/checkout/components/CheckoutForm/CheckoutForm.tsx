import { novaPoshtaApi } from '@/shared/api/novaPoshta';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.scss';
import { useStores } from '@/shared/hooks/useStoresList';
import { useCheckout } from '@/shared/hooks/useCheckout';
import { SuccessModal } from '../SuccessModal';
import { useCartProducts } from '@/features/cart/hooks/useCartProducts';
import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import type { City, DeliveryType, Warehouse } from '../../types/types';
import { useCheckoutForm } from '../../hooks/useCheckoutForm';
import { CustomerFormFields } from '../CustomerFormFields/CustomerFormFields';
import { DeliveryOptions } from '../DeliveryOptions/DeliveryOptions';

interface SearchSettlementsResponse {
  data: {
    Addresses?: City[];
  }[];
}

interface GetWarehousesResponse {
  data: Warehouse[];
}

export const CheckoutForm = () => {
  // get user
  const { customer } = useCurrentUser();
  const {
    form,
    errors,
    setErrors,
    firstErrorRef,
    handleChange,
    resetForm,
    validate,
    scrollToFirstError,
  } = useCheckoutForm(customer);

  const [isOpen, setIsOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('pickup');
  const [storeId, setStoreId] = useState('');

  // cities
  const [citySearch, setCitySearch] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // warehouses
  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null,
  );
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  const { stores } = useStores();

  const storeOptions = stores.map((store) => ({
    label: store.name,
    value: String(store.id),
  }));

  useEffect(() => {
    if (!citySearch || deliveryType !== 'delivery') return;

    const timeout = setTimeout(() => {
      novaPoshtaApi
        .searchSettlements<SearchSettlementsResponse>(citySearch)
        .then((res) => {
          const list = res.data?.[0]?.Addresses || [];
          setCities(list);
        })
        .catch(console.error);
    }, 300);

    return () => clearTimeout(timeout);
  }, [citySearch, deliveryType]);

  useEffect(() => {
    if (!selectedCity?.Ref) return;

    const resetWarehouses = () => {
      setWarehouses([]);
      setSelectedWarehouse(null);
      setWarehouseSearch('');
      setLoadingWarehouses(true);
    };

    resetWarehouses();

    novaPoshtaApi
      .getWarehouses<GetWarehousesResponse>(selectedCity.Ref)
      .then((res) => {
        setWarehouses(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoadingWarehouses(false));
  }, [selectedCity?.Ref]);

  const { products: cartItems, clearCart } = useCartProducts();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const { submitOrder } = useCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate({ deliveryType, selectedCity, selectedWarehouse, storeId })) {
      scrollToFirstError();
      return;
    }

    const delivery =
      deliveryType === 'pickup' ?
        {
          type: 'pickup' as const,
          storeId,
        }
      : {
          type: 'delivery' as const,
          city: selectedCity!.Present!,
          cityRef: selectedCity!.Ref!,
          warehouse: selectedWarehouse!.Description!,
          warehouseRef: selectedWarehouse!.Ref!,
        };

    const order = {
      email: form.email,
      customer: form,
      delivery,
      items: cartItems.map((item) => ({
        productId: item.id,
        price: item.price,
        quantity: 1,
      })),
      total,
    };

    await submitOrder(order);
    clearCart();
    resetForm();

    setIsOpen(true);

    console.log('ORDER:', order);
  };

  const navigate = useNavigate();
  const handleClose = () => {
    setIsOpen(false);
    navigate('/catalog');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="order_form"
      >
        <CustomerFormFields
          form={form}
          errors={errors}
          handleChange={handleChange}
          firstErrorRef={firstErrorRef}
        />

        <DeliveryOptions
          deliveryType={deliveryType}
          setDeliveryType={setDeliveryType}
          storeId={storeId}
          setStoreId={setStoreId}
          storeOptions={storeOptions}
          errors={errors}
          setErrors={setErrors}
          citySearch={citySearch}
          setCitySearch={setCitySearch}
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          warehouses={warehouses}
          warehouseSearch={warehouseSearch}
          setWarehouseSearch={setWarehouseSearch}
          selectedWarehouse={selectedWarehouse}
          setSelectedWarehouse={setSelectedWarehouse}
          loadingWarehouses={loadingWarehouses}
        />

        <button
          type="submit"
          className="button"
          style={{ width: '180px' }}
        >
          Place order
        </button>
      </form>

      <SuccessModal
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};
