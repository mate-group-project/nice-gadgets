import { useState } from 'react';

export const CheckoutForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

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
      <input name="firstName" placeholder="First name" onChange={handleChange} />
      <input name="lastName" placeholder="Last name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <button type="submit">
        Place order
      </button>
    </form>
  )
}