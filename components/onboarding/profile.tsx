'use client';

import { ArrowRight } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { APP_ROUTES } from '@/constants/routes';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useRouter } from '@/i18n/navigation';

import InputField from '../form/input-field';
import TextAreaField from '../form/textarea-field';
import { ProfilePictureUploader } from './profile-picture-uploader';

const ProfileDialog = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      bio: '',
      avatar: '',
    },
  });

  const handleContinue = async () => {
    try {
      // TODO: save profile
      router.push(APP_ROUTES.ONBOARDING.TEACHING_SKILLS);
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Step 01 / 04
          </p>

          <DialogTitle className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">
            Start with the basics
          </DialogTitle>

          <DialogDescription>
            A little context makes your future exchanges feel more human.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleContinue)} className="space-y-4">
          <div className="mt-9 grid gap-7 md:grid-cols-[125px_1fr] md:gap-8">
            <Controller
              name="avatar"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <ProfilePictureUploader
                    value={field.value}
                    onChange={field.onChange}
                  />

                  {fieldState.error && (
                    <p className="mt-2 text-sm text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="space-y-5">
              <InputField
                name="name"
                control={control}
                type="text"
                label="Your name"
                placeholder="Juli Sah"
              />

              <InputField
                name="username"
                control={control}
                type="text"
                label="Username"
                placeholder="Juli123"
              />
            </div>
          </div>

          <TextAreaField
            control={control}
            name="bio"
            label="Short bio"
            placeholder="Tell us about yourself..."
            rows={5}
          />
          <div className="w-full text-end">
            <Button type="submit" disabled={isSubmitting}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
