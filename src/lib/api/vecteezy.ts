import axios from 'axios';

const VECTEEZY_ACCOUNT_ID = process.env.VECTEEZY_ACCOUNT_ID;
const VECTEEZY_SECRET_KEY = process.env.VECTEEZY_SECRET_KEY;
const VECTEEZY_BASE_URL = 'https://api.vecteezy.com/v2';

export interface VecteezyResource {
  id: number;
  content_type: string;
  title: string;
  tags: string[];
  thumbnail_url: string;
  thumbnail_2x_url: string;
  preview_url: string;
  file_metadata: {
    available_file_types: { extension: string; size_in_bytes: number }[];
  };
}

export interface VecteezySearchResult {
  page: number;
  last_page: number;
  per_page: number;
  total_resources: number;
  resources: VecteezyResource[];
}

/**
 * Search Vecteezy for vector illustrations
 * NOTE: Use 'term' parameter (required!)
 */
export async function searchVecteezy(
  searchTerm: string,
  options: {
    contentType?: 'vector' | 'photo' | 'png' | 'svg';
    perPage?: number;
    page?: number;
  } = {}
): Promise<VecteezyResource[]> {
  const { contentType = 'vector', perPage = 10, page = 1 } = options;

  if (!VECTEEZY_ACCOUNT_ID || !VECTEEZY_SECRET_KEY) {
    throw new Error('Vecteezy API credentials are not configured');
  }

  try {
    const params = new URLSearchParams({
      term: searchTerm,
      content_type: contentType,
      per_page: String(perPage),
      page: String(page),
    });

    const response = await axios.get<VecteezySearchResult>(
      `${VECTEEZY_BASE_URL}/${VECTEEZY_ACCOUNT_ID}/resources?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${VECTEEZY_SECRET_KEY}`,
        },
      }
    );

    return response.data.resources || [];
  } catch (error) {
    console.error('Vecteezy API error:', error);
    throw error;
  }
}

/**
 * Get the preview image URL for a Vecteezy resource
 */
export function getVecteezyPreviewUrl(resource: VecteezyResource): string {
  return resource.preview_url || resource.thumbnail_2x_url || resource.thumbnail_url;
}

/**
 * Search for educational illustrations with optimized keywords
 */
export async function searchVecteezyEducational(
  keywords: string[],
  options: { perPage?: number } = {}
): Promise<VecteezyResource[]> {
  // Join keywords for educational search
  const searchTerm = keywords.join(' ') + ' diagram';
  return searchVecteezy(searchTerm, { ...options, contentType: 'vector' });
}
