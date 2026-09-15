import { API_BASE_URL } from '@/constants/api';

import apiClient from '@/lib/api-clients';

const URLS = {
  SKILL_SEARCH: `${API_BASE_URL}/skills/search`,
};

class SkillsApi {
  static searchSkills(query: string, signal?: AbortSignal) {
    return apiClient.get(URLS.SKILL_SEARCH, {
      params: {
        q: query,
      },

      signal,
    });
  }
}

export default SkillsApi;
