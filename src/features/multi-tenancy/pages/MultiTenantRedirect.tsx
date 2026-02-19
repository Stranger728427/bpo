import { updateUserAuth } from '@/app/store/Slice/userSlice';
import { useAppDispatch } from '@/app/store/store';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { AuthService } from '@/features/auth/components/services/authService.service';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MultiTenancyRedirect = () => {
  const authService = AuthService();
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tenantName = window.location.host.split('.')[0];
  const [getUserError, setGetUserError] = useState<boolean>(false);

  const fetchUserDetails = async () => {
    try {
      const response = await authService.getUserDetails();
      console.log('userDetails', response);
      const mapUser = {
        userId: response.id,
        name: response.name,
        username: response.username,
        email: response.email,
        roles: response.roles ?? [],
        traits: response.traits ?? [],
      };

      console.log('Dispatching user details to userSlice:', mapUser);
      dispatch(updateUserAuth(mapUser));

      // Redirect to the portal
      navigate('/');
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
    if (code && tenantName) {
      validateAuthCode.mutate();
    }
  }, [params, tenantName]);

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

  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        height: '100vh',
        placeContent: 'center',
      }}
    >
      <Spinner />
    </div>
  );
};

export default MultiTenancyRedirect;
