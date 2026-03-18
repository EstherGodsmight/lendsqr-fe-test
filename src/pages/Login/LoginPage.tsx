import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  const isValid = useMemo(() => {
    return email.trim() !== '' && password.trim() !== '';
  }, [email, password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      alert('Please enter email and password');
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <section className="login-page__left">
        <div className="login-page__brand">
          <div className="login-page__brand-mark">LS</div>
          <div className="login-page__brand-text">lendsqr</div>
        </div>

        <div className="login-page__art">
          <div className="login-page__art-card login-page__art-card--large" />
          <div className="login-page__art-card login-page__art-card--small" />
          <div className="login-page__art-circle login-page__art-circle--one" />
          <div className="login-page__art-circle login-page__art-circle--two" />
        </div>
      </section>

      <section className="login-page__right">
        <div className="login-form-card">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-field form-field--password">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="form-field__toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            <a href="#" className="login-form__forgot">
              FORGOT PASSWORD?
            </a>

            <button type="submit" className="login-form__submit">
              LOG IN
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;