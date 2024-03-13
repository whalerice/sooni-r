import { useAuthStore } from '@/stores/auth';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

const { user, onLogout } = useAuthStore.getState();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      notification.error({
        message: `에러 ${error.status}`,
        description: error.data.message,
        placement: 'bottomRight',
      });

      if (error.status === 401) {
        onLogout(user?.id);
      }
    },
    // onSuccess: (data) => {
    //   //   console.log(data);
    // },
    // onSettled: (data, error) => {
    //   //   console.log(data, error);
    // },
  }),
});
export { queryClient };
