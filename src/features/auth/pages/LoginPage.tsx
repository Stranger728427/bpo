import { useState } from 'react';
import { Checkbox } from 'antd';
import { Input } from '@components/ui/Input/Input';
import { Button } from '@components/ui/Button/Button';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '@/lib/axios/interceptors';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const navigate = useNavigate();
  const { baseApi } = useApi();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = (payload: { email: string; password: string }) =>
    baseApi().post('/login', payload);

  const mutate = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { access_token, user } = response.data;

      sessionStorage.setItem('token', access_token);
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const payload = {
      email,
      password,
    };
    await mutate.mutateAsync(payload);
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Left Panel - Branding */}
        <div className={styles.brandingPanel}>
          <div className={styles.brandingContent}>
            <img
              className={styles.loginAnimation}
              src="/assets/login-animation.png"
              alt="Logo"
            />
          </div>
          <div className={styles.brandingText}>
            <h1 className={styles.brandName}>MYai</h1>
            <p className={styles.tagline}>
              Your Personal AI Scheduler, Taking AI brilliance to the next
              level.
            </p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className={styles.formPanel}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Login</h2>
              <p className={styles.formSubtitle}>
                Enter your credentials to access your account
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                autoComplete="email"
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
              />

              <div className={styles.rememberMe}>
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                fullWidth
                loading={isLoading}
                className={styles.submitButton}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
