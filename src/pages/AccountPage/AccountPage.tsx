import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from './hooks/useAccount';
import './AccountPage.scss';

export const AccountPage = () => {
  const {
    user,
    products,
    isLoading,
    error,
    orders,
    changePassword,
    updateProfile,
  } = useAccount();

  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'success';
  } | null>(null);

  const [profileForm, setProfileForm] = useState(() => ({
    firstName: user?.customer.firstName ?? '',
    lastName: user?.customer.lastName ?? '',
    phone: user?.customer.phone ?? '',
  }));

  useEffect(() => {
    if (!user) {
      return;
    }

    setProfileForm({
      firstName: user.customer.firstName ?? '',
      lastName: user.customer.lastName ?? '',
      phone: user.customer.phone ?? '',
    });
  }, [user]);

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

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profileForm.firstName.trim()) {
      showNotification('First name is required!', 'error');
      return;
    }

    if (!profileForm.lastName.trim()) {
      showNotification('Last name is required!', 'error');
      return;
    }

    if (!profileForm.phone.trim()) {
      showNotification('Phone is required!', 'error');
      return;
    }

    updateProfile(profileForm);
    showNotification('Profile updated successfully!', 'success');
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (user.customer.password !== currentPassword) {
      showNotification('Incorrect current password!', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showNotification('Password should be at least 6 characters!', 'error');
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
      <header className="account-page__header">
        <h1 className="account-page__title">
          Hi, {user?.customer.firstName || 'User'}
        </h1>

        {user?.customer.email && (
          <p className="account-page__email">{user.customer.email}</p>
        )}
      </header>

      {message && (
        <div
          className={`account-page__toast account-page__toast--${message.type}`}
        >
          {message.text}
        </div>
      )}

      <div className="account-page__body">
        <section className="account-page__section">
          <h2>Personal information</h2>

          <form
            className="account-page__form"
            onSubmit={handleProfileSubmit}
          >
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={profileForm.firstName}
              onChange={handleProfileChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={profileForm.lastName}
              onChange={handleProfileChange}
            />

            <input
              type="email"
              value={user?.customer.email ?? ''}
              disabled
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
            />

            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </section>

        <section className="account-page__section">
          <h2>Change password</h2>

          <form
            className="account-page__form"
            onSubmit={handlePasswordChange}
          >
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
              {isLoading ? 'Saving...' : 'Change password'}
            </button>
          </form>
        </section>
      </div>

      <section className="account-page__products">
        <h2>My Products</h2>

        {isLoading && <p>Loading...</p>}

        {!isLoading && products.length === 0 && <p>No products yet</p>}

        <ul className="account-page__order-list">
          {orders.map((order) => (
            <li
              key={order.id}
              className="account-page__order-card"
            >
              <div className="account-page__order-header">
                <span>Order #{order.id}</span>
                <span>${order.total}</span>
              </div>

              <div className="account-page__order-info">
                <span>{order.items.length} items</span>
              </div>

              <div className="account-page__order-products">
                {order.items.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.productId,
                  );

                  if (!product) {
                    return null;
                  }

                  return (
                    <div
                      key={item.productId}
                      className="account-page__order-product"
                    >
                      {product.name}
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {error && <p className="account-page__error">{error}</p>}
    </div>
  );
};
