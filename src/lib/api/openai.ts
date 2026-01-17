import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ContentGenerationOptions {
  topic: string;
  gradeLevel: string;
  worksheetType: string;
  additionalInstructions?: string;
}

export interface GeneratedContent {
  title: string;
  instructions?: string;
  items: ContentItem[];
  answerKey?: AnswerKeyItem[];
}

export interface ContentItem {
  term?: string;
  definition?: string;
  question?: string;
  answer?: string;
  options?: string[];
  imageKeywords?: string[];
}

export interface AnswerKeyItem {
  question: string;
  answer: string;
}

/**
 * Generate worksheet content using OpenAI GPT-4
 */
export async function generateWorksheetContent(
  options: ContentGenerationOptions
): Promise<GeneratedContent> {
  const { topic, gradeLevel, worksheetType, additionalInstructions } = options;

  const systemPrompt = `You are an expert educational content creator specializing in K-12 worksheets.
You create age-appropriate, accurate, and engaging content for students.
Always respond with valid JSON matching the requested structure.
Grade level guide:
- K-2: Simple vocabulary, short sentences, basic concepts
- 3-5: More detail, compound sentences, intermediate concepts
- 6-8: Complex ideas, academic vocabulary, deeper analysis`;

  const userPrompt = buildPromptForType(worksheetType, topic, gradeLevel, additionalInstructions);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content generated from OpenAI');
  }

  return JSON.parse(content) as GeneratedContent;
}

/**
 * Build the appropriate prompt based on worksheet type
 */
function buildPromptForType(
  worksheetType: string,
  topic: string,
  gradeLevel: string,
  additionalInstructions?: string
): string {
  const baseContext = `Topic: ${topic}\nGrade Level: ${gradeLevel}\n${additionalInstructions ? `Additional Instructions: ${additionalInstructions}\n` : ''}`;

  switch (worksheetType) {
    case 'vocabulary-cards':
      return `${baseContext}
Create vocabulary cards for this topic. Generate 6 terms with their definitions.
For each term, suggest 2-3 keywords that would find a good educational illustration.

Respond with JSON in this exact format:
{
  "title": "Vocabulary: [Topic]",
  "items": [
    {
      "term": "word",
      "definition": "age-appropriate definition",
      "imageKeywords": ["keyword1", "keyword2"]
    }
  ]
}`;

    case 'labeled-diagram':
      return `${baseContext}
Create a labeled diagram worksheet. Generate 6-8 parts that should be labeled.
Include a word bank and suggest the main diagram image to search for.

Respond with JSON in this exact format:
{
  "title": "[Topic] Diagram",
  "instructions": "Label the parts of the [topic] using the word bank below.",
  "diagramKeywords": ["keyword1", "keyword2", "diagram"],
  "items": [
    {
      "term": "part name",
      "definition": "brief description of this part"
    }
  ]
}`;

    case 'multiple-choice':
      return `${baseContext}
Create a multiple choice quiz with 5 questions about this topic.
Each question should have 4 options (A, B, C, D) with one correct answer.

Respond with JSON in this exact format:
{
  "title": "[Topic] Quiz",
  "instructions": "Circle the correct answer for each question.",
  "items": [
    {
      "question": "Question text?",
      "options": ["A) option", "B) option", "C) option", "D) option"],
      "answer": "A"
    }
  ],
  "answerKey": [
    { "question": "1", "answer": "A" }
  ]
}`;

    case 'fill-in-blank':
      return `${baseContext}
Create a fill-in-the-blank worksheet with a passage about this topic.
Include 6 blanks and a word bank. Mark blanks with underscores: _____

Respond with JSON in this exact format:
{
  "title": "[Topic] Fill in the Blanks",
  "instructions": "Complete the passage using words from the word bank.",
  "wordBank": ["word1", "word2", "word3", "word4", "word5", "word6"],
  "passage": "Text with _____ for blanks.",
  "answerKey": [
    { "question": "Blank 1", "answer": "word1" }
  ]
}`;

    default:
      return `${baseContext}
Create educational content for a ${worksheetType} worksheet about this topic.
Make it appropriate for the grade level specified.

Respond with JSON containing:
{
  "title": "Worksheet title",
  "instructions": "What students should do",
  "items": [array of content items],
  "answerKey": [optional answers]
}`;
  }
}

export { openai };
