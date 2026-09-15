'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import UsersApi from '@/apis/users';

import { APP_ROUTES } from '@/constants/routes';

import {
  type SkillExperience,
  type SkillSuggestion,
  type TeachingSkillsFormValues,
  teachingSkillsFormSchema,
  toTeachingSkillsPayload,
} from '@/schemas/teaching-skills';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useRouter } from '@/i18n/navigation';

import SkillSearchInput from './search-input';
import SkillCard from './skill-card';

const MAX_SKILLS = 5;

const TeachSkillsDialog = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeachingSkillsFormValues>({
    resolver: zodResolver(teachingSkillsFormSchema),
    mode: 'onChange',
    defaultValues: {
      teachingSkills: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'teachingSkills',
  });

  const isMaxed = fields.length >= MAX_SKILLS;

  const handleAddSuggestion = (skill: SkillSuggestion) => {
    if (isMaxed) return;
    append({
      skillId: skill.id,
      name: skill.name,
      experience: 'COMFORTABLE',
    });
  };

  const handleAddCustom = (name: string) => {
    if (isMaxed) return;
    append({
      skillName: name,
      name,
      experience: 'COMFORTABLE',
    });
  };

  const handleExperienceChange = (index: number, level: SkillExperience) => {
    update(index, { ...fields[index], experience: level });
  };

  const onSubmit = async (values: TeachingSkillsFormValues) => {
    if (!values.teachingSkills.length) {
      router.push(APP_ROUTES.ONBOARDING.LEARNING_GOALS);
      return;
    }
    try {
      const payload = toTeachingSkillsPayload(values);

      await UsersApi.addTeachingSkills(payload);
      router.push(APP_ROUTES.ONBOARDING.LEARNING_GOALS);
    } catch (_err) {
      toast.error('Something went wrongg');
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false} className="max-w-lg">
        <DialogHeader>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Step 02 / 04
          </p>

          <DialogTitle className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">
            Your Skills
          </DialogTitle>

          <DialogDescription>
            Add up to 5 skills you want to share.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <SkillCard
              key={field.id}
              skill={field}
              errorMessage={errors.teachingSkills?.[index]?.skillName?.message}
              onRemove={() => remove(index)}
              onExperienceChange={(level) =>
                handleExperienceChange(index, level)
              }
            />
          ))}

          <SkillSearchInput
            disabled={isMaxed}
            existingNames={fields.map((f) => f.name)}
            onAddSuggestion={handleAddSuggestion}
            onAddCustom={handleAddCustom}
          />

          <div className="w-full flex justify-end gap-4">
            <Button
              type="button"
              disabled={isSubmitting}
              variant="outline"
              onClick={() => router.push(APP_ROUTES.ONBOARDING.LEARNING_GOALS)}
            >
              Skip
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeachSkillsDialog;
