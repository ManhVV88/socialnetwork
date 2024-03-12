import axios from 'axios';

const login = (username: string, password: string) => {
  return axios.post('http://localhost:8080/api/v1/auth/signin',{username, password})
  .then((response: any) => {
      return response.data;
  })
  .catch((error: any) => {
      return error;
  });
};

const SigninService = {
  login,
};

export default SigninService;