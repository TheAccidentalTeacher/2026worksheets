import { NextRequest, NextResponse } from 'next/server';
import { renderWorksheetToPdf, isTemplateSupported } from '@/lib/pdf/renderer';
import { WorksheetType, GradeLevel } from '@/types/worksheet';
import { generateWorksheet } from '@/lib/services/worksheet-generator';
import { HeaderConfig, FooterConfig } from '@/types/branding';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      topic, 
      gradeLevel, 
      worksheetType, 
      additionalInstructions,
      options = {},
      branding = {},
    } = body;

    // Validate required fields
    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: topic' },
        { status: 400 }
      );
    }

    if (!gradeLevel) {
      return NextResponse.json(
        { error: 'Missing required field: gradeLevel' },
        { status: 400 }
      );
    }

    if (!worksheetType) {
      return NextResponse.json(
        { error: 'Missing required field: worksheetType' },
        { status: 400 }
      );
    }

    // Check if template is supported
    if (!isTemplateSupported(worksheetType as WorksheetType)) {
      return NextResponse.json(
        { 
          error: `Template not yet implemented: ${worksheetType}`,
          supportedTemplates: ['vocabulary-cards'],
        },
        { status: 400 }
      );
    }

    console.log(`[PDF API] Generating PDF: ${topic} (${worksheetType})`);

    // Step 1: Generate the worksheet content and assets
    const worksheet = await generateWorksheet({
      topic,
      gradeLevel: gradeLevel as GradeLevel,
      worksheetType: worksheetType as WorksheetType,
      additionalInstructions,
    });

    console.log(`[PDF API] Content generated, rendering PDF...`);

    // Step 2: Render to PDF with branding
    const pdfBuffer = await renderWorksheetToPdf({
      worksheetType: worksheetType as WorksheetType,
      content: worksheet.content,
      assets: worksheet.assets,
      options,
      branding: {
        headerConfig: branding.headerConfig as Partial<HeaderConfig>,
        footerConfig: branding.footerConfig as Partial<FooterConfig>,
      },
    });

    console.log(`[PDF API] PDF rendered: ${pdfBuffer.length} bytes`);

    // Return PDF as downloadable file
    const filename = `${topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-worksheet.pdf`;
    
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('[PDF API] Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate PDF',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'PDF Generator API',
    version: '1.0.0',
    supportedTemplates: ['vocabulary-cards'],
    endpoints: {
      POST: {
        description: 'Generate a worksheet PDF',
        body: {
          topic: 'string (required)',
          gradeLevel: 'K | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 (required)',
          worksheetType: 'vocabulary-cards (more coming soon)',
          additionalInstructions: 'string (optional)',
          options: {
            showImages: 'boolean (default: true)',
            cardStyle: 'standard | flashcard (default: standard)',
          },
        },
      },
    },
  });
}
