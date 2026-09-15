'use client';

import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

import type {
  SkillExperience,
  TeachingSkillFormItem,
} from '@/schemas/teaching-skills';

import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const EXPERIENCE_LEVELS: { value: SkillExperience; label: string }[] = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'COMFORTABLE', label: 'Comfortable' },
  { value: 'ADVANCED', label: 'Advanced' },
];

interface SkillCardProps {
  skill: TeachingSkillFormItem;
  errorMessage?: string;
  onRemove: () => void;
  onExperienceChange: (level: SkillExperience) => void;
}

const SkillCard = ({ skill, onRemove, onExperienceChange }: SkillCardProps) => {
  return (
    <Card className="py-0 relative">
      <button
        type="button"
        className="absolute right-4 top-2 text-muted-foreground hover:text-foreground"
        onClick={onRemove}
      >
        <X size={14} />
      </button>
      <CardContent className="p-2">
        <p className="text-md font-semibold">{skill.name}</p>
        <ToggleGroup
          onValueChange={(value) =>
            value && onExperienceChange(value[0] as SkillExperience)
          }
          className="justify-start"
        >
          {EXPERIENCE_LEVELS.map((level) => (
            <ToggleGroupItem
              key={level.value}
              value={level.value}
              className={cn('border h-6 text-sm text-muted-foreground', {
                'bg-success-bg/20 text-success hover:bg-success-bg/20 hover:text-success':
                  level.value === skill.experience,
              })}
            >
              {level.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
