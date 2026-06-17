import { Link, useSearchParams } from 'react-router-dom';
import './authPage.scss';
import { Button } from '@base-ui/react';

export const AuthPage = () => {
    const [isLoginMode, setIsLoginMode] = useSearchParams();
    return (
        <div className="auth-page">
            <div className="auth-page__container">
                <h2 className='auth-page__title'>{isLoginMode ? 'Sign In' : 'Create an Account'}</h2>

                <form className="auth-form">
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />

                    {!isLoginMode && (
                        <input type="password" placeholder="Confirm Password" required />
                    )}

                    <Button
                        className='button auth-page__button'
                    >
                        {isLoginMode ? 'Log In' : 'Register'}
                    </Button>
                </form>

                <div className="auth-page__toggle">
                    {isLoginMode ? (
                        <p>
                            Dont have an account?{' '}
                            <Link className='auth-page__toggle-link' to="/auth?mode=register">Register</Link>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <Link className='auth-page__toggle-link' to="/auth?mode=login">Log In</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}