'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import UsersApi from '@/apis/users';

import { APP_ROUTES } from '@/constants/routes';

import {
  type ProfileFormValues,
  profileFormSchema,
  toUpdateProfilePayload,
} from '@/schemas/user';

import InputField from '@/components/form/input-field';
import TextAreaField from '@/components/form/textarea-field';
import { ProfilePictureUploader } from '@/components/onboarding/profile-picture-uploader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useRouter } from '@/i18n/navigation';
import { useUserStore } from '@/stores/user-store';

const ProfileDialog = () => {
  const router = useRouter();
  const { user, updateUser } = useUserStore((state) => state);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: {
      name: user?.name || '',
      bio: user?.bio || '',
      avatarUrl: '',
    },
  });

  const handleContinue = async (values: ProfileFormValues) => {
    try {
      // TODO: upload values.avatarUrl, then persist the returned URL

      const res = await UsersApi.updateUserDetail(
        toUpdateProfilePayload(values),
      );
      updateUser({ ...res.data.user });

      router.push(APP_ROUTES.ONBOARDING.TEACHING_SKILLS);
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleSkip = () => {
    router.push(APP_ROUTES.ONBOARDING.TEACHING_SKILLS);
  };

  return (
    <Dialog open={true}>
      <DialogContent
        showCloseButton={false}
        className="max-w-lg gap-0 p-6 sm:p-8"
      >
        <DialogHeader className="mb-7 items-center text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Step 01 / 04
          </p>

          <DialogTitle className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Start with the basics
          </DialogTitle>

          <DialogDescription className="mt-2 max-w-md text-sm leading-6">
            A little context makes your future exchanges feel more human.
          </DialogDescription>
        </DialogHeader>

        <form id="profile-form" onSubmit={handleSubmit(handleContinue)}>
          <div className="space-y-7">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <Controller
                name="avatarUrl"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="shrink-0">
                    <ProfilePictureUploader
                      value={field.value}
                      onChange={field.onChange}
                    />

                    {fieldState.error && (
                      <p className="mt-2 max-w-[125px] text-center text-xs text-destructive">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="w-full">
                <InputField
                  name="name"
                  control={control}
                  type="text"
                  label="Your name"
                  placeholder="Juli Sah"
                />
              </div>
            </div>

            <TextAreaField
              control={control}
              name="bio"
              label="Short bio"
              placeholder="Tell us a little about yourself..."
              rows={5}
              description="Max 1000 characters"
            />
          </div>
          <div className="mt-8 flex items-center justify-between border-t pt-5">
            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              Skip for now
            </Button>

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
