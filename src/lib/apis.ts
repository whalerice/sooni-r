import axios from 'axios';
// import { saveSessionCookie } from '@/lib/actions';
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + import.meta.env.VITE_APP_PATH,
});

type SendParams = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
  params?: object;
  isForm?: boolean;
  isRefreshToken?: boolean;
};
// language: lang,
const send = async (options: SendParams) => {
//   const sessionToken = cookies().get('x-qbot-session')?.value;

  const { url, method, data, params, isForm } = options;
  try {
    const response = await instance.request({
      url,
      method,
      data,
      params: params,
      headers: {
        // ...(sessionToken ? { 'x-qbot-session': sessionToken } : {}),
        // Authorization: `Bearer ${process.env.token}`,
        Accept: 'application/json',
        ...(isForm ? { 'Content-Type': 'multipart/form-data' } : {}),
      },
      withCredentials: true,
    });

    if (response.headers['set-cookie']) {
    //   saveSessionCookie(response.headers['set-cookie'][0]);
    }

    if (response.status !== 200) {
      throw response;
    }

    return response.data;
  } catch (error: any) {
    // console.log(error);

    if (error.response.status === 422) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};
const request = {
  get: async (url: string, params?: object | undefined) =>
    await send({ url, method: 'GET', data: undefined, params }),
  post: async (
    url: string,
    data?: object | undefined,
    params?: object | undefined,
    isForm?: boolean,
  ) => await send({ url, method: 'POST', data, params, isForm }),
};

export const apis = {
  user: {
    login: (data: { loginId: any; password: any }) =>
      request.post('/user/login', data),
    logout: (data: { user: { id: any } }) => request.post('/user/logout', data),
    sessionTouch: () => request.get('/user/session-touch'),
  },
};
