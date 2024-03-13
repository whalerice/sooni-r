import { QueryCache, QueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

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
