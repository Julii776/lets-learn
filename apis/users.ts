import { API_BASE_URL } from '@/constants/api';

import apiClient from '@/lib/api-clients';

import type { AddLearningGoalsInput } from '@/schemas/learning-goals';
import type { AddTeachingSkillsInput } from '@/schemas/teaching-skills';

const URLS = {
  TEACHING_SKILLS: `${API_BASE_URL}/users/me/teaching-skills`,
  LEARNING_GOALS: `${API_BASE_URL}/users/me/learning-goals`,
};

class UsersApi {
  static addTeachingSkills(payload: AddTeachingSkillsInput) {
    return apiClient.post(URLS.TEACHING_SKILLS, payload);
  }

  static addLearningGoals(payload: AddLearningGoalsInput) {
    return apiClient.post(URLS.LEARNING_GOALS, payload);
  }
}

export default UsersApi;
