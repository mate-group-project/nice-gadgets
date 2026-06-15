import { useState } from 'react';

type DeliveryType = 'pickup' | 'delivery';

export const CheckoutForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('pickup');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('FORM DATA:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact information</h2>

      <input name="firstName" placeholder="First name" onChange={handleChange} />
      <input name="lastName" placeholder="Last name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <h2>Delivery method</h2>

      <label>
        <input
          type="radio"
          checked={deliveryType === 'pickup'}
          onChange={() => setDeliveryType('pickup')}
        />
        Pickup (store)
      </label>

      <label>
        <input
          type="radio"
          checked={deliveryType === 'delivery'}
          onChange={() => setDeliveryType('delivery')}
        />
        Delivery (Nova Poshta)
      </label>

      <button type="submit">
        Place order
      </button>
    </form>
  )
}