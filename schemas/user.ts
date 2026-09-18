import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),

  bio: z
    .string()
    .trim()
    .max(1000, 'Bio must be at most 1000 characters')
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const profileFormSchema = updateProfileSchema.extend({
  avatarUrl: z.url('Invalid avatar URL').optional().or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const toUpdateProfilePayload = (
  values: ProfileFormValues,
): UpdateProfileInput => {
  const { avatarUrl: _avatarUrl, ...payload } = values;
  return payload;
};
