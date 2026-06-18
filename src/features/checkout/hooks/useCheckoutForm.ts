import { useState, useRef, useEffect } from 'react';

import { validateCheckout } from '../components/CheckoutForm/validation';
import type { City, DeliveryType, Warehouse } from '../types/types';

interface Customer {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export const useCheckoutForm = (customer?: Customer) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (customer) {
      const id = setTimeout(() => {
        setForm({
          firstName: customer.firstName ?? '',
          lastName: customer.lastName ?? '',
          email: customer.email ?? '',
          phone: customer.phone ?? '',
        });
      }, 0);

      return () => clearTimeout(id);
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const resetForm = () => {
    setForm({ firstName: '', lastName: '', email: '', phone: '' });
    setErrors({});
  };

  const validate = ({
    deliveryType,
    selectedCity,
    selectedWarehouse,
    storeId,
  }: {
    deliveryType: DeliveryType;
    selectedCity: City | null;
    selectedWarehouse: Warehouse | null;
    storeId: string;
  }) => {
    const newErrors = validateCheckout({
      form,
      deliveryType,
      selectedCity,
      selectedWarehouse,
      storeId,
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToFirstError = () => {
    setTimeout(() => {
      firstErrorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 0);
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    firstErrorRef,
    handleChange,
    resetForm,
    validate,
    scrollToFirstError,
  };
};
