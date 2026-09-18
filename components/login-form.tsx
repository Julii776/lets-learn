'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AuthApi from '@/apis/auth';

import { APP_ROUTES } from '@/constants/routes';

import { type LoginSchemaType, loginSchema } from '@/schemas/login';

import InputField from '@/components/form/input-field';
import { Button } from '@/components/ui/button';

import { Link, useRouter } from '@/i18n/navigation';
import { useUserStore } from '@/stores/user-store';

const LoginForm = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginSchemaType) => {
    try {
      const res = await AuthApi.login(data);
      const { accessToken, user } = res.data;

      localStorage.setItem('access-token', accessToken);
      setUser(user);

      toast.success('Login successfully');
      router.push(APP_ROUTES.DASHBOARD);
    } catch (_error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="mt-10 space-y-10">
      <div className="space-y-5">
        <p className="uppercase text-primary text-sm tracking-widest">
          Good To see you again
        </p>
        <p className="text-3xl font-semibold">WELCOME BACK</p>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <InputField
          name="email"
          control={control}
          type="text"
          label="Email"
          placeholder="Your email"
        />
        <InputField
          name="password"
          control={control}
          type="text"
          label="Password"
          placeholder="Enter password"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full "
          size="lg"
        >
          Login
        </Button>
      </form>
      <p className="text-sm text-center">
        New to skillSwap?{' '}
        <Link className="text-primary" href={APP_ROUTES.SIGNUP}>
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
