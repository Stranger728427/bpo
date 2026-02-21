import { updateUserAuth } from '@/app/store/Slice/userSlice';
import { useAppDispatch } from '@/app/store/store';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { authService } from '@/features/auth/components/services/authService.service';
import { mutationKeys } from '@/lib/query/mutationKeys';
import { tenantName } from '@/utils/helpers/helper';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const MultiTenancyRedirect = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const authToken = useSelector(
    (state: any) => state?.UserAuth?.value?.accessToken
  );
  const [getUserError, setGetUserError] = useState<boolean>(false);

  const fetchUserDetails = async () => {
    try {
      const response = await authService.getUserDetails();
      const mapUser = {
        userId: response.id,
        name: response.name,
        username: response.username,
        email: response.email,
        roles: response.roles ?? [],
        traits: response.traits ?? [], // traits is a feature to used in user profile
      };
      dispatch(updateUserAuth(mapUser));
    } catch (err) {
      notification.error({
        message:
          (err as any)?.response?.data?.message ||
          'Error occurred while fetching user details.',
      });
      setGetUserError(true);
    }
  };

  const validateAuthCode = useMutation({
    mutationKey: mutationKeys.validateAuthCode(),
    mutationFn: async () => {
      const code = params.get('code');
      if (!code) throw new Error('No auth code found');

      return await authService.validateAuthCode({
        authCode: code,
        tenantName: tenantName,
      });
    },
    onSuccess: () => {
      fetchUserDetails();
    },
    onError: (error: AxiosError<any>) => {
      notification.error({
        message:
          error?.response?.data?.message ||
          'Error occurred while validating auth code.',
      });
    },
  });

  useEffect(() => {
    const code = params.get('code');
    // Trigger only if:
    //  code exists
    //  tenant exists
    //  token NOT already stored
    if (code && tenantName && !authToken) {
      validateAuthCode.mutateAsync();
    }
  }, [params, tenantName, authToken]);

  if (getUserError || validateAuthCode.isError || !params.get('code')) {
    return (
      <div
        style={{
          display: 'grid',
          width: '100%',
          height: '100vh',
          placeContent: 'center',
        }}
      >
        Error occurred while logging in. Please retry after sometime.
      </div>
    );
  }

  return <Spinner fullScreen tip="Authenticating and fetching details..." />;
};

export default MultiTenancyRedirect;
