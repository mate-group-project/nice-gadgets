import { useState, useRef } from 'react';
import { validateCheckout } from '../components/CheckoutForm/validation';
import type { City, DeliveryType, Warehouse } from '../types/types';

interface Customer {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const getInitialForm = (customer?: Customer): FormState => ({
  firstName: customer?.firstName ?? '',
  lastName: customer?.lastName ?? '',
  email: customer?.email ?? '',
  phone: customer?.phone ?? '',
});

export const useCheckoutForm = (customer?: Customer) => {
  const [form, setForm] = useState<FormState>(() =>
    getInitialForm(customer)
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  const resetToCustomer = () => {
    setForm(getInitialForm(customer));
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
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

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    setErrors({});
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    firstErrorRef,
    handleChange,
    validate,
    scrollToFirstError,
    resetForm,
    resetToCustomer,
  };
};
