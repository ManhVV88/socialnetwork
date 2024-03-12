import axios from 'axios';

const login = async (username: string, password: string) => {
  return await axios.post('http://localhost:8080/api/v1/auth/signin',{username, password})
  .then((response: any) => {
      return response;
  })
  .catch((error: any) => {
      return error;
  });
};

const register = async (username: string, password: string) => {
    return await axios.post('http://localhost:8080/api/v1/auth/signup',{username, password})
    .then((response: any) => {
        return response;
    })
    .catch((error: any) => {
        return error;
    });
}

const verifyOtp =async (username:string,otp: string) => {
    return await axios.post('http://localhost:8080/api/v1/auth/verifyOtp',{username, otp})
    .then((response: any) => {
        return response;
    })
    .catch((error: any) => {
        return error;
    });
}

const AuthService = {
  login,
  register,
  verifyOtp,
};

export default AuthService;