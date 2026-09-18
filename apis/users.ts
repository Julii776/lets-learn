import type { AxiosResponse } from 'axios';

import { API_BASE_URL } from '@/constants/api';

import apiClient from '@/lib/api-clients';

import type { AddLearningGoalsInput } from '@/schemas/learning-goals';
import type { AddTeachingSkillsInput } from '@/schemas/teaching-skills';
import type { UpdateProfileInput } from '@/schemas/user';

import type { UpdateUserResponse } from '@/types/api/user';

const URLS = {
  PROFILE: `${API_BASE_URL}/users/me`,
  TEACHING_SKILLS: `${API_BASE_URL}/users/me/teaching-skills`,
  LEARNING_GOALS: `${API_BASE_URL}/users/me/learning-goals`,
};

class UsersApi {
  static updateUserDetail(
    payload: UpdateProfileInput,
  ): Promise<AxiosResponse<UpdateUserResponse>> {
    return apiClient.patch(URLS.PROFILE, payload);
  }
  static addTeachingSkills(payload: AddTeachingSkillsInput) {
    return apiClient.post(URLS.TEACHING_SKILLS, payload);
  }

  static addLearningGoals(payload: AddLearningGoalsInput) {
    return apiClient.post(URLS.LEARNING_GOALS, payload);
  }
}

export default UsersApi;
