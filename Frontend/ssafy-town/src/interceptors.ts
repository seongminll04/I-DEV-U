import axios from 'axios';

const TOKEN = localStorage.getItem('userToken');
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + TOKEN,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 403) {
      const accessToken = localStorage.getItem('userToken');
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const { data } = await axios({
          method: 'post',
          url: `https://i9b206.p.ssafy.io:9090/user/sleep`,
          data: { accessToken, refreshToken },
        });
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        originalRequest.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + newAccessToken,
        };
        localStorage.setItem('userToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        return await axios(originalRequest);
      } catch (err) {
        console.log(err) // Error 객체를 던져줘야 합니다.
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;