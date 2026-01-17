# Worksheet Generator - Research Findings
## Deep Dive: How to Build a Chalkie.ai Competitor

---

## 🔍 CHALKIE.AI ANALYSIS

### What They Do
- **AI-powered lesson/worksheet generator** for teachers
- Generates slides, worksheets, and activity sheets on any topic
- Curriculum-aligned (Common Core, NGSS, state standards, international)
- Exports to PDF, Google Slides, PowerPoint

### Tech Stack (Revealed)
From their "Responsible AI" page:
> "When you create a lesson, worksheet, or activity, your prompt is sent to an AI model (we primarily use **OpenAI and Google models**) which generates content based on your specifications."

**Key Insight:** They're NOT using AI to generate images. They're using:
1. **LLMs** (GPT/Gemini) for text content
2. **Pre-built templates** with curated illustrations
3. **Theme system** for visual consistency
4. **Block-based editor** for layout

### Pricing
- **Free:** 5 resources/week
- **Pro:** $6.65/month ($79.80/year) - 300 resources/month
- **Schools:** Custom pricing

### Key Features
- Multiple question types (MCQ, short-answer, cloze, gap fills)
- AI-powered editing ("make it more fun", differentiation)
- Curriculum alignment
- Export to multiple formats
- No API access publicly available

### Why It Works
1. **Templates + LLM = Consistency** - Not trying to AI-generate images
2. **Curated visual assets** - Professional illustrations, not AI garbage
3. **Block-based layouts** - Constrained but professional output
4. **Focus on teachers** - Knows the use case deeply

---

## 🎨 ILLUSTRATION & IMAGE API OPTIONS

### Tier 1: Professional Stock + Illustration APIs

#### **Freepik API** ⭐⭐⭐⭐⭐ RECOMMENDED
- **URL:** https://www.freepik.com/api | https://docs.freepik.com/
- **What they have:**
  - Stock Content API (millions of vectors, photos, icons, templates)
  - AI Image Generation API (Mystic model)
  - Icon Generation API
  - Image Upscaling/Editing API
- **Pricing:** Pay-as-you-go, starts with 5 EUR free credit
- **Why it's good:** MASSIVE library of educational illustrations, clean vectors
- **MCP Integration:** They have an official MCP server for AI assistants!

#### **Vecteezy API** ⭐⭐⭐⭐
- **URL:** https://www.vecteezy.com/developers
- **What they have:** 50M+ photos, videos, SVGs, PNGs
- **Pricing:**
  - Free: 500 downloads/month
  - Pay-As-You-Go: $0.002/API call, $1/download
  - Business: Custom pricing
- **Why it's good:** AI-powered search, dynamic resizing, commercial rights

#### **Adobe Stock API** ⭐⭐⭐⭐
- **URL:** https://developer.adobe.com/stock/
- **What they have:** High-quality stock images, graphics, videos
- **Use cases:** Print-on-demand, marketing platforms, DAMs
- **Integration:** Works with Microsoft PowerPoint & Teams
- **Note:** Enterprise-grade, may be expensive for indie dev

#### **Flaticon (via Freepik API)** ⭐⭐⭐⭐
- **URL:** https://www.flaticon.com/ (API through Freepik)
- **What they have:** 18M+ icons in PNG, SVG, EPS, PSD
- **Styles:** Black outline, filled, gradient, hand-drawn, lineal color, flat
- **Categories:** Education, business, science, people, etc.
- **Note:** Part of Freepik ecosystem

### Tier 2: Scientific/Medical Illustrations

#### **Servier Medical Art (SMART)** ⭐⭐⭐⭐⭐ FREE!
- **URL:** https://smart.servier.com/
- **What they have:** 3,000+ FREE medical/scientific illustrations
- **Categories:**
  - Anatomy (cardiovascular, digestive, nervous, respiratory systems)
  - Cellular Biology (cell membrane, genetics, tissues)
  - Medical Specialties (cardiology, neurology, oncology)
  - General Items (animals, equipment, food, people)
  - Scientific illustrations, world maps
- **License:** CC BY 4.0 (free, even for commercial use with attribution)
- **Quality:** Professional-grade, PowerPoint-ready
- **PERFECT FOR:** Science worksheets (anatomy, biology, cells, organs)

### Tier 3: General Stock APIs

#### **Pixabay API** (You have this key!)
- 4.5M+ free images, vectors, videos
- Good for general educational images
- Free, with attribution

#### **Unsplash API** (You have this key!)
- High-quality photography
- Better for backgrounds, inspiration than diagrams
- Free tier available

#### **Pexels API** (You have this key!)
- Similar to Unsplash
- Good for lifestyle/contextual images

---

## 🤖 COMPETITOR ANALYSIS

### **MagicSchool.ai**
- **Position:** "#1 AI platform for Teachers"
- **Features:** 80+ teacher tools, lesson plans, rubrics, quizzes
- **Focus:** Time-saving for teachers, not specifically worksheets
- **Tech:** AI-powered, integrates with Google/Canvas/etc.

### **Curipod**
- **Focus:** Interactive lessons with student participation
- **Features:** Real-time AI feedback, teacher-paced lessons
- **Differentiation:** Student engagement, not printable worksheets

### **Canva for Education**
- **URL:** https://www.canva.com/create/worksheets/
- **Features:** Template-based worksheet creation
- **Developer API:** Yes! Connect APIs for autofill, exports, etc.
- **Strength:** Beautiful templates, easy drag-and-drop
- **Weakness:** Not AI-generated content, manual creation

### **Gamma.app**
- **Focus:** AI presentations, websites, documents
- **Has API:** Yes (Beta)
- **Could be useful:** For slide-style worksheets

---

## 📋 YOUR CURRENT API INVENTORY

| API | Purpose | Quality for Worksheets |
|-----|---------|----------------------|
| **OpenAI** | Content generation (GPT-4), DALL-E 3 | ⭐⭐⭐⭐⭐ for text, ⭐⭐ for images |
| **Anthropic (Claude)** | Content generation | ⭐⭐⭐⭐⭐ for text |
| **Stability AI** | Image generation | ⭐⭐⭐ (inconsistent for diagrams) |
| **Replicate** | Various AI models | ⭐⭐⭐ (depends on model) |
| **Pixabay** | Stock photos/vectors | ⭐⭐⭐ (limited edu-specific) |
| **Unsplash** | Stock photos | ⭐⭐ (photos, not illustrations) |
| **Pexels** | Stock photos | ⭐⭐ (photos, not illustrations) |
| **GIPHY** | GIFs | ⭐ (not relevant) |
| **Tavily/SerpAPI** | Web search | ⭐⭐⭐ (research, fact-checking) |

### APIs You SHOULD Add

| API | Purpose | Why |
|-----|---------|-----|
| **Freepik API** | Illustrations, vectors, icons | Best edu-illustration library |
| **Vecteezy API** | Vectors, photos, SVGs | 50M+ assets, good search |
| **Servier SMART** | Scientific diagrams | FREE! Perfect for science |
| **Canva Connect API** | Design templates, exports | Professional output |

---

## 🏗️ RECOMMENDED ARCHITECTURE

Based on research, here's what will actually work:

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER REQUEST                              │
│        "Create a worksheet about parts of a flower"             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    1. CONTENT GENERATOR                          │
│  • GPT-4 / Claude generates:                                     │
│    - Title, instructions, questions                              │
│    - Answer key                                                  │
│    - Learning objectives                                         │
│    - Suggested image keywords                                    │
│  Output: Structured JSON                                         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    2. ASSET RESOLVER                             │
│  Priority order:                                                 │
│  1. Check curated asset library (local/DB)                       │
│  2. Query Freepik API for vectors/illustrations                  │
│  3. Query Servier SMART for science diagrams                     │
│  4. Query Vecteezy for additional options                        │
│  5. Fallback: AI image generation (DALL-E 3 / Stability)         │
│  Output: Array of image URLs/paths                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    3. TEMPLATE SELECTOR                          │
│  Based on worksheet type:                                        │
│  • Labeled Diagram → DiagramTemplate                             │
│  • Comparison/Sorting → GridTemplate                             │
│  • Vocabulary → CardGridTemplate                                 │
│  • Multiple Choice → QuizTemplate                                │
│  • Fill-in-blank → ClozeTemplate                                 │
│  • Map/Geography → MapTemplate                                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    4. PDF RENDERER                               │
│  Options:                                                        │
│  • React-PDF (@react-pdf/renderer)                               │
│  • Puppeteer (HTML → PDF, higher quality)                        │
│  • PDFKit (low-level, precise control)                           │
│  Output: Print-quality PDF (Letter/A4)                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       5. OUTPUT                                  │
│  • PDF download                                                  │
│  • PNG preview                                                   │
│  • Google Docs export                                            │
│  • Answer key (separate PDF)                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 ACTION PLAN

### Phase 1: Foundation (Week 1-2)
1. **Set up project** - Next.js + TypeScript
2. **Get Freepik API key** - https://www.freepik.com/api
3. **Download Servier SMART assets** - https://smart.servier.com/image-kits-by-category/
4. **Build basic content generator** - GPT-4 structured output
5. **Create 3 base templates** - Labeled diagram, vocabulary cards, quiz

### Phase 2: Core Features (Week 3-4)
1. **Asset resolver service** - Multi-source image fetching
2. **PDF generation** - React-PDF or Puppeteer
3. **Template system** - Dynamic layout engine
4. **Web UI** - Worksheet generator interface

### Phase 3: Polish (Week 5-6)
1. **More templates** - Map, circuit, comparison worksheets
2. **Export options** - Google Docs, PowerPoint
3. **Answer key generation**
4. **Curriculum alignment** (optional)

---

## 🔑 API KEYS TO GET

### Immediate (Free tiers available)
1. **Freepik API** - https://www.freepik.com/api/pricing
   - Get key: https://www.freepik.com/developers/dashboard
   - Free: 5 EUR credit to start

2. **Vecteezy API** - https://www.vecteezy.com/developers
   - Free tier: 500 downloads/month

### Download Now (Free, no API needed)
3. **Servier Medical Art** - https://smart.servier.com/image-kits-by-category/
   - Download all category packs
   - CC BY 4.0 license

### Consider Later
4. **Canva Connect API** - For advanced design features
5. **Adobe Stock API** - If you need enterprise-grade images

---

## 💡 KEY INSIGHTS

### Why Your Previous Attempts Failed
1. **Relying on AI image generation** - It can't do accurate diagrams
2. **Expecting stock photos to work** - Photos ≠ educational illustrations
3. **HTML → PDF approach** - Looks like a web page, not a worksheet

### What Will Actually Work
1. **Template-based design** - Like Chalkie, Canva, TPT creators
2. **Curated illustration library** - Freepik vectors, Servier science
3. **LLM for content only** - GPT-4/Claude excel at text
4. **Proper PDF rendering** - React-PDF or Puppeteer for print quality

### The Secret Sauce
The best worksheet generators don't try to AI-generate everything. They:
1. Use **templates** for consistent layouts
2. Source from **illustration libraries** (not AI)
3. Use **AI for text content** (questions, definitions, instructions)
4. Render with **proper PDF tools** (not HTML export)

---

## 📚 RESOURCES

### APIs
- Freepik Docs: https://docs.freepik.com/
- Vecteezy Docs: https://www.vecteezy.com/api-docs
- Servier SMART: https://smart.servier.com/

### PDF Generation
- React-PDF: https://react-pdf.org/
- Puppeteer: https://pptr.dev/
- PDFKit: http://pdfkit.org/

### Competitors to Study
- Chalkie: https://chalkie.ai/
- Canva Worksheets: https://www.canva.com/create/worksheets/
- Teachers Pay Teachers: https://www.teacherspayteachers.com/ (for design inspiration)

---

*Ready to build? Let's start with Phase 1!*
