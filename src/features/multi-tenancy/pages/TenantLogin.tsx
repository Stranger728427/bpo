// import { useParams } from 'react-router-dom';
// import { getSubDomain } from '@/utils/getSubDomain';
import { Button } from 'antd';
import styles from './TenantLogin.module.scss';
import { Input } from '@/components/ui/Input/Input';
import { useState } from 'react';
import { IoCubeOutline } from 'react-icons/io5';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { siteConfig } from '@/components/constants/Constant';
import { useValidateTenant } from '../components/api/useValidateTenant';

const TenantLogin = () => {
  const [tenantName, setTenantName] = useState('');

  const { mutateAsync: validateTenant, isPending } =
    useValidateTenant(tenantName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateTenant();
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
                Enter your tenant name to Redirect to user-login page
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                placeholder="Enter your tenant name"
                prefix={
                  !isPending && (
                    <span>
                      <IoCubeOutline size={18} opacity={0.5} />
                    </span>
                  )
                }
                suffix={
                  isPending && (
                    <span>
                      <Spinner />
                    </span>
                  )
                }
                value={tenantName}
                onChange={(e) => {
                  setTenantName(e.target.value.toLowerCase());
                }}
                name="tenantId"
                type="text"
                disabled={isPending}
                addonAfter={siteConfig.tenantBaseUrl}
              />

              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;
