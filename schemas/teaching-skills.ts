// Place at: @/schemas/teaching-skills.schema.ts
import { z } from 'zod';

// ⚠️ Mirror of the backend's Prisma `SkillExperience` enum. Keep these two
// in sync manually, or — better — import the enum from a shared package if
// your frontend and backend live in the same monorepo, so they can never drift.
export const SKILL_EXPERIENCE_VALUES = [
  'BEGINNER',
  'COMFORTABLE',
  'ADVANCED',
] as const;

export const skillExperienceSchema = z.enum(SKILL_EXPERIENCE_VALUES);
export type SkillExperience = z.infer<typeof skillExperienceSchema>;

// ---------------------------------------------------------------------------
// 1. Exact mirror of the backend schema. This is what actually gets sent
//    over the wire, and what we re-validate against right before the fetch
//    call — so a bug in the form layer can't produce a bad request body.
// ---------------------------------------------------------------------------
const teachingSkillItemSchema = z
  .object({
    skillId: z.uuid().optional(),
    skillName: z.string().trim().min(2).max(60).optional(),
    experience: skillExperienceSchema,
  })
  .refine((data) => !!data.skillId || !!data.skillName, {
    message: 'Either skillId or skillName is required',
    path: ['skillId'],
  })
  .refine((data) => !(data.skillId && data.skillName), {
    message: 'Provide only one of skillId or skillName, not both',
    path: ['skillName'],
  });

export const addTeachingSkillsSchema = z.object({
  teachingSkills: z
    .array(teachingSkillItemSchema)
    .min(1, 'At least one skill is required')
    .max(5, 'Too many skills in one request')
    .refine(
      (items) => {
        const ids = items.map((i) => i.skillId).filter(Boolean);
        return new Set(ids).size === ids.length;
      },
      { message: 'Duplicate skillId entries in payload' },
    ),
});

export type AddTeachingSkillsInput = z.infer<typeof addTeachingSkillsSchema>;

// ---------------------------------------------------------------------------
// 2. Form schema: the same rules, plus two UI-only fields (`name`, `category`)
//    so the card can render a label without a second lookup table. `name` and
//    `category` are never required by validation and get stripped out before
//    the payload is sent (see `toTeachingSkillsPayload` below) — the backend
//    never sees them. Keeping the *rules* identical (same refines, same
//    limits) means a form that passes validation is guaranteed to also pass
//    `addTeachingSkillsSchema` once the UI fields are dropped.
// ---------------------------------------------------------------------------
const teachingSkillFormItemSchema = z
  .object({
    skillId: z.uuid().optional(),
    skillName: z.string().trim().min(2).max(60).optional(),
    experience: skillExperienceSchema,
    name: z.string().min(1), // shown on the card; not sent to the API
  })
  .refine((data) => !!data.skillId || !!data.skillName, {
    message: 'Either skillId or skillName is required',
    path: ['skillId'],
  })
  .refine((data) => !(data.skillId && data.skillName), {
    message: 'Provide only one of skillId or skillName, not both',
    path: ['skillName'],
  });

export const teachingSkillsFormSchema = z.object({
  teachingSkills: z
    .array(teachingSkillFormItemSchema)
    .max(5, 'You can add up to 5 skills')
    .refine(
      (items) => {
        const ids = items.map((i) => i.skillId).filter(Boolean);
        return new Set(ids).size === ids.length;
      },
      { message: 'You added the same skill twice' },
    ),
});

export type TeachingSkillsFormValues = z.infer<typeof teachingSkillsFormSchema>;
export type TeachingSkillFormItem =
  TeachingSkillsFormValues['teachingSkills'][number];

/**
 * Strips the UI-only fields and re-validates against the exact backend
 * shape. Call this right before the fetch — if it ever throws, that's a bug
 * in the form logic, not a user error (the form's own validation should
 * have already caught anything the user could cause).
 */
export function toTeachingSkillsPayload(
  values: TeachingSkillsFormValues,
): AddTeachingSkillsInput {
  return addTeachingSkillsSchema.parse({
    teachingSkills: values.teachingSkills.map(
      ({ skillId, skillName, experience }) => ({
        skillId,
        skillName,
        experience,
      }),
    ),
  });
}

// ---------------------------------------------------------------------------
// 3. Schema for the search API's response, so a malformed/changed API
//    response fails loudly in development instead of silently rendering
//    `undefined` suggestion cards.
// ---------------------------------------------------------------------------
export const skillSuggestionSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export const skillSuggestionsResponseSchema = z.array(skillSuggestionSchema);
export type SkillSuggestion = z.infer<typeof skillSuggestionSchema>;
