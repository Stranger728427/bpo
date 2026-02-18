import { Spinner } from '@/components/ui/Spinner/Spinner';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useValidateAuthCode } from '../components/api/useValidateAuthCode';

const MultiTenantRedirect = () => {
  const [params] = useSearchParams();
  const tenantName = new URL(location.href)?.host?.split('.')[0];

  const {
    mutateAsync: validateAuthCode,
    isError: validateAuthCodeError,
    isPending: validateAuthCodePending,
  } = useValidateAuthCode();

  useEffect(() => {
    if (params.get('code') && tenantName) {
      validateAuthCode({
        authCode: params.get('code')!,
        tenantName,
      });
    }
  }, [params.get('code'), tenantName]);

  if (validateAuthCodeError || !params.get('code')) {
    return (
      <div
        style={{
          display: 'grid',
          width: '100%',
          height: '100%',
          placeContent: 'center',
        }}
      >
        Error occured while logging in. Please retry after sometime.
      </div>
    );
  }

  return <>{validateAuthCodePending && <Spinner />}</>;
};

export default MultiTenantRedirect;
