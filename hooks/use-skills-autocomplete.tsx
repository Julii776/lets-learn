import SkillsApi from '@/apis/skills';

import { skillSuggestionsResponseSchema } from '@/schemas/teaching-skills';

const useSkillsAutocomplete = () => {
  const fetchSkills = async (term: string) => {
    try {
      const res = await SkillsApi.searchSkills(term);
      const parsed = skillSuggestionsResponseSchema.safeParse(res.data);

      if (!parsed.success) {
        return [];
      }

      return parsed.data.map((skill) => ({
        value: skill.id ?? skill.name, // whatever your unique key is
        label: skill.name,
        skill,
      }));
    } catch {
      return [];
    }
  };

  return { fetchSkills };
};

export default useSkillsAutocomplete;
