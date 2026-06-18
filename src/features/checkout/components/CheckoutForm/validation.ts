export type CheckoutValidationContext = {
  form: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryType: 'pickup' | 'delivery';
  selectedCity: { Ref: string } | null;
  selectedWarehouse: { Ref: string } | null;
  storeId: string;
};

export const validateCheckout = (ctx: CheckoutValidationContext) => {
  const { form, deliveryType, selectedCity, selectedWarehouse, storeId } = ctx;

  const newErrors: Record<string, string> = {};

  if (!form.firstName.trim()) {
    newErrors.firstName = 'First name is required';
  }

  if (!form.lastName.trim()) {
    newErrors.lastName = 'Last name is required';
  }

  if (!form.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = 'Invalid email';
  }

  if (!form.phone.trim()) {
    newErrors.phone = 'Phone is required';
  } else if (form.phone.length < 10) {
    newErrors.phone = 'Phone is too short';
  }

  if (deliveryType === 'delivery') {
    if (!selectedCity?.Ref) {
      newErrors.city = 'Select city';
    }

    if (!selectedWarehouse?.Ref) {
      newErrors.warehouse = 'Select warehouse';
    }
  }

  if (deliveryType === 'pickup' && !storeId) {
    newErrors.store = 'Select store';
  }

  return newErrors;
};