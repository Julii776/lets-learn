'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import UsersApi from '@/apis/users';

import { APP_ROUTES } from '@/constants/routes';

import {
  type LearningGoalsFormValues,
  learningGoalsFormSchema,
  toLearningGoalsPayload,
} from '@/schemas/learning-goals';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { Skill } from '@/types/api/skills';

import { useRouter } from '@/i18n/navigation';

import SkillSearchInput from '../teaching-skills/search-input';

const LearningGoals = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LearningGoalsFormValues>({
    resolver: zodResolver(learningGoalsFormSchema),
    defaultValues: {
      learningGoals: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'learningGoals',
  });

  const handleAddSuggestion = (skill: Skill) => {
    append({
      skillId: skill.id,
      skillName: skill.name,
    });
  };

  const handleAddCustom = (name: string) => {
    append({
      skillName: name,
    });
  };

  const onSubmit = async (values: LearningGoalsFormValues) => {
    if (!values.learningGoals.length) {
      router.push(APP_ROUTES.ONBOARDING.COMPLETE);
      return;
    }

    try {
      const payload = toLearningGoalsPayload(values);

      await UsersApi.addLearningGoals(payload);

      router.push(APP_ROUTES.ONBOARDING.COMPLETE);
    } catch (_err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleSkip = () => {
    router.push(APP_ROUTES.ONBOARDING.COMPLETE);
  };

  return (
    <Dialog open={true}>
      <DialogContent
        showCloseButton={false}
        className="max-w-lg gap-0 p-6 sm:p-8"
      >
        <DialogHeader className="mb-7 items-center text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Step 03 / 04
          </p>
          <DialogTitle className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            What do you want to learn?
          </DialogTitle>

          <DialogDescription className="mt-2 max-w-md text-sm leading-6">
            Add a few skills you&apos;re curious about. We&apos;ll use them to
            help you discover people who can teach you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <SkillSearchInput
              existingNames={fields.map((field) => field.skillName || '')}
              onAddSuggestion={handleAddSuggestion}
              onAddCustom={handleAddCustom}
            />

            <p className="px-1 text-xs text-muted-foreground">
              Search for a skill or add your own.
            </p>
          </div>

          {!!fields.length && (
            <div className="flex flex-wrap gap-2 mt-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="group flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/10"
                >
                  <span>{field.skillName}</span>

                  <button
                    type="button"
                    aria-label={`Remove ${field.skillName}`}
                    className="ml-0.5 rounded-full p-0.5 text-primary/50 transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => remove(index)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
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

export default LearningGoals;
