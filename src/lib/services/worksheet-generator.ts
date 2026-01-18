import { generateWorksheetContent, GeneratedContent } from '@/lib/api/openai';
import { resolveAssets, ResolvedAsset } from '@/lib/assets/resolver';
import { WorksheetType, GradeLevel } from '@/types/worksheet';

export interface WorksheetGenerationRequest {
  topic: string;
  gradeLevel: GradeLevel;
  worksheetType: WorksheetType;
  additionalInstructions?: string;
}

export interface GeneratedWorksheet {
  id: string;
  topic: string;
  gradeLevel: GradeLevel;
  worksheetType: WorksheetType;
  content: GeneratedContent;
  assets: ResolvedAsset[];
  createdAt: Date;
}

/**
 * Main worksheet generation service
 * Orchestrates content generation and asset resolution
 */
export async function generateWorksheet(
  request: WorksheetGenerationRequest
): Promise<GeneratedWorksheet> {
  const { topic, gradeLevel, worksheetType, additionalInstructions } = request;

  // Step 1: Generate content using OpenAI
  console.log(`[Generator] Generating content for "${topic}" (${worksheetType})`);
  
  const content = await generateWorksheetContent({
    topic,
    gradeLevel,
    worksheetType,
    additionalInstructions,
  });

  console.log(`[Generator] Content generated: ${content.items?.length || 0} items`);

  // Step 2: Collect all image keywords from the content
  const allKeywords = extractImageKeywords(content, worksheetType, topic);
  console.log(`[Generator] Image keywords:`, allKeywords);

  // Step 3: Resolve assets for each keyword set (with grade-level awareness)
  const assets: ResolvedAsset[] = [];
  
  for (const keywords of allKeywords) {
    try {
      const resolved = await resolveAssets(keywords, {
        maxResults: 1,
        gradeLevel: gradeLevel, // Pass grade level for age-appropriate images
      });
      if (resolved.length > 0) {
        assets.push(resolved[0]);
      }
    } catch (error) {
      console.warn(`[Generator] Failed to resolve asset for keywords:`, keywords, error);
    }
  }

  console.log(`[Generator] Resolved ${assets.length} assets (grade: ${gradeLevel})`);

  // Step 4: Create the worksheet object
  const worksheet: GeneratedWorksheet = {
    id: generateId(),
    topic,
    gradeLevel,
    worksheetType,
    content,
    assets,
    createdAt: new Date(),
  };

  return worksheet;
}

/**
 * Extract image keywords from generated content
 */
function extractImageKeywords(
  content: GeneratedContent,
  worksheetType: WorksheetType,
  topic: string
): string[][] {
  const keywords: string[][] = [];

  // Get diagram keywords if present
  if ('diagramKeywords' in content && Array.isArray((content as Record<string, unknown>).diagramKeywords)) {
    keywords.push((content as Record<string, unknown>).diagramKeywords as string[]);
  }

  // Get per-item keywords
  if (content.items) {
    for (const item of content.items) {
      if (item.imageKeywords && item.imageKeywords.length > 0) {
        keywords.push(item.imageKeywords);
      }
    }
  }

  // If no keywords were extracted, create default based on topic
  if (keywords.length === 0) {
    // Create sensible default keywords based on worksheet type
    switch (worksheetType) {
      case 'vocabulary-cards':
        keywords.push([topic, 'educational', 'illustration']);
        break;
      case 'labeled-diagram':
        keywords.push([topic, 'diagram', 'parts', 'labeled']);
        break;
      default:
        keywords.push([topic, 'educational']);
    }
  }

  return keywords;
}

/**
 * Generate a unique ID for the worksheet
 */
function generateId(): string {
  return `ws_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate worksheet with content only (no asset resolution)
 * Faster for testing/previewing
 */
export async function generateWorksheetContentOnly(
  request: WorksheetGenerationRequest
): Promise<Omit<GeneratedWorksheet, 'assets'> & { assets: [] }> {
  const { topic, gradeLevel, worksheetType, additionalInstructions } = request;

  const content = await generateWorksheetContent({
    topic,
    gradeLevel,
    worksheetType,
    additionalInstructions,
  });

  return {
    id: generateId(),
    topic,
    gradeLevel,
    worksheetType,
    content,
    assets: [],
    createdAt: new Date(),
  };
}
