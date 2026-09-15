import type { SkillSuggestion } from '@/schemas/teaching-skills';

export type SkillOption = {
  value: string;
  label: string;
  skill: SkillSuggestion;
};
