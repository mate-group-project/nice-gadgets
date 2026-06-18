import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from './hooks/useAccount';
import { ProductCard } from '@/features/products/components/ProductCard';
import './AccountPage.scss';

export const AccountPage = () => {
  const { user, products, isLoading, error, changePassword } = useAccount();
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'success';
  } | null>(null);

  const showNotification = (text: string, type: 'error' | 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  if (!isLoading && !user) {
    return (
      <Navigate
        to="/auth?mode=login"
        replace
      />
    );
  }

  const hundlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (user?.customer.password !== currentPassword) {
      showNotification('Incorrect current password!', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('New passwords do not match!', 'error');
      return;
    }

    changePassword(newPassword);
    showNotification('Password changed successfully!', 'success');
    event.currentTarget.reset();
  };

  return (
    <div className="account-page">
      <div className="account-page__header">
        <div className="account-page__header">
          <h1 className="account-page__title">
            Hi, {user?.customer.firstName || 'User'}
          </h1>
          {user?.customer.email && (
            <p className="account-page__email">{user.customer.email}</p>
          )}
        </div>
      </div>

      <section className="account-page__products">
        <h2>My Products</h2>
        {isLoading && <p>Loading...</p>}
        {!isLoading && products.length === 0 && <p>No products yet</p>}
        <ul className="account-page__products-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            ></ProductCard>
          ))}
        </ul>
      </section>

      <section className="account-page__password">
        <h2>Change password</h2>

        {message && (
          <div
            className={`account-page__toast account-page__toast--${message.type}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={hundlePasswordChange}>
          <input
            type="password"
            placeholder="Current password"
            name="currentPassword"
            required
          />
          <input
            type="password"
            placeholder="New password"
            name="newPassword"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
        {error && <p className="account-page__error">{error}</p>}
      </section>
    </div>
  );
};
