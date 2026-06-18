import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from './hooks/useAccount';
import { ProductCard } from '@/features/products/components/ProductCard';
import './AccountPage.scss';

export const AccountPage = () => {
  const { user, products, isLoading, error, changePassword } = useAccount();
  const [newPassword, setNewPassword] = useState('');

  if (!isLoading && !user) {
    return (
      <Navigate
        to="/auth?mode=login"
        replace
      />
    );
  }

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();
    changePassword(newPassword);
    setNewPassword('');
  };

  return (
    <div className="account-page">
      <div className="account-page__header">
        <h1 className="account-page__title">
          Hi, {user?.customer.firstName || user?.customer.email}
        </h1>
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
              className="account-page__product"
            >
              <img
                src={product.image}
                alt={product.name}
              />
              <span>{product.name}</span>
              <span>${product.price}</span>
            </ProductCard>
          ))}
        </ul>
      </section>

      <section className="account-page__password">
        <h2>Change password</h2>
        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
          >
            Save
          </button>
        </form>
        {error && <p className="account-page__error">{error}</p>}
      </section>
    </div>
  );
};
