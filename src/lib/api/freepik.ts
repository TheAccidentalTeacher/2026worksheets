import axios from 'axios';

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_BASE_URL = 'https://api.freepik.com/v1';

export interface FreepikResource {
  id: number;
  title: string;
  url: string;
  filename: string;
  image: {
    type: string;
    orientation: string;
    source: {
      key: string;
      url: string;
      size: string;
    };
  };
  licenses: { type: string; url: string }[];
  meta: {
    available_formats: Record<string, { total: number }>;
  };
}

export interface FreepikSearchResult {
  data: FreepikResource[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
  };
}

/**
 * Search Freepik for vector illustrations
 * NOTE: Use 'term' parameter, NOT 'query'!
 */
export async function searchFreepik(
  searchTerm: string,
  options: {
    contentType?: 'vector' | 'photo' | 'psd' | 'icon';
    perPage?: number;
    page?: number;
  } = {}
): Promise<FreepikResource[]> {
  const { contentType = 'vector', perPage = 10, page = 1 } = options;

  if (!FREEPIK_API_KEY) {
    throw new Error('FREEPIK_API_KEY is not configured');
  }

  try {
    const params = new URLSearchParams({
      term: searchTerm,
      order: 'relevance',
      per_page: String(perPage),
      page: String(page),
    });

    // Add content type filter
    if (contentType === 'vector') {
      params.append('filters[content_type][vector]', '1');
    } else if (contentType === 'photo') {
      params.append('filters[content_type][photo]', '1');
    }

    const response = await axios.get<FreepikSearchResult>(
      `${FREEPIK_BASE_URL}/resources?${params.toString()}`,
      {
        headers: {
          'x-freepik-api-key': FREEPIK_API_KEY,
        },
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.error('Freepik API error:', error);
    throw error;
  }
}

/**
 * Get the preview image URL for a Freepik resource
 */
export function getFreepikPreviewUrl(resource: FreepikResource): string {
  return resource.image?.source?.url || '';
}

/**
 * Search for educational illustrations with optimized keywords
 */
export async function searchEducationalIllustration(
  keywords: string[],
  options: { perPage?: number } = {}
): Promise<FreepikResource[]> {
  // Join keywords and add educational context
  const searchTerm = keywords.join(' ') + ' diagram illustration educational';
  return searchFreepik(searchTerm, { ...options, contentType: 'vector' });
}
