// Comprehensive curriculum topics organized by subject, grade range, and specific topics
// This data powers the dynamic dropdowns in the worksheet generator

export interface TopicItem {
  id: string;
  name: string;
  keywords: string; // Additional keywords for better AI generation
  grades: string[]; // Which grades this topic applies to
}

export interface SubjectData {
  id: string;
  name: string;
  icon: string;
  topics: TopicItem[];
}

export const subjects: SubjectData[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ENGLISH LANGUAGE ARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ela',
    name: 'English Language Arts',
    icon: '📖',
    topics: [
      // Phonics & Early Reading (K-2)
      { id: 'alphabet', name: 'Alphabet Letters', keywords: 'uppercase lowercase ABC', grades: ['K', '1'] },
      { id: 'sight-words-k', name: 'Sight Words (Basic)', keywords: 'the and a is it Dolch', grades: ['K', '1'] },
      { id: 'sight-words-adv', name: 'Sight Words (Advanced)', keywords: 'first grade 100 words Fry', grades: ['1', '2'] },
      { id: 'rhyming', name: 'Rhyming Words', keywords: 'cat hat bat rhyme families', grades: ['K', '1', '2'] },
      { id: 'beginning-sounds', name: 'Beginning Sounds', keywords: 'initial consonants phonics', grades: ['K', '1'] },
      { id: 'cvc-words', name: 'CVC Words', keywords: 'consonant vowel short sounds', grades: ['K', '1', '2'] },
      { id: 'short-vowels', name: 'Short Vowel Sounds', keywords: 'a e i o u short', grades: ['1', '2'] },
      { id: 'long-vowels', name: 'Long Vowel Sounds', keywords: 'silent e vowel teams', grades: ['1', '2', '3'] },
      { id: 'blends-digraphs', name: 'Blends & Digraphs', keywords: 'bl cl sh ch th wh', grades: ['1', '2'] },
      
      // Vocabulary (All grades)
      { id: 'compound-words', name: 'Compound Words', keywords: 'rainbow cupcake two words', grades: ['2', '3', '4'] },
      { id: 'prefixes-suffixes', name: 'Prefixes & Suffixes', keywords: 'un re pre ful less ness', grades: ['3', '4', '5', '6'] },
      { id: 'root-words', name: 'Greek & Latin Roots', keywords: 'port ject dict scrib', grades: ['4', '5', '6', '7', '8'] },
      { id: 'synonyms-antonyms', name: 'Synonyms & Antonyms', keywords: 'same opposite meaning', grades: ['2', '3', '4', '5'] },
      { id: 'homophones', name: 'Homophones', keywords: 'their there they\'re to too two', grades: ['2', '3', '4', '5'] },
      { id: 'homographs', name: 'Multiple Meaning Words', keywords: 'homographs context', grades: ['3', '4', '5', '6'] },
      { id: 'context-clues', name: 'Context Clues', keywords: 'vocabulary in context meaning', grades: ['3', '4', '5', '6', '7', '8'] },
      { id: 'idioms', name: 'Idioms & Expressions', keywords: 'raining cats dogs figurative', grades: ['3', '4', '5', '6'] },
      { id: 'academic-vocab', name: 'Academic Vocabulary', keywords: 'analyze evaluate compare', grades: ['5', '6', '7', '8'] },
      
      // Grammar (All grades)
      { id: 'nouns', name: 'Nouns', keywords: 'person place thing common proper', grades: ['1', '2', '3'] },
      { id: 'verbs', name: 'Verbs', keywords: 'action words run jump walk', grades: ['1', '2', '3', '4'] },
      { id: 'adjectives', name: 'Adjectives', keywords: 'describing words', grades: ['2', '3', '4'] },
      { id: 'adverbs', name: 'Adverbs', keywords: 'ly words how when where', grades: ['3', '4', '5'] },
      { id: 'pronouns', name: 'Pronouns', keywords: 'he she it they we', grades: ['2', '3', '4'] },
      { id: 'parts-of-speech', name: 'Parts of Speech Review', keywords: 'noun verb adjective adverb', grades: ['3', '4', '5', '6'] },
      { id: 'verb-tenses', name: 'Verb Tenses', keywords: 'past present future perfect', grades: ['3', '4', '5', '6', '7'] },
      { id: 'subject-predicate', name: 'Subject & Predicate', keywords: 'sentence parts complete', grades: ['2', '3', '4'] },
      { id: 'sentence-types', name: 'Types of Sentences', keywords: 'declarative interrogative exclamatory imperative', grades: ['2', '3', '4', '5'] },
      { id: 'punctuation', name: 'Punctuation', keywords: 'period comma question exclamation', grades: ['1', '2', '3', '4'] },
      { id: 'capitalization', name: 'Capitalization Rules', keywords: 'proper nouns titles', grades: ['1', '2', '3', '4'] },
      { id: 'conjunctions', name: 'Conjunctions', keywords: 'FANBOYS and but or so', grades: ['3', '4', '5', '6'] },
      { id: 'complex-sentences', name: 'Complex Sentences', keywords: 'compound dependent independent clauses', grades: ['5', '6', '7', '8'] },
      { id: 'active-passive', name: 'Active vs Passive Voice', keywords: 'voice writing', grades: ['6', '7', '8'] },
      
      // Reading Comprehension
      { id: 'story-elements', name: 'Story Elements', keywords: 'character setting plot problem solution', grades: ['1', '2', '3', '4'] },
      { id: 'main-idea', name: 'Main Idea & Details', keywords: 'central supporting', grades: ['2', '3', '4', '5', '6'] },
      { id: 'sequence', name: 'Sequencing Events', keywords: 'first next then finally order', grades: ['1', '2', '3', '4'] },
      { id: 'cause-effect', name: 'Cause and Effect', keywords: 'because so therefore result', grades: ['2', '3', '4', '5', '6'] },
      { id: 'compare-contrast', name: 'Compare and Contrast', keywords: 'alike different similarities differences', grades: ['2', '3', '4', '5', '6'] },
      { id: 'inference', name: 'Making Inferences', keywords: 'conclude predict imply', grades: ['3', '4', '5', '6', '7', '8'] },
      { id: 'authors-purpose', name: "Author's Purpose", keywords: 'persuade inform entertain PIE', grades: ['3', '4', '5', '6'] },
      { id: 'point-of-view', name: 'Point of View', keywords: 'first person third narrator perspective', grades: ['3', '4', '5', '6', '7'] },
      { id: 'text-features', name: 'Text Features', keywords: 'headings captions glossary index bold', grades: ['2', '3', '4', '5'] },
      { id: 'text-structure', name: 'Text Structure', keywords: 'chronological problem solution compare', grades: ['4', '5', '6', '7', '8'] },
      { id: 'theme', name: 'Theme', keywords: 'lesson moral message', grades: ['4', '5', '6', '7', '8'] },
      { id: 'plot-diagram', name: 'Plot Diagram', keywords: 'exposition rising climax falling resolution', grades: ['4', '5', '6', '7', '8'] },
      
      // Literary Elements (Upper grades)
      { id: 'figurative-language', name: 'Figurative Language', keywords: 'simile metaphor personification hyperbole', grades: ['4', '5', '6', '7', '8'] },
      { id: 'poetry-terms', name: 'Poetry Terms', keywords: 'stanza rhyme meter rhythm verse', grades: ['4', '5', '6', '7', '8'] },
      { id: 'literary-devices', name: 'Literary Devices', keywords: 'foreshadowing irony symbolism allusion', grades: ['6', '7', '8'] },
      { id: 'shakespeare', name: 'Shakespearean Terms', keywords: 'iambic pentameter soliloquy aside', grades: ['7', '8'] },
      { id: 'rhetoric', name: 'Rhetoric & Persuasion', keywords: 'ethos pathos logos argument', grades: ['6', '7', '8'] },
      
      // Writing
      { id: 'question-words', name: 'Question Words', keywords: 'who what where when why how', grades: ['K', '1', '2'] },
      { id: 'paragraph-structure', name: 'Paragraph Structure', keywords: 'topic sentence supporting conclusion', grades: ['3', '4', '5', '6'] },
      { id: 'essay-structure', name: 'Essay Structure', keywords: 'introduction body conclusion thesis', grades: ['5', '6', '7', '8'] },
      { id: 'narrative-writing', name: 'Narrative Writing', keywords: 'story telling creative', grades: ['2', '3', '4', '5', '6'] },
      { id: 'persuasive-writing', name: 'Persuasive Writing', keywords: 'opinion argument convince', grades: ['4', '5', '6', '7', '8'] },
      { id: 'informative-writing', name: 'Informative Writing', keywords: 'explain describe facts', grades: ['3', '4', '5', '6', '7', '8'] },
      { id: 'research-skills', name: 'Research Skills', keywords: 'sources citations bibliography', grades: ['5', '6', '7', '8'] },
      { id: 'mla-format', name: 'MLA Citation Format', keywords: 'works cited bibliography', grades: ['6', '7', '8'] },
      
      // Genre Study
      { id: 'fiction-nonfiction', name: 'Fiction vs Nonfiction', keywords: 'real imaginary genre', grades: ['1', '2', '3', '4'] },
      { id: 'genres', name: 'Literary Genres', keywords: 'mystery fantasy biography historical', grades: ['3', '4', '5', '6', '7', '8'] },
      { id: 'fairy-tales', name: 'Fairy Tales & Folktales', keywords: 'traditional stories once upon', grades: ['K', '1', '2', '3'] },
      { id: 'fables', name: 'Fables & Morals', keywords: 'Aesop lesson animals', grades: ['2', '3', '4'] },
      { id: 'mythology', name: 'Greek Mythology', keywords: 'gods heroes myths legends', grades: ['4', '5', '6', '7', '8'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'math',
    name: 'Mathematics',
    icon: '🔢',
    topics: [
      // Counting & Number Sense (K-2)
      { id: 'counting-10', name: 'Counting to 10', keywords: 'numbers one through ten', grades: ['K'] },
      { id: 'counting-20', name: 'Counting to 20', keywords: 'numbers objects', grades: ['K', '1'] },
      { id: 'counting-100', name: 'Counting to 100', keywords: 'hundred chart', grades: ['1', '2'] },
      { id: 'number-recognition', name: 'Number Recognition', keywords: 'identify numbers 0-20', grades: ['K', '1'] },
      { id: 'more-less-equal', name: 'More, Less, Equal', keywords: 'comparing groups greater fewer', grades: ['K', '1'] },
      { id: 'ordinal-numbers', name: 'Ordinal Numbers', keywords: 'first second third order', grades: ['K', '1', '2'] },
      { id: 'odd-even', name: 'Odd and Even Numbers', keywords: 'pairs grouping', grades: ['1', '2', '3'] },
      { id: 'skip-counting', name: 'Skip Counting', keywords: 'by 2s 5s 10s patterns', grades: ['1', '2', '3'] },
      
      // Place Value
      { id: 'place-value-tens', name: 'Place Value: Tens & Ones', keywords: 'two digit numbers', grades: ['1', '2'] },
      { id: 'place-value-hundreds', name: 'Place Value: Hundreds', keywords: 'three digit expanded form', grades: ['2', '3'] },
      { id: 'place-value-thousands', name: 'Place Value: Thousands', keywords: 'four digit standard form', grades: ['3', '4'] },
      { id: 'place-value-large', name: 'Place Value: Large Numbers', keywords: 'millions billions', grades: ['4', '5'] },
      { id: 'rounding', name: 'Rounding Numbers', keywords: 'nearest ten hundred estimate', grades: ['3', '4', '5'] },
      { id: 'comparing-numbers', name: 'Comparing Numbers', keywords: 'greater less than symbols', grades: ['1', '2', '3', '4'] },
      
      // Addition & Subtraction
      { id: 'addition-10', name: 'Addition Within 10', keywords: 'adding basic facts', grades: ['K', '1'] },
      { id: 'subtraction-10', name: 'Subtraction Within 10', keywords: 'take away minus', grades: ['K', '1'] },
      { id: 'addition-20', name: 'Addition Within 20', keywords: 'adding facts fluency', grades: ['1', '2'] },
      { id: 'subtraction-20', name: 'Subtraction Within 20', keywords: 'subtraction facts', grades: ['1', '2'] },
      { id: 'addition-2digit', name: 'Two-Digit Addition', keywords: 'regrouping carrying', grades: ['2', '3'] },
      { id: 'subtraction-2digit', name: 'Two-Digit Subtraction', keywords: 'regrouping borrowing', grades: ['2', '3'] },
      { id: 'addition-3digit', name: 'Three-Digit Addition', keywords: 'hundreds regrouping', grades: ['3', '4'] },
      { id: 'subtraction-3digit', name: 'Three-Digit Subtraction', keywords: 'hundreds borrowing', grades: ['3', '4'] },
      
      // Multiplication & Division
      { id: 'mult-concept', name: 'Multiplication Concept', keywords: 'groups of arrays repeated addition', grades: ['2', '3'] },
      { id: 'mult-facts-5', name: 'Multiplication Facts (0-5)', keywords: 'times tables basic', grades: ['3'] },
      { id: 'mult-facts-10', name: 'Multiplication Facts (0-10)', keywords: 'times tables memorize', grades: ['3', '4'] },
      { id: 'mult-facts-12', name: 'Multiplication Facts (0-12)', keywords: 'times tables complete', grades: ['4', '5'] },
      { id: 'division-concept', name: 'Division Concept', keywords: 'sharing equally groups', grades: ['3'] },
      { id: 'division-facts', name: 'Division Facts', keywords: 'basic division inverse', grades: ['3', '4'] },
      { id: 'long-division', name: 'Long Division', keywords: 'multi-digit divide', grades: ['4', '5'] },
      { id: 'multi-digit-mult', name: 'Multi-Digit Multiplication', keywords: 'two by two digit', grades: ['4', '5'] },
      { id: 'arrays', name: 'Arrays', keywords: 'rows columns multiplication', grades: ['2', '3', '4'] },
      
      // Fractions
      { id: 'fractions-intro', name: 'Fractions Introduction', keywords: 'half third fourth parts', grades: ['1', '2', '3'] },
      { id: 'fractions-basic', name: 'Basic Fractions', keywords: 'numerator denominator', grades: ['3', '4'] },
      { id: 'equivalent-fractions', name: 'Equivalent Fractions', keywords: 'equal same value', grades: ['3', '4', '5'] },
      { id: 'comparing-fractions', name: 'Comparing Fractions', keywords: 'greater less common denominator', grades: ['3', '4', '5'] },
      { id: 'adding-fractions', name: 'Adding Fractions', keywords: 'like unlike denominators', grades: ['4', '5', '6'] },
      { id: 'subtracting-fractions', name: 'Subtracting Fractions', keywords: 'like unlike denominators', grades: ['4', '5', '6'] },
      { id: 'multiplying-fractions', name: 'Multiplying Fractions', keywords: 'times fractions', grades: ['5', '6'] },
      { id: 'dividing-fractions', name: 'Dividing Fractions', keywords: 'reciprocal flip', grades: ['5', '6'] },
      { id: 'mixed-numbers', name: 'Mixed Numbers', keywords: 'improper convert whole', grades: ['4', '5', '6'] },
      
      // Decimals & Percents
      { id: 'decimals-intro', name: 'Decimals Introduction', keywords: 'tenths hundredths place value', grades: ['4', '5'] },
      { id: 'decimal-operations', name: 'Decimal Operations', keywords: 'add subtract multiply divide', grades: ['5', '6'] },
      { id: 'fractions-decimals', name: 'Fractions to Decimals', keywords: 'convert equivalent', grades: ['5', '6'] },
      { id: 'percents', name: 'Percentages', keywords: 'percent of a number', grades: ['5', '6', '7'] },
      { id: 'fractions-decimals-percents', name: 'Fractions, Decimals, Percents', keywords: 'convert equivalents', grades: ['6', '7'] },
      
      // Geometry
      { id: 'shapes-2d-basic', name: 'Basic 2D Shapes', keywords: 'circle square triangle rectangle', grades: ['K', '1', '2'] },
      { id: 'shapes-2d-adv', name: 'Advanced 2D Shapes', keywords: 'pentagon hexagon octagon polygon', grades: ['2', '3', '4'] },
      { id: 'shapes-3d', name: '3D Shapes', keywords: 'cube sphere cylinder cone prism', grades: ['1', '2', '3', '4'] },
      { id: 'lines-segments', name: 'Lines & Line Segments', keywords: 'ray point parallel perpendicular', grades: ['3', '4', '5'] },
      { id: 'angles', name: 'Types of Angles', keywords: 'acute obtuse right straight', grades: ['4', '5'] },
      { id: 'angle-measurement', name: 'Measuring Angles', keywords: 'protractor degrees', grades: ['4', '5', '6'] },
      { id: 'triangles', name: 'Types of Triangles', keywords: 'equilateral isosceles scalene right', grades: ['4', '5', '6'] },
      { id: 'quadrilaterals', name: 'Quadrilaterals', keywords: 'square rectangle rhombus trapezoid parallelogram', grades: ['3', '4', '5', '6'] },
      { id: 'symmetry', name: 'Symmetry', keywords: 'line of symmetry reflection', grades: ['2', '3', '4'] },
      { id: 'perimeter', name: 'Perimeter', keywords: 'distance around shapes', grades: ['3', '4', '5'] },
      { id: 'area', name: 'Area', keywords: 'square units length times width', grades: ['3', '4', '5', '6'] },
      { id: 'volume', name: 'Volume', keywords: 'cubic units rectangular prism', grades: ['5', '6'] },
      { id: 'surface-area', name: 'Surface Area', keywords: '3D shapes faces', grades: ['6', '7'] },
      { id: 'coordinate-plane', name: 'Coordinate Plane', keywords: 'x-axis y-axis ordered pairs graphing', grades: ['5', '6', '7'] },
      { id: 'transformations', name: 'Transformations', keywords: 'translation rotation reflection dilation', grades: ['6', '7', '8'] },
      { id: 'pythagorean', name: 'Pythagorean Theorem', keywords: 'a squared b squared c squared right triangle', grades: ['8'] },
      
      // Measurement
      { id: 'length', name: 'Measuring Length', keywords: 'inches feet centimeters rulers', grades: ['1', '2', '3'] },
      { id: 'weight-mass', name: 'Weight & Mass', keywords: 'pounds ounces grams kilograms', grades: ['2', '3', '4'] },
      { id: 'capacity', name: 'Capacity & Volume', keywords: 'cups pints quarts gallons liters', grades: ['2', '3', '4'] },
      { id: 'time-hour', name: 'Telling Time (Hour)', keywords: 'clock hour hand', grades: ['1'] },
      { id: 'time-half', name: 'Telling Time (Half Hour)', keywords: 'clock thirty minutes', grades: ['1', '2'] },
      { id: 'time-5min', name: 'Telling Time (5 Minutes)', keywords: 'clock minute hand', grades: ['2', '3'] },
      { id: 'elapsed-time', name: 'Elapsed Time', keywords: 'how long duration', grades: ['3', '4'] },
      { id: 'money-coins', name: 'Coins', keywords: 'penny nickel dime quarter', grades: ['1', '2'] },
      { id: 'money-bills', name: 'Money & Making Change', keywords: 'dollars bills counting', grades: ['2', '3', '4'] },
      { id: 'temperature', name: 'Temperature', keywords: 'Fahrenheit Celsius thermometer', grades: ['2', '3', '4'] },
      { id: 'unit-conversion', name: 'Unit Conversion', keywords: 'metric customary convert', grades: ['4', '5', '6'] },
      
      // Data & Statistics
      { id: 'graphs-picture', name: 'Picture Graphs', keywords: 'pictograph symbols', grades: ['1', '2'] },
      { id: 'graphs-bar', name: 'Bar Graphs', keywords: 'bars categories data', grades: ['2', '3', '4'] },
      { id: 'graphs-line', name: 'Line Graphs', keywords: 'trends over time', grades: ['4', '5', '6'] },
      { id: 'graphs-circle', name: 'Circle Graphs', keywords: 'pie chart percentages', grades: ['5', '6', '7'] },
      { id: 'mean-median-mode', name: 'Mean, Median, Mode, Range', keywords: 'average middle most spread', grades: ['5', '6', '7'] },
      { id: 'probability', name: 'Probability', keywords: 'likely unlikely chance', grades: ['4', '5', '6', '7'] },
      
      // Patterns & Algebra
      { id: 'patterns-basic', name: 'Patterns', keywords: 'AB ABC repeating growing', grades: ['K', '1', '2'] },
      { id: 'number-patterns', name: 'Number Patterns', keywords: 'sequences rules', grades: ['3', '4', '5'] },
      { id: 'order-operations', name: 'Order of Operations', keywords: 'PEMDAS parentheses exponents', grades: ['5', '6'] },
      { id: 'exponents', name: 'Exponents', keywords: 'powers squared cubed base', grades: ['5', '6', '7'] },
      { id: 'integers', name: 'Integers', keywords: 'positive negative number line', grades: ['6', '7'] },
      { id: 'rational-numbers', name: 'Rational Numbers', keywords: 'fractions decimals operations', grades: ['6', '7'] },
      { id: 'scientific-notation', name: 'Scientific Notation', keywords: 'powers of ten large small', grades: ['7', '8'] },
      { id: 'expressions', name: 'Algebraic Expressions', keywords: 'variables terms coefficients', grades: ['5', '6', '7'] },
      { id: 'equations-one-step', name: 'One-Step Equations', keywords: 'solve for x', grades: ['5', '6'] },
      { id: 'equations-two-step', name: 'Two-Step Equations', keywords: 'solve multi-step', grades: ['6', '7'] },
      { id: 'inequalities', name: 'Inequalities', keywords: 'greater less than solve', grades: ['6', '7', '8'] },
      { id: 'ratios', name: 'Ratios', keywords: 'comparing quantities relationship', grades: ['6', '7'] },
      { id: 'proportions', name: 'Proportions', keywords: 'equivalent ratios cross multiply', grades: ['6', '7'] },
      { id: 'functions', name: 'Functions', keywords: 'input output domain range', grades: ['7', '8'] },
      { id: 'linear-equations', name: 'Linear Equations', keywords: 'slope intercept graphing', grades: ['7', '8'] },
      { id: 'systems-equations', name: 'Systems of Equations', keywords: 'two equations solving', grades: ['8'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SCIENCE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    topics: [
      // Life Science - Plants
      { id: 'plant-parts', name: 'Parts of a Plant', keywords: 'root stem leaf flower seed', grades: ['K', '1', '2', '3'] },
      { id: 'plant-needs', name: 'What Plants Need', keywords: 'water sunlight air soil', grades: ['K', '1', '2'] },
      { id: 'plant-life-cycle', name: 'Plant Life Cycle', keywords: 'seed germination growth', grades: ['1', '2', '3'] },
      { id: 'photosynthesis', name: 'Photosynthesis', keywords: 'chlorophyll carbon dioxide glucose oxygen', grades: ['4', '5', '6', '7'] },
      { id: 'parts-of-flower', name: 'Parts of a Flower', keywords: 'petal stamen pistil pollen', grades: ['3', '4', '5'] },
      { id: 'types-of-plants', name: 'Types of Plants', keywords: 'trees shrubs grass flowering', grades: ['2', '3'] },
      
      // Life Science - Animals
      { id: 'animal-groups', name: 'Animal Groups', keywords: 'mammals birds fish reptiles amphibians', grades: ['1', '2', '3', '4'] },
      { id: 'animal-habitats', name: 'Animal Habitats', keywords: 'forest ocean desert jungle', grades: ['1', '2', '3'] },
      { id: 'animal-needs', name: 'Basic Needs of Animals', keywords: 'food water shelter air', grades: ['K', '1', '2'] },
      { id: 'animal-adaptations', name: 'Animal Adaptations', keywords: 'camouflage migration hibernation', grades: ['3', '4', '5', '6'] },
      { id: 'food-chains', name: 'Food Chains', keywords: 'producer consumer decomposer predator prey', grades: ['3', '4', '5'] },
      { id: 'food-webs', name: 'Food Webs', keywords: 'interconnected energy flow', grades: ['4', '5', '6'] },
      { id: 'ecosystems', name: 'Ecosystems', keywords: 'biotic abiotic community', grades: ['4', '5', '6', '7'] },
      { id: 'biomes', name: 'Biomes', keywords: 'tundra rainforest desert grassland taiga', grades: ['5', '6', '7'] },
      { id: 'vertebrates-invertebrates', name: 'Vertebrates & Invertebrates', keywords: 'backbone spine skeleton', grades: ['3', '4', '5'] },
      { id: 'insects', name: 'Insects', keywords: 'six legs antennae exoskeleton', grades: ['1', '2', '3'] },
      { id: 'ocean-animals', name: 'Ocean Animals', keywords: 'marine life fish sharks whales', grades: ['1', '2', '3', '4'] },
      { id: 'endangered-species', name: 'Endangered Species', keywords: 'extinction conservation habitat loss', grades: ['4', '5', '6', '7'] },
      
      // Life Science - Life Cycles
      { id: 'butterfly-lifecycle', name: 'Butterfly Life Cycle', keywords: 'egg caterpillar larva pupa chrysalis metamorphosis', grades: ['1', '2', '3'] },
      { id: 'frog-lifecycle', name: 'Frog Life Cycle', keywords: 'egg tadpole froglet metamorphosis', grades: ['1', '2', '3'] },
      { id: 'chicken-lifecycle', name: 'Chicken Life Cycle', keywords: 'egg chick hen rooster', grades: ['K', '1', '2'] },
      
      // Life Science - Human Body
      { id: 'five-senses', name: 'Five Senses', keywords: 'see hear touch taste smell', grades: ['K', '1'] },
      { id: 'body-parts', name: 'Human Body Parts', keywords: 'head arms legs hands feet', grades: ['K', '1'] },
      { id: 'skeletal-system', name: 'Skeletal System', keywords: 'bones skull spine ribs', grades: ['3', '4', '5'] },
      { id: 'muscular-system', name: 'Muscular System', keywords: 'muscles movement tendons', grades: ['4', '5', '6'] },
      { id: 'digestive-system', name: 'Digestive System', keywords: 'stomach intestines esophagus', grades: ['4', '5', '6'] },
      { id: 'circulatory-system', name: 'Circulatory System', keywords: 'heart blood vessels arteries veins', grades: ['4', '5', '6'] },
      { id: 'respiratory-system', name: 'Respiratory System', keywords: 'lungs breathing oxygen diaphragm', grades: ['4', '5', '6'] },
      { id: 'nervous-system', name: 'Nervous System', keywords: 'brain spinal cord neurons', grades: ['5', '6', '7'] },
      { id: 'human-body-systems', name: 'Human Body Systems Overview', keywords: 'organs systems functions', grades: ['5', '6', '7'] },
      
      // Life Science - Cells & Genetics
      { id: 'cells-basic', name: 'Introduction to Cells', keywords: 'basic unit of life microscope', grades: ['4', '5'] },
      { id: 'plant-animal-cells', name: 'Plant & Animal Cells', keywords: 'organelles nucleus membrane wall', grades: ['5', '6', '7'] },
      { id: 'cell-parts', name: 'Cell Parts & Functions', keywords: 'nucleus mitochondria chloroplast vacuole', grades: ['6', '7'] },
      { id: 'cell-division', name: 'Cell Division', keywords: 'mitosis meiosis chromosomes', grades: ['7', '8'] },
      { id: 'genetics', name: 'Genetics', keywords: 'DNA chromosomes genes traits heredity', grades: ['7', '8'] },
      { id: 'evolution', name: 'Evolution', keywords: 'natural selection adaptation Darwin', grades: ['7', '8'] },
      
      // Physical Science - Matter
      { id: 'five-senses-matter', name: 'Observing Matter', keywords: 'describe properties senses', grades: ['K', '1'] },
      { id: 'properties-matter', name: 'Properties of Matter', keywords: 'color size shape texture', grades: ['1', '2', '3'] },
      { id: 'states-of-matter', name: 'States of Matter', keywords: 'solid liquid gas properties', grades: ['2', '3', '4'] },
      { id: 'changing-states', name: 'Changing States of Matter', keywords: 'melting freezing evaporation condensation', grades: ['3', '4', '5'] },
      { id: 'mixtures-solutions', name: 'Mixtures & Solutions', keywords: 'dissolve separate combine', grades: ['4', '5'] },
      { id: 'atoms-molecules', name: 'Atoms & Molecules', keywords: 'particles elements compounds', grades: ['5', '6', '7'] },
      { id: 'periodic-table', name: 'Periodic Table', keywords: 'elements groups periods symbols', grades: ['6', '7', '8'] },
      { id: 'chemical-physical-changes', name: 'Chemical vs Physical Changes', keywords: 'reversible new substance', grades: ['5', '6', '7'] },
      { id: 'chemical-reactions', name: 'Chemical Reactions', keywords: 'reactants products equations', grades: ['7', '8'] },
      
      // Physical Science - Forces & Motion
      { id: 'push-pull', name: 'Push and Pull', keywords: 'forces move stop', grades: ['K', '1', '2'] },
      { id: 'motion', name: 'Motion', keywords: 'speed position direction', grades: ['2', '3', '4'] },
      { id: 'friction', name: 'Friction', keywords: 'resistance surface rough smooth', grades: ['3', '4', '5'] },
      { id: 'gravity', name: 'Gravity', keywords: 'pull down weight mass', grades: ['3', '4', '5', '6'] },
      { id: 'simple-machines', name: 'Simple Machines', keywords: 'lever pulley wheel axle inclined plane wedge screw', grades: ['3', '4', '5'] },
      { id: 'newtons-laws', name: "Newton's Laws of Motion", keywords: 'force mass acceleration inertia', grades: ['6', '7', '8'] },
      { id: 'speed-velocity', name: 'Speed & Velocity', keywords: 'distance time direction rate', grades: ['6', '7'] },
      { id: 'work-power', name: 'Work & Power', keywords: 'force distance energy', grades: ['7', '8'] },
      
      // Physical Science - Energy
      { id: 'forms-of-energy', name: 'Forms of Energy', keywords: 'light heat sound mechanical', grades: ['3', '4', '5'] },
      { id: 'kinetic-potential', name: 'Kinetic & Potential Energy', keywords: 'motion stored movement', grades: ['5', '6', '7'] },
      { id: 'energy-transfer', name: 'Energy Transfer', keywords: 'heat conduction convection radiation', grades: ['5', '6', '7'] },
      { id: 'heat-transfer', name: 'Heat Transfer', keywords: 'conduction convection radiation thermal', grades: ['5', '6', '7'] },
      { id: 'electricity-basics', name: 'Electricity Basics', keywords: 'current static charge', grades: ['3', '4'] },
      { id: 'electrical-circuits', name: 'Electrical Circuits', keywords: 'current voltage series parallel', grades: ['4', '5', '6'] },
      { id: 'magnetism', name: 'Magnetism', keywords: 'poles attract repel magnetic field', grades: ['3', '4', '5'] },
      { id: 'electromagnets', name: 'Electromagnets', keywords: 'coil current magnetic field', grades: ['5', '6', '7'] },
      
      // Physical Science - Waves
      { id: 'sound', name: 'Sound', keywords: 'vibration pitch volume waves', grades: ['3', '4', '5'] },
      { id: 'light', name: 'Light', keywords: 'reflection refraction absorption', grades: ['3', '4', '5'] },
      { id: 'light-spectrum', name: 'Light Spectrum', keywords: 'colors rainbow prism wavelength', grades: ['4', '5', '6'] },
      { id: 'waves', name: 'Waves', keywords: 'wavelength frequency amplitude transverse longitudinal', grades: ['6', '7', '8'] },
      
      // Earth Science - Weather
      { id: 'weather-basics', name: 'Weather', keywords: 'sunny rainy cloudy snowy windy', grades: ['K', '1', '2'] },
      { id: 'weather-tools', name: 'Weather Tools', keywords: 'thermometer rain gauge anemometer barometer', grades: ['2', '3', '4'] },
      { id: 'water-cycle', name: 'Water Cycle', keywords: 'evaporation condensation precipitation collection', grades: ['2', '3', '4', '5'] },
      { id: 'clouds', name: 'Types of Clouds', keywords: 'cumulus stratus cirrus nimbus', grades: ['2', '3', '4'] },
      { id: 'severe-weather', name: 'Severe Weather', keywords: 'thunderstorms tornadoes hurricanes', grades: ['3', '4', '5'] },
      { id: 'climate', name: 'Climate', keywords: 'weather patterns regions long-term', grades: ['4', '5', '6'] },
      { id: 'climate-zones', name: 'Climate Zones', keywords: 'tropical temperate polar', grades: ['5', '6', '7'] },
      { id: 'weather-fronts', name: 'Weather Fronts', keywords: 'cold front warm front air pressure', grades: ['6', '7'] },
      
      // Earth Science - Rocks & Earth
      { id: 'rocks-minerals', name: 'Rocks & Minerals', keywords: 'properties identify classify', grades: ['2', '3', '4'] },
      { id: 'rock-types', name: 'Types of Rocks', keywords: 'igneous sedimentary metamorphic', grades: ['3', '4', '5'] },
      { id: 'rock-cycle', name: 'Rock Cycle', keywords: 'formation weathering erosion', grades: ['4', '5', '6'] },
      { id: 'soil', name: 'Soil', keywords: 'layers humus sand clay', grades: ['2', '3', '4'] },
      { id: 'fossils', name: 'Fossils', keywords: 'prehistoric remains imprint paleontology', grades: ['3', '4', '5'] },
      { id: 'earth-layers', name: "Earth's Layers", keywords: 'crust mantle core', grades: ['4', '5', '6'] },
      { id: 'plate-tectonics', name: 'Plate Tectonics', keywords: 'plates boundaries movement continental drift', grades: ['5', '6', '7'] },
      { id: 'earthquakes', name: 'Earthquakes', keywords: 'fault seismic waves epicenter', grades: ['4', '5', '6', '7'] },
      { id: 'volcanoes', name: 'Volcanoes', keywords: 'eruption lava magma crater', grades: ['3', '4', '5', '6'] },
      { id: 'landforms', name: 'Landforms', keywords: 'mountains valleys plains plateaus', grades: ['2', '3', '4'] },
      { id: 'erosion', name: 'Erosion & Weathering', keywords: 'wind water ice breaking down', grades: ['3', '4', '5'] },
      { id: 'ocean-zones', name: 'Ocean Zones', keywords: 'sunlight twilight midnight abyssal', grades: ['4', '5', '6'] },
      
      // Earth Science - Space
      { id: 'day-night', name: 'Day and Night', keywords: 'rotation Earth sun', grades: ['K', '1', '2'] },
      { id: 'seasons', name: 'Seasons', keywords: 'tilt axis winter spring summer fall', grades: ['2', '3', '4'] },
      { id: 'sun', name: 'The Sun', keywords: 'star heat light energy', grades: ['1', '2', '3'] },
      { id: 'moon', name: 'The Moon', keywords: 'lunar satellite crater', grades: ['1', '2', '3'] },
      { id: 'moon-phases', name: 'Moon Phases', keywords: 'new crescent quarter gibbous full', grades: ['3', '4', '5'] },
      { id: 'solar-system', name: 'Solar System', keywords: 'planets sun orbit', grades: ['2', '3', '4', '5'] },
      { id: 'inner-planets', name: 'Inner Planets', keywords: 'Mercury Venus Earth Mars rocky', grades: ['4', '5'] },
      { id: 'outer-planets', name: 'Outer Planets', keywords: 'Jupiter Saturn Uranus Neptune gas giants', grades: ['4', '5'] },
      { id: 'stars', name: 'Stars', keywords: 'constellations brightness light years', grades: ['3', '4', '5'] },
      { id: 'galaxies', name: 'Galaxies & Universe', keywords: 'Milky Way spiral elliptical', grades: ['6', '7', '8'] },
      { id: 'space-exploration', name: 'Space Exploration', keywords: 'NASA rockets astronauts missions', grades: ['3', '4', '5', '6'] },
      
      // Environmental Science
      { id: 'natural-resources', name: 'Natural Resources', keywords: 'renewable nonrenewable conservation', grades: ['3', '4', '5'] },
      { id: 'conservation', name: 'Conservation', keywords: 'reduce reuse recycle protect', grades: ['2', '3', '4', '5'] },
      { id: 'pollution', name: 'Pollution', keywords: 'air water land environment', grades: ['3', '4', '5', '6'] },
      { id: 'climate-change', name: 'Climate Change', keywords: 'global warming greenhouse gases', grades: ['5', '6', '7', '8'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SOCIAL STUDIES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'social-studies',
    name: 'Social Studies',
    icon: '🌍',
    topics: [
      // Geography - Map Skills
      { id: 'map-basics', name: 'Map Basics', keywords: 'legend key symbols', grades: ['K', '1', '2'] },
      { id: 'cardinal-directions', name: 'Cardinal Directions', keywords: 'north south east west compass', grades: ['1', '2', '3'] },
      { id: 'map-types', name: 'Types of Maps', keywords: 'physical political topographic', grades: ['3', '4', '5'] },
      { id: 'map-grid', name: 'Map Grid & Coordinates', keywords: 'latitude longitude grid', grades: ['4', '5', '6'] },
      { id: 'scale-distance', name: 'Map Scale & Distance', keywords: 'measuring miles kilometers', grades: ['4', '5'] },
      
      // Geography - Physical
      { id: 'continents-oceans', name: 'Continents & Oceans', keywords: 'seven continents five oceans', grades: ['1', '2', '3'] },
      { id: 'landforms-geo', name: 'Landforms', keywords: 'mountain valley plateau peninsula island', grades: ['2', '3', '4'] },
      { id: 'bodies-water', name: 'Bodies of Water', keywords: 'river lake ocean bay strait', grades: ['2', '3', '4'] },
      { id: 'us-regions', name: 'US Regions', keywords: 'Northeast Southeast Midwest Southwest West', grades: ['3', '4', '5'] },
      { id: 'us-states', name: 'US States & Capitals', keywords: 'fifty states capitals location', grades: ['3', '4', '5'] },
      { id: 'world-countries', name: 'World Countries', keywords: 'nations geography location', grades: ['5', '6', '7'] },
      { id: 'climate-geography', name: 'Climate & Geography', keywords: 'climate zones tropical desert arctic', grades: ['4', '5', '6'] },
      { id: 'natural-resources-geo', name: 'Natural Resources', keywords: 'minerals oil forests water', grades: ['3', '4', '5'] },
      
      // US History - Early America
      { id: 'native-americans', name: 'Native Americans', keywords: 'tribes culture regions traditions', grades: ['2', '3', '4', '5'] },
      { id: 'explorers', name: 'European Explorers', keywords: 'Columbus Magellan Vespucci exploration', grades: ['4', '5'] },
      { id: 'colonial-america', name: 'Colonial America', keywords: '13 colonies Jamestown Plymouth settlers', grades: ['4', '5'] },
      { id: 'colonial-life', name: 'Colonial Life', keywords: 'daily life occupations children', grades: ['4', '5'] },
      
      // US History - Revolution & Constitution
      { id: 'american-revolution-causes', name: 'Causes of American Revolution', keywords: 'taxes tea act stamp act', grades: ['4', '5'] },
      { id: 'american-revolution', name: 'American Revolution', keywords: 'independence war battles Patriots', grades: ['4', '5', '6'] },
      { id: 'founding-fathers', name: 'Founding Fathers', keywords: 'Washington Jefferson Franklin Adams', grades: ['4', '5'] },
      { id: 'declaration-independence', name: 'Declaration of Independence', keywords: 'July 4 1776 freedom rights', grades: ['4', '5', '6'] },
      { id: 'constitution', name: 'US Constitution', keywords: 'document framework government', grades: ['4', '5', '6', '7'] },
      { id: 'bill-of-rights', name: 'Bill of Rights', keywords: 'amendments freedoms rights', grades: ['4', '5', '6', '7', '8'] },
      
      // US History - Growth & Conflict
      { id: 'westward-expansion', name: 'Westward Expansion', keywords: 'manifest destiny Oregon Trail pioneers', grades: ['4', '5'] },
      { id: 'civil-war-causes', name: 'Causes of Civil War', keywords: 'slavery states rights sectionalism', grades: ['5', '6'] },
      { id: 'civil-war', name: 'Civil War', keywords: 'Union Confederacy battles Lincoln', grades: ['5', '6', '7'] },
      { id: 'reconstruction', name: 'Reconstruction', keywords: 'rebuilding amendments freedmen', grades: ['5', '6', '7'] },
      { id: 'immigration', name: 'Immigration', keywords: 'Ellis Island cultures diversity', grades: ['4', '5', '6'] },
      { id: 'industrial-revolution', name: 'Industrial Revolution', keywords: 'factories inventions urbanization', grades: ['5', '6', '7'] },
      
      // US History - Modern Era
      { id: 'world-war-1', name: 'World War I', keywords: 'Great War causes effects', grades: ['6', '7', '8'] },
      { id: 'world-war-2', name: 'World War II', keywords: 'Axis Allies Hitler Holocaust', grades: ['6', '7', '8'] },
      { id: 'civil-rights-movement', name: 'Civil Rights Movement', keywords: 'MLK Rosa Parks segregation equality', grades: ['4', '5', '6', '7', '8'] },
      { id: 'cold-war', name: 'Cold War', keywords: 'USSR communism nuclear space race', grades: ['7', '8'] },
      
      // World History
      { id: 'ancient-egypt', name: 'Ancient Egypt', keywords: 'pharaohs pyramids Nile hieroglyphics', grades: ['3', '4', '5', '6'] },
      { id: 'ancient-mesopotamia', name: 'Ancient Mesopotamia', keywords: 'Fertile Crescent Sumer Babylon', grades: ['5', '6'] },
      { id: 'ancient-greece', name: 'Ancient Greece', keywords: 'democracy Athens Sparta Olympics', grades: ['5', '6', '7'] },
      { id: 'ancient-rome', name: 'Ancient Rome', keywords: 'republic empire Caesar gladiators', grades: ['5', '6', '7'] },
      { id: 'ancient-china', name: 'Ancient China', keywords: 'dynasties Great Wall Silk Road', grades: ['5', '6'] },
      { id: 'middle-ages', name: 'Middle Ages', keywords: 'feudalism knights castles medieval', grades: ['5', '6', '7'] },
      { id: 'renaissance', name: 'Renaissance', keywords: 'rebirth art humanism da Vinci', grades: ['6', '7'] },
      { id: 'mayan-aztec-inca', name: 'Maya, Aztec, Inca', keywords: 'ancient Americas civilizations', grades: ['5', '6'] },
      
      // Civics & Government
      { id: 'community-helpers', name: 'Community Helpers', keywords: 'firefighter police doctor teacher', grades: ['K', '1'] },
      { id: 'rules-laws', name: 'Rules and Laws', keywords: 'classroom community safety', grades: ['K', '1', '2'] },
      { id: 'good-citizenship', name: 'Good Citizenship', keywords: 'responsibility respect honesty', grades: ['K', '1', '2', '3'] },
      { id: 'us-symbols', name: 'American Symbols', keywords: 'flag eagle Liberty Bell monuments', grades: ['K', '1', '2', '3'] },
      { id: 'national-holidays', name: 'National Holidays', keywords: 'Thanksgiving Independence Veterans Memorial', grades: ['1', '2', '3'] },
      { id: 'branches-of-government', name: 'Three Branches of Government', keywords: 'legislative executive judicial', grades: ['3', '4', '5', '6'] },
      { id: 'levels-of-government', name: 'Levels of Government', keywords: 'local state federal', grades: ['3', '4', '5'] },
      { id: 'elections-voting', name: 'Elections & Voting', keywords: 'democracy vote campaign', grades: ['3', '4', '5', '6'] },
      { id: 'us-presidents', name: 'US Presidents', keywords: 'leaders history White House', grades: ['2', '3', '4', '5'] },
      { id: 'rights-responsibilities', name: 'Rights & Responsibilities', keywords: 'citizens duties freedoms', grades: ['3', '4', '5', '6'] },
      
      // Economics
      { id: 'wants-needs', name: 'Wants vs Needs', keywords: 'basic survival desires', grades: ['K', '1', '2'] },
      { id: 'goods-services', name: 'Goods & Services', keywords: 'products work jobs', grades: ['1', '2', '3'] },
      { id: 'producers-consumers', name: 'Producers & Consumers', keywords: 'make buy sell', grades: ['2', '3', '4'] },
      { id: 'supply-demand', name: 'Supply & Demand', keywords: 'scarcity price market', grades: ['4', '5', '6'] },
      { id: 'economic-systems', name: 'Economic Systems', keywords: 'capitalism socialism communism market', grades: ['6', '7', '8'] },
      { id: 'money-banking', name: 'Money & Banking', keywords: 'currency savings interest', grades: ['3', '4', '5'] },
      { id: 'budgeting', name: 'Budgeting', keywords: 'income expenses saving spending', grades: ['4', '5', '6'] },
      { id: 'entrepreneurship', name: 'Entrepreneurship', keywords: 'business owner innovation', grades: ['4', '5', '6'] },
      
      // Culture & Society
      { id: 'family-community', name: 'Family & Community', keywords: 'relatives neighbors helpers', grades: ['K', '1'] },
      { id: 'cultures-traditions', name: 'Cultures & Traditions', keywords: 'customs celebrations heritage', grades: ['1', '2', '3', '4'] },
      { id: 'world-religions', name: 'World Religions', keywords: 'Christianity Islam Judaism Buddhism Hindu', grades: ['6', '7', '8'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WORLD LANGUAGES - SPANISH
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'spanish',
    name: 'Spanish',
    icon: '🇪🇸',
    topics: [
      { id: 'spanish-greetings', name: 'Greetings & Introductions', keywords: 'hola adios buenos dias', grades: ['K', '1', '2', '3', '4', '5', '6', '7', '8'] },
      { id: 'spanish-numbers-10', name: 'Numbers 1-10', keywords: 'uno dos tres cuatro cinco', grades: ['K', '1', '2'] },
      { id: 'spanish-numbers-20', name: 'Numbers 1-20', keywords: 'once doce trece catorce', grades: ['1', '2', '3'] },
      { id: 'spanish-numbers-100', name: 'Numbers 1-100', keywords: 'veinte treinta cuarenta', grades: ['2', '3', '4', '5'] },
      { id: 'spanish-colors', name: 'Colors', keywords: 'rojo azul verde amarillo', grades: ['K', '1', '2', '3'] },
      { id: 'spanish-days', name: 'Days of the Week', keywords: 'lunes martes miercoles', grades: ['1', '2', '3', '4'] },
      { id: 'spanish-months', name: 'Months & Seasons', keywords: 'enero febrero primavera verano', grades: ['2', '3', '4', '5'] },
      { id: 'spanish-family', name: 'Family Members', keywords: 'madre padre hermano hermana', grades: ['1', '2', '3', '4'] },
      { id: 'spanish-body', name: 'Body Parts', keywords: 'cabeza mano pie ojo', grades: ['1', '2', '3', '4'] },
      { id: 'spanish-food', name: 'Food & Drinks', keywords: 'comida agua leche pan', grades: ['2', '3', '4', '5'] },
      { id: 'spanish-animals', name: 'Animals', keywords: 'perro gato pajaro pez', grades: ['K', '1', '2', '3'] },
      { id: 'spanish-clothing', name: 'Clothing', keywords: 'camisa pantalones zapatos', grades: ['2', '3', '4', '5'] },
      { id: 'spanish-classroom', name: 'Classroom Objects', keywords: 'libro lapiz papel mesa', grades: ['1', '2', '3'] },
      { id: 'spanish-house', name: 'House & Rooms', keywords: 'casa cocina cuarto bano', grades: ['2', '3', '4', '5'] },
      { id: 'spanish-weather', name: 'Weather', keywords: 'hace sol llueve nieve', grades: ['2', '3', '4'] },
      { id: 'spanish-verbs-basic', name: 'Basic Verbs', keywords: 'ser estar tener ir', grades: ['3', '4', '5', '6'] },
      { id: 'spanish-ar-verbs', name: '-AR Verb Conjugation', keywords: 'hablar caminar estudiar', grades: ['4', '5', '6', '7'] },
      { id: 'spanish-er-ir-verbs', name: '-ER/-IR Verb Conjugation', keywords: 'comer vivir escribir', grades: ['5', '6', '7', '8'] },
      { id: 'spanish-adjectives', name: 'Adjectives & Agreement', keywords: 'grande pequeno bonito', grades: ['3', '4', '5', '6'] },
      { id: 'spanish-questions', name: 'Question Words', keywords: 'que quien donde cuando como', grades: ['2', '3', '4', '5'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTS & MUSIC
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'arts-music',
    name: 'Arts & Music',
    icon: '🎨',
    topics: [
      // Visual Arts
      { id: 'primary-colors', name: 'Primary Colors', keywords: 'red yellow blue mixing', grades: ['K', '1', '2'] },
      { id: 'secondary-colors', name: 'Secondary Colors', keywords: 'orange green purple mixing', grades: ['1', '2', '3'] },
      { id: 'color-wheel', name: 'Color Wheel', keywords: 'warm cool complementary', grades: ['2', '3', '4', '5'] },
      { id: 'elements-of-art', name: 'Elements of Art', keywords: 'line shape color value texture form space', grades: ['2', '3', '4', '5', '6'] },
      { id: 'principles-of-design', name: 'Principles of Design', keywords: 'balance contrast emphasis pattern unity', grades: ['3', '4', '5', '6', '7'] },
      { id: 'art-tools', name: 'Art Tools & Materials', keywords: 'brush pencil canvas palette', grades: ['K', '1', '2'] },
      { id: 'famous-artists', name: 'Famous Artists', keywords: 'Van Gogh Picasso Monet Kahlo', grades: ['3', '4', '5', '6', '7'] },
      { id: 'art-movements', name: 'Art Movements', keywords: 'Impressionism Cubism Renaissance Surrealism', grades: ['5', '6', '7', '8'] },
      
      // Music
      { id: 'music-basics', name: 'Music Basics', keywords: 'rhythm beat tempo melody', grades: ['K', '1', '2'] },
      { id: 'instrument-families', name: 'Instrument Families', keywords: 'strings woodwinds brass percussion', grades: ['2', '3', '4', '5'] },
      { id: 'musical-instruments', name: 'Musical Instruments', keywords: 'piano guitar violin drums flute', grades: ['1', '2', '3', '4'] },
      { id: 'music-notes', name: 'Music Notes', keywords: 'whole half quarter eighth treble bass', grades: ['2', '3', '4', '5'] },
      { id: 'music-symbols', name: 'Music Symbols', keywords: 'staff clef time signature rest', grades: ['3', '4', '5', '6'] },
      { id: 'music-terms', name: 'Musical Terms', keywords: 'forte piano crescendo tempo allegro', grades: ['3', '4', '5', '6', '7'] },
      { id: 'orchestra', name: 'Orchestra', keywords: 'conductor sections symphony', grades: ['3', '4', '5', '6'] },
      { id: 'famous-composers', name: 'Famous Composers', keywords: 'Bach Mozart Beethoven', grades: ['4', '5', '6', '7'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HEALTH & PE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'health-pe',
    name: 'Health & PE',
    icon: '💪',
    topics: [
      // Health
      { id: 'body-parts-health', name: 'Body Parts', keywords: 'head shoulders knees toes', grades: ['K', '1'] },
      { id: 'hygiene', name: 'Personal Hygiene', keywords: 'handwashing brushing bathing germs', grades: ['K', '1', '2', '3'] },
      { id: 'food-groups', name: 'Food Groups', keywords: 'fruits vegetables grains protein dairy MyPlate', grades: ['1', '2', '3', '4'] },
      { id: 'nutrition', name: 'Nutrition', keywords: 'vitamins minerals healthy eating', grades: ['2', '3', '4', '5'] },
      { id: 'healthy-habits', name: 'Healthy Habits', keywords: 'sleep exercise water', grades: ['K', '1', '2', '3'] },
      { id: 'safety', name: 'Safety', keywords: 'fire stranger internet road', grades: ['K', '1', '2', '3', '4'] },
      { id: 'first-aid', name: 'First Aid', keywords: 'bandage emergency CPR', grades: ['4', '5', '6'] },
      { id: 'human-body-health', name: 'Human Body Systems', keywords: 'organs systems functions', grades: ['4', '5', '6'] },
      { id: 'mental-health', name: 'Mental Health', keywords: 'stress coping emotions wellness', grades: ['4', '5', '6', '7', '8'] },
      { id: 'disease-prevention', name: 'Disease Prevention', keywords: 'germs bacteria virus immune', grades: ['4', '5', '6', '7'] },
      { id: 'substance-abuse', name: 'Substance Abuse Prevention', keywords: 'drugs alcohol tobacco', grades: ['5', '6', '7', '8'] },
      
      // Physical Education
      { id: 'fitness-components', name: 'Fitness Components', keywords: 'strength endurance flexibility cardio', grades: ['3', '4', '5', '6'] },
      { id: 'exercise-types', name: 'Types of Exercise', keywords: 'aerobic strength stretching', grades: ['2', '3', '4', '5'] },
      { id: 'sports-rules', name: 'Sports Rules', keywords: 'basketball soccer baseball', grades: ['2', '3', '4', '5', '6'] },
      { id: 'sportsmanship', name: 'Sportsmanship', keywords: 'teamwork fair play respect', grades: ['1', '2', '3', '4'] },
      { id: 'olympics', name: 'Olympics', keywords: 'games sports countries medals', grades: ['3', '4', '5', '6'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNOLOGY & COMPUTER SCIENCE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    topics: [
      { id: 'computer-parts', name: 'Computer Parts', keywords: 'keyboard mouse monitor CPU', grades: ['1', '2', '3', '4'] },
      { id: 'keyboard-skills', name: 'Keyboard & Typing', keywords: 'home row keys fingers', grades: ['1', '2', '3', '4'] },
      { id: 'internet-basics', name: 'Internet Basics', keywords: 'browser website search URL', grades: ['2', '3', '4'] },
      { id: 'internet-safety', name: 'Internet Safety', keywords: 'privacy passwords cyberbullying', grades: ['2', '3', '4', '5', '6'] },
      { id: 'digital-citizenship', name: 'Digital Citizenship', keywords: 'responsible online behavior', grades: ['3', '4', '5', '6', '7'] },
      { id: 'file-management', name: 'File Management', keywords: 'save folders organize', grades: ['3', '4', '5'] },
      { id: 'coding-basics', name: 'Coding Basics', keywords: 'sequence loops algorithm', grades: ['2', '3', '4', '5'] },
      { id: 'scratch-programming', name: 'Scratch Programming', keywords: 'blocks sprites animation', grades: ['3', '4', '5', '6'] },
      { id: 'algorithms', name: 'Algorithms', keywords: 'steps instructions problem solving', grades: ['4', '5', '6', '7'] },
      { id: 'binary-code', name: 'Binary Code', keywords: 'ones zeros computer language', grades: ['5', '6', '7', '8'] },
      { id: 'robotics', name: 'Robotics', keywords: 'robots sensors programming', grades: ['4', '5', '6', '7', '8'] },
      { id: 'ai-basics', name: 'Artificial Intelligence', keywords: 'machine learning computers thinking', grades: ['6', '7', '8'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SOCIAL-EMOTIONAL LEARNING (SEL)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sel',
    name: 'Social-Emotional Learning',
    icon: '❤️',
    topics: [
      { id: 'emotions', name: 'Identifying Emotions', keywords: 'happy sad angry scared feelings', grades: ['K', '1', '2', '3'] },
      { id: 'managing-emotions', name: 'Managing Emotions', keywords: 'calm down self-control regulation', grades: ['K', '1', '2', '3', '4'] },
      { id: 'empathy', name: 'Empathy', keywords: 'understanding others feelings perspective', grades: ['K', '1', '2', '3', '4', '5'] },
      { id: 'kindness', name: 'Kindness', keywords: 'caring helping others nice', grades: ['K', '1', '2', '3'] },
      { id: 'friendship', name: 'Friendship Skills', keywords: 'making friends sharing cooperation', grades: ['K', '1', '2', '3', '4'] },
      { id: 'conflict-resolution', name: 'Conflict Resolution', keywords: 'problem solving compromise peace', grades: ['1', '2', '3', '4', '5', '6'] },
      { id: 'bullying-prevention', name: 'Bullying Prevention', keywords: 'bystander upstander respect', grades: ['2', '3', '4', '5', '6'] },
      { id: 'growth-mindset', name: 'Growth Mindset', keywords: 'mistakes learning effort yet', grades: ['1', '2', '3', '4', '5', '6'] },
      { id: 'self-esteem', name: 'Self-Esteem', keywords: 'confidence strengths positive', grades: ['2', '3', '4', '5', '6'] },
      { id: 'goal-setting', name: 'Goal Setting', keywords: 'SMART goals planning achieve', grades: ['2', '3', '4', '5', '6', '7', '8'] },
      { id: 'responsibility', name: 'Responsibility', keywords: 'accountability choices consequences', grades: ['1', '2', '3', '4', '5'] },
      { id: 'decision-making', name: 'Decision Making', keywords: 'choices consequences thinking', grades: ['2', '3', '4', '5', '6', '7'] },
      { id: 'communication', name: 'Communication Skills', keywords: 'listening speaking assertive', grades: ['3', '4', '5', '6', '7', '8'] },
      { id: 'stress-management', name: 'Stress Management', keywords: 'relaxation coping mindfulness', grades: ['4', '5', '6', '7', '8'] },
      { id: 'teamwork', name: 'Teamwork', keywords: 'collaboration cooperation group', grades: ['K', '1', '2', '3', '4', '5'] },
    ],
  },
];

// Helper function to get topics for a specific grade
export function getTopicsForGrade(grade: string, subjectId?: string): TopicItem[] {
  let allTopics: TopicItem[] = [];
  
  const subjectsToSearch = subjectId 
    ? subjects.filter(s => s.id === subjectId)
    : subjects;
  
  for (const subject of subjectsToSearch) {
    const gradeTopics = subject.topics.filter(topic => topic.grades.includes(grade));
    allTopics = [...allTopics, ...gradeTopics];
  }
  
  return allTopics;
}

// Helper function to get all grades
export function getAllGrades(): { value: string; label: string }[] {
  return [
    { value: 'K', label: 'Kindergarten' },
    { value: '1', label: '1st Grade' },
    { value: '2', label: '2nd Grade' },
    { value: '3', label: '3rd Grade' },
    { value: '4', label: '4th Grade' },
    { value: '5', label: '5th Grade' },
    { value: '6', label: '6th Grade' },
    { value: '7', label: '7th Grade' },
    { value: '8', label: '8th Grade' },
  ];
}

// Helper to build a topic string for the AI
export function buildTopicString(topic: TopicItem, grade: string): string {
  const gradeLabel = grade === 'K' ? 'Kindergarten' : `${grade}th grade`;
  return `${topic.name} for ${gradeLabel} - ${topic.keywords}`;
}
