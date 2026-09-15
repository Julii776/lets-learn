'use client';

import type { ActionMeta } from 'react-select';

import useSkillsAutocomplete from '@/hooks/use-skills-autocomplete';

import type { SkillSuggestion } from '@/schemas/teaching-skills';

import AsyncSelect from '@/components/ui/react-select';

interface SkillSearchInputProps {
  disabled?: boolean;
  existingNames: string[];
  onAddSuggestion: (skill: SkillSuggestion) => void;
  onAddCustom: (name: string) => void;
}

const SkillSearchInput = ({
  disabled,
  onAddSuggestion,
  onAddCustom,
}: SkillSearchInputProps) => {
  const { fetchSkills } = useSkillsAutocomplete();

  const handleChange = (
    newValue: unknown,
    _actionMeta: ActionMeta<unknown>,
  ) => {
    const option = newValue as {
      value: string;
      label: string;
      skill: SkillSuggestion;
    } | null;

    if (!option) return;

    onAddSuggestion(option.skill);
  };

  const handleCreate = (inputValue: string) => {
    const name = inputValue.trim();

    onAddCustom(name);
  };

  return (
    <AsyncSelect
      name="search-skill"
      cacheOptions
      defaultOptions={true}
      isDisabled={disabled}
      loadOptions={fetchSkills}
      onChange={handleChange}
      onCreateOption={handleCreate}
      isClearable
      placeholder="e.g. Public speaking"
      noOptionsMessage={() => 'No matching skills'}
      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
    />
  );
};

export default SkillSearchInput;
