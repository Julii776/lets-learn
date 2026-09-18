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
    update(index, {
      ...fields[index],
      experience: level,
    });
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
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleSkip = () => {
    router.push(APP_ROUTES.ONBOARDING.LEARNING_GOALS);
  };

  return (
    <Dialog open={true}>
      <DialogContent
        showCloseButton={false}
        className="max-w-lg gap-0 p-6 sm:p-8"
      >
        <DialogHeader className="mb-7 items-center text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Step 02 / 04
          </p>

          <DialogTitle className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            What can you teach?
          </DialogTitle>

          <DialogDescription className="mt-2 max-w-md text-sm leading-6">
            Share the skills you&apos;re comfortable helping others learn.
            Choose up to {MAX_SKILLS}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isMaxed ? (
            <div className="space-y-3">
              <SkillSearchInput
                existingNames={fields.map((field) => field.name)}
                onAddSuggestion={handleAddSuggestion}
                onAddCustom={handleAddCustom}
              />

              <p className="px-1 text-xs text-muted-foreground">
                Search for a skill or add your own.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-muted/30 px-5 py-4 text-center">
              <p className="text-sm font-medium">
                You&apos;ve added {MAX_SKILLS} skills
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Remove a skill if you want to add another one.
              </p>
            </div>
          )}

          {!!fields.length && (
            <div className="space-y-3 mt-6 max-h-40 overflow-y-auto p-1">
              {fields.map((field, index) => (
                <SkillCard
                  key={field.id}
                  skill={field}
                  errorMessage={
                    errors.teachingSkills?.[index]?.skillName?.message
                  }
                  onRemove={() => remove(index)}
                  onExperienceChange={(level) =>
                    handleExperienceChange(index, level)
                  }
                />
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t pt-5">
            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              Skip for now
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
