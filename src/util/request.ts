import axios from "axios";
import { error } from 'console';
import Cookies from 'universal-cookie';

export const request = axios.create({baseURL:"http://localhost:8000/api"})
const cookie = new Cookies();
request.interceptors.request.use((config) => {
  // if (config.url !== '/auth/token') {
    const accessToken = cookie.get('accessToken');
    accessToken && (config.headers.Authorization = 'Bearer ' + accessToken)
  // }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },


    (error) => {
        const config = error.config;
        console.log('congig', config);
        if (error.response.status === 401 && !config.sent) {
          config.sent = true;
          if (config.url !== '/auth/token' && config.url !== '/auth/login') {
            const refreshToken = cookie.get('refreshToken');
            request
              .post(
                '/auth/token',
                {
                    refreshToken
                },
                // {
                //   headers: {
                //     Authorization: 'Bearer ' + refreshToken,
                //   },
                // }
              )
              .then((res) => {
                const accessToken = res.data.token.accessToken;
                cookie.set('accessToken', accessToken);
                // cookie.set('refreshToken', res.data.accessToken);
                config.headers.Authorization = 'Bearer ' + accessToken;
                return request(config);
              });
          } else if (config.url == '/auth/token') {
            cookie.remove('accessToken');
            cookie.remove('refreshToken');
            location.href = '/';
          }
        }
      }

)