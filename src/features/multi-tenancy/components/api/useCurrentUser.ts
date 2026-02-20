import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query/queryKeys';
import { useAppSelector } from '@store/hooks';
import { AuthService } from '@/features/multi-tenancy/components/services/authService.service';
import { UserAuthSelector } from '@/app/store/Slice/userSlice';


export function useCurrentUser() {
  const authService = AuthService()
  const user = useAppSelector(UserAuthSelector);

  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: () => authService.getUserDetails().then((res) => res.data),
    enabled: !!user,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}