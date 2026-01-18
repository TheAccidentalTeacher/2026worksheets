import { searchFreepik, getFreepikPreviewUrl, FreepikResource } from '../api/freepik';
import { searchVecteezy, getVecteezyPreviewUrl, VecteezyResource } from '../api/vecteezy';

export interface ResolvedAsset {
  id: string;
  source: 'freepik' | 'vecteezy' | 'ai';
  title: string;
  previewUrl: string;
  downloadUrl?: string;
  attribution?: string;
}

export interface AssetSearchOptions {
  maxResults?: number;
  preferredSource?: 'freepik' | 'vecteezy' | 'any';
  gradeLevel?: string; // K, 1-8
}

/**
 * Get grade-appropriate search modifiers
 */
function getGradeModifiers(gradeLevel?: string): string {
  if (!gradeLevel) return '';
  
  const grade = gradeLevel === 'K' ? 0 : parseInt(gradeLevel);
  
  if (grade <= 2) {
    // Early elementary: colorful, simple, cartoon-style
    return 'cartoon colorful kids';
  } else if (grade <= 5) {
    // Upper elementary: educational illustrations
    return 'educational illustration';
  } else {
    // Middle school: realistic, detailed, professional
    return 'realistic detailed professional';
  }
}

/**
 * Search for educational assets across all configured sources
 * Priority: Freepik → Vecteezy → AI Generation (future)
 */
export async function resolveAssets(
  keywords: string[],
  options: AssetSearchOptions = {}
): Promise<ResolvedAsset[]> {
  const { maxResults = 5, preferredSource = 'any', gradeLevel } = options;
  
  // Add grade-appropriate modifiers to search
  const gradeModifiers = getGradeModifiers(gradeLevel);
  const baseSearchTerm = keywords.join(' ');
  const searchTerm = gradeModifiers ? `${baseSearchTerm} ${gradeModifiers}` : baseSearchTerm;
  
  console.log(`[AssetResolver] Searching: "${searchTerm}" (grade: ${gradeLevel || 'unspecified'})`);
  
  const results: ResolvedAsset[] = [];

  // Try Freepik first (primary source)
  if (preferredSource === 'any' || preferredSource === 'freepik') {
    try {
      const freepikResults = await searchFreepik(searchTerm, {
        contentType: 'vector',
        perPage: maxResults,
      });

      const freepikAssets = freepikResults.map((r) => mapFreepikToAsset(r));
      results.push(...freepikAssets);

      if (results.length >= maxResults) {
        return results.slice(0, maxResults);
      }
    } catch (error) {
      console.warn('Freepik search failed, trying Vecteezy:', error);
    }
  }

  // Try Vecteezy as backup
  if (preferredSource === 'any' || preferredSource === 'vecteezy') {
    try {
      const remaining = maxResults - results.length;
      const vecteezyResults = await searchVecteezy(searchTerm, {
        contentType: 'vector',
        perPage: remaining,
      });

      const vecteezyAssets = vecteezyResults.map((r) => mapVecteezyToAsset(r));
      results.push(...vecteezyAssets);
    } catch (error) {
      console.warn('Vecteezy search failed:', error);
    }
  }

  return results.slice(0, maxResults);
}

/**
 * Find the best single asset for a set of keywords
 */
export async function findBestAsset(keywords: string[]): Promise<ResolvedAsset | null> {
  const results = await resolveAssets(keywords, { maxResults: 1 });
  return results[0] || null;
}

/**
 * Map Freepik resource to our unified asset format
 */
function mapFreepikToAsset(resource: FreepikResource): ResolvedAsset {
  return {
    id: `freepik-${resource.id}`,
    source: 'freepik',
    title: resource.title,
    previewUrl: getFreepikPreviewUrl(resource),
    downloadUrl: resource.url,
    attribution: 'Designed by Freepik',
  };
}

/**
 * Map Vecteezy resource to our unified asset format
 */
function mapVecteezyToAsset(resource: VecteezyResource): ResolvedAsset {
  return {
    id: `vecteezy-${resource.id}`,
    source: 'vecteezy',
    title: resource.title,
    previewUrl: getVecteezyPreviewUrl(resource),
    attribution: 'Vector by Vecteezy',
  };
}
