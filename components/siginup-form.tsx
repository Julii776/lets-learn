'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AuthApi from '@/apis/auth';

import { APP_ROUTES } from '@/constants/routes';

import { type SignupSchemaType, signupSchema } from '@/schemas/signup';

import InputField from '@/components/form/input-field';
import { Button } from '@/components/ui/button';

import { Link, useRouter } from '@/i18n/navigation';

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      verifyPassword: '',
    },
  });

  const router = useRouter();

  const handleSignup = async (data: SignupSchemaType) => {
    try {
      await AuthApi.signup(data);

      toast.success('Signup successfully');
      router.push(APP_ROUTES.DASHBOARD);
    } catch (error) {
      toast.error('Signup failed');
    }
  };

  return (
    <div className="mt-10 space-y-10">
      <div className="space-y-5">
        <p className="uppercase text-primary text-sm tracking-widest">
          start your next chapter
        </p>
        <p className="text-3xl font-semibold">Make room to grow</p>
      </div>
      <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
        <InputField
          name="name"
          control={control}
          type="text"
          label="Your name"
          placeholder="Juli Sah"
        />
        <InputField
          name="email"
          control={control}
          type="text"
          label="Email address"
          placeholder="juli@test.com"
        />
        <InputField
          name="password"
          control={control}
          type="password"
          label="Create a password"
          placeholder="8+ characters"
        />
        <InputField
          name="verifyPassword"
          control={control}
          type="password"
          label="Verify Passowrd"
          placeholder="Re-type password"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full "
          size="lg"
        >
          Signup
        </Button>
      </form>
      <p className="text-sm text-center">
        Already have an account?{' '}
        <Link className="text-primary" href={APP_ROUTES.LOGIN}>
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
