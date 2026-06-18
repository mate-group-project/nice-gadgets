import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './authPage.scss';
import { Button } from '@base-ui/react';
import { useState, type FormEvent } from 'react';
import { client } from '@/shared/api/client';

type UserDelivery =
  | { type: 'pickup'; storeId: string }
  | {
      type: 'delivery';
      city: string;
      cityRef: string;
      warehouse: string;
      warehouseRef: string;
    };

interface UserCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface User {
  id?: number | string;
  customer: UserCustomer;
  delivery: UserDelivery;
}

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    form: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isLoginMode = searchParams.get('mode') !== 'register';

  const formHeader = isLoginMode ? 'Sign In' : 'Create an Account';
  const formButton = isLoginMode ? 'Log In' : 'Register';
  const formToggle =
    isLoginMode ? 'Dont have an account ?' : 'Already have an account?';
  const formToggleLink = isLoginMode ? 'Register' : 'Log In';
  const formMode = isLoginMode ? 'register' : 'login';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoginMode) {
      // БЛОК АВТОРИЗАЦІЇ
      setIsLoading(true);
      setErrors({ email: '', password: '', confirmPassword: '', form: '' });

      try {
        const users = await client.get<User[]>(
          `/users?customer.email=${formInputs.email}`,
        );

        if (users.length === 0) {
          setErrors((prev) => ({
            ...prev,
            email: 'Invalid email or password',
            password: 'Invalid email or password',
          }));
        } else {
          const foundUser = users[0];

          if (foundUser.customer.password === formInputs.password) {
            const sessionDuration = 24 * 60 * 60 * 1000;
            const expiresAt = Date.now() + sessionDuration;

            const authData = {
              user: foundUser,
              expiresAt: expiresAt,
            };

            localStorage.setItem('currentUser', JSON.stringify(authData));

            navigate('/');
            setFormInputs({ email: '', password: '', confirmPassword: '' });
          } else {
            setErrors((prev) => ({
              ...prev,
              email: 'Invalid email or password',
              password: 'Invalid email or password',
            }));
          }
        }
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          form: 'Server connection error. Please try again later.',
        }));
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // БЛОК РЕЄСТРАЦІЇ

      if (formInputs.password !== formInputs.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Passwords do not match',
        }));
        return;
      }

      setIsLoading(true);
      setErrors({ email: '', password: '', confirmPassword: '', form: '' });

      try {
        const existingUsers = await client.get<User[]>(
          `/users?customer.email=${formInputs.email}`,
        );

        if (existingUsers.length > 0) {
          setErrors((prev) => ({
            ...prev,
            email: 'User with this email already exists',
          }));
          return;
        }

        const newUser: User = {
          customer: {
            firstName: '',
            lastName: '',
            email: formInputs.email,
            phone: '',
            password: formInputs.password,
          },
          delivery: {
            type: 'pickup',
            storeId: '',
          },
        };

        const createdUser = await client.post<User>('/users', newUser);

        localStorage.setItem('currentUser', JSON.stringify(createdUser));
        navigate('/');
        setFormInputs({ email: '', password: '', confirmPassword: '' });
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          form: 'Registration failed. Server error, please try again later.',
        }));
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleResetFields = () => {
    setFormInputs((prev) => ({
      ...prev,
      email: '',
      password: '',
      confirmPassword: '',
    }));
    setErrors({ email: '', password: '', confirmPassword: '', form: '' });
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <h2 className="auth-page__title">{formHeader}</h2>

        {errors.form && <p className="auth-page__error">{errors.form}</p>}
        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            style={{ borderColor: errors.email ? '#ff4d4f' : '' }}
            value={formInputs.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="auth-form__field-error">{errors.email}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            style={{ borderColor: errors.password ? '#ff4d4f' : '' }}
            value={formInputs.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="auth-form__field-error">{errors.password}</span>
          )}

          {!isLoginMode && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                style={{ borderColor: errors.confirmPassword ? '#ff4d4f' : '' }}
                value={formInputs.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="auth-form__field-error">
                  {errors.confirmPassword}
                </span>
              )}
            </>
          )}

          <Button
            className="button auth-page__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : formButton}
          </Button>
        </form>

        <div className="auth-page__toggle">
          <p>
            {formToggle}{' '}
            <Link
              onClick={handleResetFields}
              className="auth-page__toggle-link"
              to={`/auth?mode=${formMode}`}
            >
              {formToggleLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
