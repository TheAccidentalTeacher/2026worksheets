import { z } from 'zod';

// ============================================
// WORKSHEET TYPES
// ============================================

export const WorksheetTypeSchema = z.enum([
  'vocabulary-cards',
  'labeled-diagram',
  'multiple-choice',
  'fill-in-blank',
  'comparison-grid',
  'matching',
]);

export type WorksheetType = z.infer<typeof WorksheetTypeSchema>;

// ============================================
// GRADE LEVELS
// ============================================

export const GradeLevelSchema = z.enum([
  'K',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
]);

export type GradeLevel = z.infer<typeof GradeLevelSchema>;

// ============================================
// WORKSHEET REQUEST
// ============================================

export const WorksheetRequestSchema = z.object({
  topic: z.string().min(1).max(200),
  gradeLevel: GradeLevelSchema,
  worksheetType: WorksheetTypeSchema,
  additionalInstructions: z.string().max(500).optional(),
  includeAnswerKey: z.boolean().default(true),
  itemCount: z.number().min(3).max(20).default(6),
});

export type WorksheetRequest = z.infer<typeof WorksheetRequestSchema>;

// ============================================
// CONTENT ITEMS
// ============================================

export const VocabularyItemSchema = z.object({
  term: z.string(),
  definition: z.string(),
  imageKeywords: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
});

export type VocabularyItem = z.infer<typeof VocabularyItemSchema>;

export const MultipleChoiceItemSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
});

export type MultipleChoiceItem = z.infer<typeof MultipleChoiceItemSchema>;

export const LabeledDiagramItemSchema = z.object({
  term: z.string(),
  definition: z.string().optional(),
});

export type LabeledDiagramItem = z.infer<typeof LabeledDiagramItemSchema>;

// ============================================
// GENERATED WORKSHEET
// ============================================

export const GeneratedWorksheetSchema = z.object({
  id: z.string(),
  title: z.string(),
  topic: z.string(),
  gradeLevel: GradeLevelSchema,
  worksheetType: WorksheetTypeSchema,
  instructions: z.string().optional(),
  content: z.unknown(), // Varies by worksheet type
  answerKey: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  assets: z.array(z.object({
    id: z.string(),
    url: z.string(),
    attribution: z.string().optional(),
  })).optional(),
  createdAt: z.date(),
});

export type GeneratedWorksheet = z.infer<typeof GeneratedWorksheetSchema>;

// ============================================
// API RESPONSE
// ============================================

export const WorksheetResponseSchema = z.object({
  success: z.boolean(),
  worksheet: GeneratedWorksheetSchema.optional(),
  pdfUrl: z.string().optional(),
  previewUrl: z.string().optional(),
  error: z.string().optional(),
});

export type WorksheetResponse = z.infer<typeof WorksheetResponseSchema>;
