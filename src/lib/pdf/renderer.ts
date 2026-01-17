import React from 'react';
import { renderToBuffer, DocumentProps } from '@react-pdf/renderer';
import { VocabularyCards } from '@/templates/vocabulary-cards';
import { MultipleChoice } from '@/templates/multiple-choice';
import { FillInBlank } from '@/templates/fill-in-blank';
import { Matching } from '@/templates/matching';
import { GeneratedContent } from '@/lib/api/openai';
import { ResolvedAsset } from '@/lib/assets/resolver';
import { WorksheetType } from '@/types/worksheet';

// Import fonts to register them
import '@/lib/pdf/fonts';

export interface RenderOptions {
  worksheetType: WorksheetType;
  content: GeneratedContent;
  assets?: ResolvedAsset[];
  options?: {
    showImages?: boolean;
    cardStyle?: 'standard' | 'flashcard';
    showAnswerKey?: boolean;
  };
}

/**
 * Render a worksheet to a PDF buffer
 */
export async function renderWorksheetToPdf(
  renderOptions: RenderOptions
): Promise<Buffer> {
  const { worksheetType, content, assets, options } = renderOptions;

  // Build the React element based on worksheet type
  let element: React.ReactElement<DocumentProps>;

  switch (worksheetType) {
    case 'vocabulary-cards':
      element = React.createElement(VocabularyCards, {
        content,
        assets,
        showImages: options?.showImages ?? true,
        cardStyle: options?.cardStyle ?? 'standard',
      }) as React.ReactElement<DocumentProps>;
      break;

    case 'multiple-choice':
      element = React.createElement(MultipleChoice, {
        content,
        showAnswerKey: options?.showAnswerKey ?? true,
      }) as React.ReactElement<DocumentProps>;
      break;

    case 'fill-in-blank':
      element = React.createElement(FillInBlank, {
        content,
        showAnswerKey: options?.showAnswerKey ?? true,
      }) as React.ReactElement<DocumentProps>;
      break;

    case 'matching':
      element = React.createElement(Matching, {
        content,
        showAnswerKey: options?.showAnswerKey ?? true,
      }) as React.ReactElement<DocumentProps>;
      break;

    default:
      throw new Error(`Template not implemented: ${worksheetType}`);
  }

  // Render to buffer
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}

/**
 * Get supported template types
 */
export function getSupportedTemplates(): WorksheetType[] {
  return ['vocabulary-cards', 'multiple-choice', 'fill-in-blank', 'matching'];
}

/**
 * Check if a template is supported
 */
export function isTemplateSupported(type: WorksheetType): boolean {
  return getSupportedTemplates().includes(type);
}
