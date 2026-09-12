import axios from 'axios';

import type { LoginSchemaType } from '@/schemas/login';
import type { SignupSchemaType } from '@/schemas/signup';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const URLS = {
  SIGNUP: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
};

class AuthApi {
  static signup(payload: SignupSchemaType) {
    return axios.post(URLS.SIGNUP, payload, { withCredentials: true });
  }

  static login(payload: LoginSchemaType) {
    return axios.post(URLS.LOGIN, payload, { withCredentials: true });
  }
}

export default AuthApi;
