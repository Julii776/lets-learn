export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export type User = {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  email: string;
  emailVerified: boolean;
  status: UserStatus;
};

export type UpdateUserResponse = { user: User };
