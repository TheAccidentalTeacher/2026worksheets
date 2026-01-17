// Template index - exports all worksheet templates
export { VocabularyCards } from './vocabulary-cards';

// Template registry for dynamic loading
export const templateRegistry = {
  'vocabulary-cards': () => import('./vocabulary-cards').then(m => m.VocabularyCards),
  // Add more templates here as they're created:
  // 'labeled-diagram': () => import('./labeled-diagram').then(m => m.LabeledDiagram),
  // 'multiple-choice': () => import('./multiple-choice').then(m => m.MultipleChoice),
  // 'fill-in-blank': () => import('./fill-in-blank').then(m => m.FillInBlank),
} as const;

export type TemplateName = keyof typeof templateRegistry;
