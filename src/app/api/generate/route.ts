import { NextRequest, NextResponse } from 'next/server';
import { generateWorksheet, generateWorksheetContentOnly } from '@/lib/services/worksheet-generator';
import { WorksheetType, GradeLevel } from '@/types/worksheet';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { topic, gradeLevel, worksheetType, additionalInstructions, includeAssets = true } = body;

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: topic' },
        { status: 400 }
      );
    }

    if (!gradeLevel || !isValidGradeLevel(gradeLevel)) {
      return NextResponse.json(
        { error: 'Invalid grade level. Valid values: K, 1, 2, 3, 4, 5, 6, 7, 8' },
        { status: 400 }
      );
    }

    if (!worksheetType || !isValidWorksheetType(worksheetType)) {
      return NextResponse.json(
        { error: 'Invalid worksheet type. Valid values: vocabulary-cards, labeled-diagram, multiple-choice, fill-in-blank, matching, word-search, crossword, sequencing' },
        { status: 400 }
      );
    }

    console.log(`[API] Generating worksheet: ${topic} (${worksheetType}) for grade ${gradeLevel}`);

    // Generate the worksheet
    const worksheet = includeAssets
      ? await generateWorksheet({
          topic,
          gradeLevel: gradeLevel as GradeLevel,
          worksheetType: worksheetType as WorksheetType,
          additionalInstructions,
        })
      : await generateWorksheetContentOnly({
          topic,
          gradeLevel: gradeLevel as GradeLevel,
          worksheetType: worksheetType as WorksheetType,
          additionalInstructions,
        });

    console.log(`[API] Worksheet generated successfully: ${worksheet.id}`);

    return NextResponse.json({
      success: true,
      worksheet,
    });
  } catch (error) {
    console.error('[API] Error generating worksheet:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate worksheet',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'Worksheet Generator API',
    version: '1.0.0',
    endpoints: {
      POST: {
        description: 'Generate a worksheet',
        body: {
          topic: 'string (required)',
          gradeLevel: 'K | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 (required)',
          worksheetType: 'vocabulary-cards | labeled-diagram | multiple-choice | fill-in-blank | matching | word-search | crossword | sequencing (required)',
          additionalInstructions: 'string (optional)',
          includeAssets: 'boolean (optional, default: true)',
        },
      },
    },
  });
}

function isValidGradeLevel(level: string): level is GradeLevel {
  return ['K', '1', '2', '3', '4', '5', '6', '7', '8'].includes(level);
}

function isValidWorksheetType(type: string): type is WorksheetType {
  return [
    'vocabulary-cards',
    'labeled-diagram',
    'multiple-choice',
    'fill-in-blank',
    'matching',
    'word-search',
    'crossword',
    'sequencing',
  ].includes(type);
}
