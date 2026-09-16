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
    append({ skillId: skill.id, skillName: skill.name });
  };

  const handleAddCustom = (name: string) => {
    append({ skillName: name });
  };

  const onSubmit = async (values: LearningGoalsFormValues) => {
    if (!values.learningGoals.length) {
      router.push(APP_ROUTES.ONBOARDING.COMPLETE);
      return;
    }

    const payload = toLearningGoalsPayload(values);
    try {
      await UsersApi.addLearningGoals(payload);
      router.push(APP_ROUTES.ONBOARDING.COMPLETE);
    } catch (_err) {
      toast.error('Something went wrongg');
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false} className="max-w-lg">
        <DialogHeader>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Step 03 / 04
          </p>

          <DialogTitle className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">
            Your Learning Goals
          </DialogTitle>

          <DialogDescription>
            Tell us what do you want to learn.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <SkillSearchInput
            existingNames={fields.map((f) => f.skillName || '')}
            onAddSuggestion={handleAddSuggestion}
            onAddCustom={handleAddCustom}
          />

          <div className="flex gap-2 flex-wrap">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-primary bg-primary/10 text-primary rounded-2xl p-2 py-1 flex gap-2 items-center font-medium text-muted-foreground"
              >
                {field.skillName}
                <button
                  type="button"
                  className="hover:text-foreground"
                  onClick={() => remove(index)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end gap-4">
            <Button
              type="button"
              disabled={isSubmitting}
              variant="outline"
              onClick={() => router.push(APP_ROUTES.ONBOARDING.COMPLETE)}
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

export default LearningGoals;
