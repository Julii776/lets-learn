import { API_BASE_URL } from '@/constants/api';

import apiClient from '@/lib/api-clients';

import type { AddTeachingSkillsInput } from '@/schemas/teaching-skills';

const URLS = {
  ADD_TEACHING_SKILLS: `${API_BASE_URL}/users/me/teaching-skills`,
};

class UsersApi {
  static addTeachingSkills(payload: AddTeachingSkillsInput) {
    return apiClient.post(URLS.ADD_TEACHING_SKILLS, payload);
  }
}

export default UsersApi;
