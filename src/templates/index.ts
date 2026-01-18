// Template index - exports all worksheet templates
export { VocabularyCards } from './vocabulary-cards';
export { MultipleChoice } from './multiple-choice';
export { FillInBlank } from './fill-in-blank';
export { Matching } from './matching';
export { LabeledDiagram } from './labeled-diagram';
export { ComparisonGrid } from './comparison-grid';

// Template registry for dynamic loading
export const templateRegistry = {
  'vocabulary-cards': () => import('./vocabulary-cards').then(m => m.VocabularyCards),
  'multiple-choice': () => import('./multiple-choice').then(m => m.MultipleChoice),
  'fill-in-blank': () => import('./fill-in-blank').then(m => m.FillInBlank),
  'matching': () => import('./matching').then(m => m.Matching),
  'labeled-diagram': () => import('./labeled-diagram').then(m => m.LabeledDiagram),
  'comparison-grid': () => import('./comparison-grid').then(m => m.ComparisonGrid),
} as const;

export type TemplateName = keyof typeof templateRegistry;
