import { z } from 'zod';

const learningGoalFormItemSchema = z.object({
  skillId: z.uuid().optional(),
  skillName: z.string().trim().min(2).max(60),
});

export const learningGoalsFormSchema = z.object({
  learningGoals: z.array(learningGoalFormItemSchema),
});

export type LearningGoalsFormValues = z.infer<typeof learningGoalsFormSchema>;

const learningGoalPayloadItemSchema = z.union([
  z.object({
    skillId: z.uuid(),
  }),

  z.object({
    skillName: z.string().trim().min(2).max(60),
  }),
]);

export const addLearningGoalsSchema = z.object({
  learningGoals: z.array(learningGoalPayloadItemSchema),
});

export type AddLearningGoalsInput = z.infer<typeof addLearningGoalsSchema>;

export function toLearningGoalsPayload(
  values: LearningGoalsFormValues,
): AddLearningGoalsInput {
  const payload: AddLearningGoalsInput = {
    learningGoals: values.learningGoals.map(({ skillId, skillName }) => {
      if (skillId) {
        return {
          skillId,
        };
      }

      return {
        skillName: skillName.trim(),
      };
    }),
  };

  return addLearningGoalsSchema.parse(payload);
}
