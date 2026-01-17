# 📚 WORKSHEET GENERATOR - PROJECT CONTEXT DOCUMENT

> **Last Updated:** January 17, 2026  
> **Document Version:** 1.3.0  
> **Status:** Phase 2 - Content Generation (Ready to start)

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Project Goals & Success Criteria](#2-project-goals--success-criteria)
3. [Technical Architecture](#3-technical-architecture)
4. [API Inventory & Configuration](#4-api-inventory--configuration)
5. [Worksheet Types & Templates](#5-worksheet-types--templates)
6. [Asset Management Strategy](#6-asset-management-strategy)
7. [Content Generation Strategy](#7-content-generation-strategy)
8. [PDF Generation Strategy](#8-pdf-generation-strategy)
9. [User Interface Requirements](#9-user-interface-requirements)
10. [File Structure & Conventions](#10-file-structure--conventions)
11. [Database Schema](#11-database-schema)
12. [Deployment Strategy](#12-deployment-strategy)
13. [Known Constraints & Limitations](#13-known-constraints--limitations)
14. [Research Findings Summary](#14-research-findings-summary)
15. [Competitor Analysis](#15-competitor-analysis)
16. [Glossary](#16-glossary)
17. [Change Log](#17-change-log)

---

## 1. PROJECT OVERVIEW

### 1.1 Project Name
**Worksheet Generator** (working title)

### 1.2 Project Description
A web application that generates high-quality, print-ready educational worksheets on-demand. The system uses AI for content generation (questions, definitions, instructions) and pulls from professional illustration libraries for visual assets, then renders everything into print-quality PDFs.

### 1.3 Core Problem Statement
Current AI-based worksheet generators fail because they:
1. Use AI-generated images that are inaccurate for educational diagrams
2. Produce HTML-looking output instead of print-quality worksheets
3. Use generic stock photos instead of educational illustrations
4. Cannot create accurate scientific diagrams (atoms, circuits, anatomy, etc.)

### 1.4 Solution Approach
Create a hybrid system that:
1. Uses **LLMs (GPT-4/Claude)** for text content generation only
2. Uses **professional illustration APIs** (Freepik, Vecteezy) for visual assets
3. Uses **curated local assets** (Servier SMART) for scientific diagrams
4. Uses **template-based layouts** for consistent, professional output
5. Uses **proper PDF rendering** (React-PDF/Puppeteer) for print quality

### 1.5 Target Users
- **Primary:** K-12 Teachers
- **Secondary:** Homeschool parents, tutors, curriculum developers
- **Tertiary:** Educational content creators

### 1.6 Project Location
```
c:\Users\scoso\WEBSITES\new worksheet generator\
```

---

## 2. PROJECT GOALS & SUCCESS CRITERIA

### 2.1 Primary Goals

| ID | Goal | Priority | Status |
|----|------|----------|--------|
| G1 | Generate print-quality PDF worksheets | Critical | Not Started |
| G2 | Support multiple worksheet types (see Section 5) | Critical | Not Started |
| G3 | Use accurate, professional illustrations | Critical | Not Started |
| G4 | AI-generated text content (questions, definitions) | Critical | Not Started |
| G5 | Web-based user interface | High | Not Started |
| G6 | Export to PDF, PNG | High | Not Started |
| G7 | Answer key generation | Medium | Not Started |
| G8 | Curriculum alignment (optional) | Low | Not Started |

### 2.2 Success Criteria

| Criterion | Measurement | Target |
|-----------|-------------|--------|
| Visual Quality | Subjective comparison to examples | Match quality of provided examples |
| Diagram Accuracy | Manual review | 100% factual accuracy for science diagrams |
| Print Quality | DPI check | Minimum 150 DPI, target 300 DPI |
| Generation Time | Measured | < 30 seconds per worksheet |
| User Satisfaction | User testing | Positive feedback from teachers |

### 2.3 Non-Goals (Explicitly Out of Scope for v1)
- Real-time collaboration
- Student login/tracking
- LMS integration
- Mobile app
- Worksheet grading/scoring
- Video content generation

---

## 3. TECHNICAL ARCHITECTURE

### 3.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14+ (App Router) | Modern React, SSR, API routes |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS | Rapid UI development |
| **PDF Generation** | React-PDF (@react-pdf/renderer) | React-native PDF rendering |
| **PDF Fallback** | Puppeteer | HTML-to-PDF for complex layouts |
| **State Management** | Zustand or React Context | Lightweight, sufficient for needs |
| **API Layer** | Next.js API Routes | Integrated, serverless-ready |
| **Database** | SQLite (dev) / PostgreSQL (prod) | Simple to start, scalable later |
| **ORM** | Prisma | Type-safe database access |
| **File Storage** | Local (dev) / S3 or Cloudflare R2 (prod) | Asset and generated file storage |
| **Deployment** | Vercel or Railway | Easy Next.js deployment |

### 3.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │  Worksheet Form │  │ Template Picker │  │  Preview Panel  │              │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘              │
│           │                    │                    │                        │
│           └────────────────────┼────────────────────┘                        │
│                                │                                             │
│                    ┌───────────▼───────────┐                                │
│                    │   Worksheet Store     │                                │
│                    │   (Zustand/Context)   │                                │
│                    └───────────┬───────────┘                                │
└────────────────────────────────┼────────────────────────────────────────────┘
                                 │ API Calls
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API LAYER (Next.js API Routes)                     │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
│  │ POST /api/       │  │ GET /api/        │  │ GET /api/        │           │
│  │ generate         │  │ templates        │  │ assets/search    │           │
│  └────────┬─────────┘  └──────────────────┘  └────────┬─────────┘           │
│           │                                           │                      │
└───────────┼───────────────────────────────────────────┼──────────────────────┘
            │                                           │
            ▼                                           ▼
┌───────────────────────────┐             ┌───────────────────────────────────┐
│    CONTENT GENERATOR      │             │        ASSET RESOLVER              │
│                           │             │                                    │
│  ┌─────────────────────┐  │             │  ┌────────────────────────────┐   │
│  │ OpenAI GPT-4        │  │             │  │ 1. Local Asset Library     │   │
│  │ - Questions         │  │             │  │    (Servier SMART)         │   │
│  │ - Definitions       │  │             │  └────────────┬───────────────┘   │
│  │ - Instructions      │  │             │               │ Not found?        │
│  │ - Answer keys       │  │             │               ▼                   │
│  └─────────────────────┘  │             │  ┌────────────────────────────┐   │
│                           │             │  │ 2. Freepik API             │   │
│  ┌─────────────────────┐  │             │  │    (Vectors/Illustrations) │   │
│  │ Claude (Backup)     │  │             │  └────────────┬───────────────┘   │
│  └─────────────────────┘  │             │               │ Not found?        │
│                           │             │               ▼                   │
│  Output: Structured JSON  │             │  ┌────────────────────────────┐   │
│  {                        │             │  │ 3. Vecteezy API            │   │
│    title: string,         │             │  │    (Photos/Vectors)        │   │
│    instructions: string,  │             │  └────────────┬───────────────┘   │
│    questions: [...],      │             │               │ Not found?        │
│    answers: [...],        │             │               ▼                   │
│    imageKeywords: [...]   │             │  ┌────────────────────────────┐   │
│  }                        │             │  │ 4. AI Image Gen (Fallback) │   │
└───────────────────────────┘             │  │    (DALL-E 3 / Stability)  │   │
                                          │  └────────────────────────────┘   │
                                          │                                    │
                                          │  Output: Array of image URLs/paths │
                                          └───────────────────────────────────┘
                                                          │
                    ┌─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TEMPLATE ENGINE                                    │
│                                                                              │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐   │
│  │ DiagramTemplate│ │ GridTemplate │ │ QuizTemplate │ │ MapTemplate   │   │
│  │ (labeled parts)│ │ (vocab cards)│ │ (MCQ/fill-in)│ │ (geography)   │   │
│  └───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘   │
│                                                                              │
│  Each template:                                                              │
│  - Accepts content JSON + assets                                             │
│  - Renders to React-PDF components                                           │
│  - Produces consistent, professional layout                                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PDF RENDERER                                       │
│                                                                              │
│  Primary: React-PDF (@react-pdf/renderer)                                   │
│  - Native PDF generation                                                     │
│  - Vector text (not rasterized)                                              │
│  - Embedded fonts                                                            │
│  - Print-quality output                                                      │
│                                                                              │
│  Fallback: Puppeteer                                                         │
│  - For complex layouts React-PDF can't handle                                │
│  - HTML → PDF conversion                                                     │
│  - Higher memory usage                                                       │
│                                                                              │
│  Output Formats:                                                             │
│  - PDF (primary)                                                             │
│  - PNG (for preview)                                                         │
│  - Answer Key PDF (separate document)                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Data Flow

```
User Input → Content Generation → Asset Resolution → Template Selection → PDF Rendering → Output
     │              │                    │                  │                  │           │
     │              │                    │                  │                  │           │
     ▼              ▼                    ▼                  ▼                  ▼           ▼
  Form data    GPT-4/Claude      Freepik/Vecteezy/    Match content      React-PDF      PDF
  - Topic      generates:        Local assets         to template        renders        download
  - Grade      - Title           returns:             type               document       or
  - Type       - Questions       - Image URLs                                          preview
  - Options    - Answers         - Local paths
               - Keywords
```

---

## 4. API INVENTORY & CONFIGURATION

### 4.1 Available APIs

#### 4.1.1 AI/LLM APIs

| API | Purpose | Key Variable | Status | Documentation |
|-----|---------|--------------|--------|---------------|
| **OpenAI** | Content generation (GPT-4), Image gen (DALL-E 3) | `OPENAI_API_KEY` | ✅ Configured | https://platform.openai.com/docs |
| **Anthropic** | Content generation (Claude) - backup | `ANTHROPIC_API_KEY` | ✅ Configured | https://docs.anthropic.com |
| **Stability AI** | AI image generation (fallback) | `STABILITY_AI_API_KEY` | ✅ Configured | https://platform.stability.ai/docs |
| **Replicate** | Various AI models | `REPLICATE_API_TOKEN` | ✅ Configured | https://replicate.com/docs |

#### 4.1.2 Illustration/Asset APIs

| API | Purpose | Key Variable(s) | Status | Documentation |
|-----|---------|-----------------|--------|---------------|
| **Freepik** | Vectors, illustrations, icons | `FREEPIK_API_KEY`, `FREEPIK_WEBHOOK_SECRET` | ✅ Configured | https://docs.freepik.com |
| **Vecteezy** | Vectors, photos, SVGs | `VECTEEZY_ACCOUNT_ID`, `VECTEEZY_SECRET_KEY` | ✅ Configured | https://www.vecteezy.com/api-docs |
| **Servier SMART** | Scientific/medical diagrams | `SERVIER_SMART_LOCAL_PATH` | ⚠️ Needs Download | https://smart.servier.com |

#### 4.1.3 Stock Photo APIs (Lower Priority)

| API | Purpose | Key Variable | Status |
|-----|---------|--------------|--------|
| **Pixabay** | Stock photos/vectors | `PIXABAY_API_KEY` | ✅ Configured |
| **Unsplash** | Stock photos | `UNSPLASH_ACCESS_KEY` | ✅ Configured |
| **Pexels** | Stock photos | `PEXELS_API_KEY` | ✅ Configured |

#### 4.1.4 Utility APIs

| API | Purpose | Key Variable | Status |
|-----|---------|--------------|--------|
| **Tavily** | Web search for research | `TAVILY_API_KEY` | ✅ Configured |
| **SerpAPI** | Search results | `SERPAPI_KEY` | ✅ Configured |

### 4.2 API Priority Order for Asset Resolution

When searching for images/illustrations:

1. **Local Servier SMART library** - For science/medical content
2. **Freepik API** - For educational illustrations
3. **Vecteezy API** - For additional vectors
4. **Pixabay API** - For general images
5. **AI Image Generation** - Last resort fallback

### 4.3 Environment Variables File Location

```
c:\Users\scoso\WEBSITES\new worksheet generator\.env
```

### 4.4 API Rate Limits & Quotas

| API | Free Tier Limits | Notes |
|-----|------------------|-------|
| Freepik | 5 EUR credit to start | Pay-as-you-go after |
| Vecteezy | 500 downloads/month | Unlimited API calls |
| OpenAI | Based on account tier | ~$20/month typical usage |
| Stability AI | Credits-based | Fallback only |

---

## 5. WORKSHEET TYPES & TEMPLATES

### 5.1 Worksheet Type Taxonomy

Based on the 9 example worksheets provided by the user, we've identified the following types:

#### 5.1.1 Labeled Diagram Worksheet
**Examples:** "Structure of an Atom", "Parts of a Flower"
```
┌─────────────────────────────────────────┐
│  Title: [Parts of a Flower]             │
├─────────────────────────────────────────┤
│                                         │
│          [Central Diagram]              │
│              ↙  ↓  ↘                    │
│         label  label  label             │
│         ↙               ↘               │
│      label              label           │
│                                         │
│  Instructions: Label each part...       │
│                                         │
│  Word Bank: petal, stamen, pistil...    │
└─────────────────────────────────────────┘
```
**Required Assets:** Central diagram image with clear labeling points
**Content Generated:** Labels, definitions, word bank

#### 5.1.2 Comparison/Sorting Worksheet
**Examples:** "Heavy vs Light"
```
┌─────────────────────────────────────────┐
│  Title: [Heavy vs Light]                │
├─────────────────────────────────────────┤
│  Instructions: Circle heavy, cross light│
│                                         │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐    │
│  │ 🦏  │  │ 🐦  │  │ 🐘  │  │ 🦋  │    │
│  └─────┘  └─────┘  └─────┘  └─────┘    │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐    │
│  │ 🦒  │  │ 🐿️  │  │ 🦔  │  │ 🐊  │    │
│  └─────┘  └─────┘  └─────┘  └─────┘    │
└─────────────────────────────────────────┘
```
**Required Assets:** Multiple individual images (animals, objects, etc.)
**Content Generated:** Categories, items to sort, instructions

#### 5.1.3 Circuit/Process Diagram Worksheet
**Examples:** "Open and Closed Circuits"
```
┌─────────────────────────────────────────┐
│  Title: [Open and Closed Circuits]      │
├─────────────────────────────────────────┤
│  Instructions: Will the bulb light?     │
│                                         │
│  a. [Circuit Diagram] → Will light: ___ │
│  b. [Circuit Diagram] → Will light: ___ │
│  c. [Circuit Diagram] → Will light: ___ │
│  d. [Circuit Diagram] → Will light: ___ │
└─────────────────────────────────────────┘
```
**Required Assets:** Circuit/process diagrams (likely need to generate programmatically)
**Content Generated:** Questions, predictions, explanations

#### 5.1.4 Vocabulary/Definition Cards Worksheet
**Examples:** "Landforms and Bodies of Water"
```
┌─────────────────────────────────────────┐
│  Title: [Landforms and Bodies of Water] │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │  [hill]  │  │[waterfall]│ │[valley]││
│  │ [image]  │  │  [image]  │ │[image] ││
│  │  A hill  │  │A waterfall│ │A valley││
│  │  is...   │  │   is...   │ │ is...  ││
│  └──────────┘  └──────────┘  └────────┘│
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ [island] │  │ [volcano] │ │[plain] ││
│  │ [image]  │  │  [image]  │ │[image] ││
│  │An island │  │A volcano  │ │A plain ││
│  │  is...   │  │   is...   │ │ is...  ││
│  └──────────┘  └──────────┘  └────────┘│
└─────────────────────────────────────────┘
```
**Required Assets:** Image for each vocabulary term
**Content Generated:** Terms, definitions, optional sentences

#### 5.1.5 Map/Geography Worksheet
**Examples:** "Map of the Thirteen Colonies", "Treasure Map Grid"
```
┌─────────────────────────────────────────┐
│  Title: [Map of the Thirteen Colonies]  │
├─────────────────────────────────────────┤
│                                         │
│         [Map Image]                     │
│         with labeled regions            │
│                                         │
│  Questions:                             │
│  1. Which colony is furthest north?     │
│  2. Name the colonies that border...    │
└─────────────────────────────────────────┘
```
**Required Assets:** Map images (may need specialized sources)
**Content Generated:** Map labels, questions about the map

#### 5.1.6 Coordinate Grid Worksheet
**Examples:** "Reading a Treasure Map using a Map Grid"
```
┌─────────────────────────────────────────┐
│  Title: [Reading a Treasure Map]        │
├─────────────────────────────────────────┤
│         A   B   C   D   E               │
│       ┌───┬───┬───┬───┬───┐             │
│     1 │   │ 🏴 │   │   │   │             │
│       ├───┼───┼───┼───┼───┤             │
│     2 │ 🌴│   │   │ 🦜 │   │             │
│       ├───┼───┼───┼───┼───┤             │
│     3 │   │   │ 💎 │   │ 🚢│             │
│       └───┴───┴───┴───┴───┘             │
│                                         │
│  1. What is at B,1? ___________         │
│  2. What are the coordinates of 💎? ____│
└─────────────────────────────────────────┘
```
**Required Assets:** Grid icons/images
**Content Generated:** Grid layout, items, coordinate questions

#### 5.1.7 Historical Document Worksheet
**Examples:** "The Preamble to the U.S. Constitution"
```
┌─────────────────────────────────────────┐
│  Title: [The Preamble to the U.S.       │
│          Constitution]                  │
├─────────────────────────────────────────┤
│  ╔═══════════════════════════════════╗  │
│  ║   [Decorative scroll/document]    ║  │
│  ║                                   ║  │
│  ║   "We the People of the United    ║  │
│  ║    States, in Order to form a     ║  │
│  ║    more perfect Union..."         ║  │
│  ║                                   ║  │
│  ╚═══════════════════════════════════╝  │
│                                         │
│  Questions:                             │
│  1. What does "establish Justice" mean? │
└─────────────────────────────────────────┘
```
**Required Assets:** Decorative frames, historical styling
**Content Generated:** Document text, comprehension questions

#### 5.1.8 Organizational Chart Worksheet
**Examples:** "The Structure of the U.S. Government"
```
┌─────────────────────────────────────────┐
│  Title: [Structure of U.S. Government]  │
├─────────────────────────────────────────┤
│  ┌───────────┬───────────┬───────────┐  │
│  │LEGISLATIVE│ EXECUTIVE │ JUDICIAL  │  │
│  │           │           │           │  │
│  │ [Capitol] │[Whitehouse]│ [Scales] │  │
│  │           │           │           │  │
│  │ Congress  │ President │ Supreme   │  │
│  │  ├─Senate │  Cabinet  │  Court    │  │
│  │  └─House  │           │           │  │
│  └───────────┴───────────┴───────────┘  │
└─────────────────────────────────────────┘
```
**Required Assets:** Icons for each branch, building images
**Content Generated:** Branch names, roles, responsibilities

#### 5.1.9 Multiple Choice Quiz Worksheet
```
┌─────────────────────────────────────────┐
│  Title: [Quiz: The Solar System]        │
├─────────────────────────────────────────┤
│  Name: ____________  Date: ____________ │
│                                         │
│  1. Which planet is closest to the sun? │
│     ○ A) Venus                          │
│     ○ B) Mercury                        │
│     ○ C) Mars                           │
│     ○ D) Earth                          │
│                                         │
│  2. How many moons does Mars have?      │
│     ○ A) 0                              │
│     ○ B) 1                              │
│     ○ C) 2                              │
│     ○ D) 4                              │
└─────────────────────────────────────────┘
```
**Required Assets:** Optional illustrations
**Content Generated:** Questions, answer choices, correct answers

#### 5.1.10 Fill-in-the-Blank / Cloze Worksheet
```
┌─────────────────────────────────────────┐
│  Title: [The Water Cycle]               │
├─────────────────────────────────────────┤
│  Word Bank: evaporation, condensation,  │
│             precipitation, collection   │
│                                         │
│  The water cycle has four main stages.  │
│  First, water __________ from lakes     │
│  and oceans. Then, water vapor rises    │
│  and __________ forms clouds...         │
└─────────────────────────────────────────┘
```
**Required Assets:** Optional diagram
**Content Generated:** Passage with blanks, word bank, answer key

### 5.2 Template Priority for MVP

| Priority | Template Type | Complexity | Notes |
|----------|---------------|------------|-------|
| 1 | Vocabulary Cards | Low | Good starting point |
| 2 | Labeled Diagram | Medium | High value for science |
| 3 | Multiple Choice Quiz | Low | Common use case |
| 4 | Fill-in-the-Blank | Low | Common use case |
| 5 | Comparison/Sorting | Medium | Needs multiple assets |
| 6 | Coordinate Grid | Medium | Programmatic generation |
| 7 | Organizational Chart | Medium | Column layout |
| 8 | Historical Document | Low | Decorative styling |
| 9 | Map/Geography | High | Needs map assets |
| 10 | Circuit/Process | High | Programmatic diagrams |

---

## 6. ASSET MANAGEMENT STRATEGY

### 6.1 Asset Sources

#### 6.1.1 Servier Medical Art (Local) - ⏸️ DEPRIORITIZED
**URL:** https://smart.servier.com/
**License:** CC BY 4.0 (free, commercial use with attribution)
**Status:** ⚠️ Downloaded but NOT usable as-is
**Location:** `/ServierMedicalArt-all-kits/`
**Index:** See [ASSET_INDEX.md](./ASSET_INDEX.md) for full catalog

**⚠️ LIMITATION DISCOVERED:**
The .pptx files contain vector shapes embedded in PowerPoint slides, NOT extractable image files.
The media folder only contains decorative banners. To use these illustrations would require:
1. Opening each .pptx manually in PowerPoint
2. Selecting and exporting shapes as SVG
3. Very time-consuming manual process

**Decision:** Deprioritize Servier for MVP. Focus on Freepik and Vecteezy APIs which provide
excellent educational illustrations via API with no manual work required.

**Categories Available:**
- Anatomy and The Human Body
  - Auditory system, Cardiovascular system, Digestive system
  - Glands, Locomotor system, Lymphatic system
  - Nervous system, Reproductive system, Respiratory system
  - Urinary system, Visual system
- Cellular Biology
  - Cell membrane, Intracellular components, Genetics
  - Lipids, Nucleic acids, Receptors and Channels, Tissues
- Medical Specialties
  - Cardiology, Dermatology, Embryology, Endocrinology
  - Gastroenterology, Immunology, Infectiology, Neurology
  - Oncology, Ophthalmology, Pulmonology, Rheumatology
- General Items
  - Animals, Clothes, Drugs and Treatments, Equipment
  - Food, People, Scientific illustrations, World maps

**Current Structure (Raw Downloads):**
```
ServierMedicalArt-all-kits/
├── SMART-Animals.pptx
├── SMART-Bones.pptx
├── SMART-Cell-membrane.pptx
├── SMART-Chemistry.pptx
├── SMART-Digestive-system.pptx
├── SMART-Heart-physiology.pptx
├── SMART-Nervous-system.pptx
├── SMART-Respiratory-system.pptx
├── ... (49 .pptx files total)
└── SMART-World-maps.pptx
```

**Target Structure (After Extraction):**
```
assets/servier-smart/
├── animals/
├── cardiovascular/
├── cellular-biology/
├── chemistry/
├── digestive/
├── nervous-system/
├── respiratory/
├── ... (organized by category)
└── index.json
```

⚠️ **Note:** Images need to be extracted from .pptx files (which are ZIP archives).

#### 6.1.2 Freepik API (Remote) - ⭐ PRIMARY SOURCE
**Base URL:** https://api.freepik.com/
**Documentation:** https://docs.freepik.com/
**Status:** ✅ TESTED & WORKING (Jan 17, 2026)

**Available Endpoints:**
- `GET /v1/resources` - Search stock content (vectors, photos, icons)
- `POST /v1/ai/mystic` - AI image generation
- `POST /v1/ai/icon-generation` - AI icon generation
- `POST /v1/ai/image-upscaler` - Image upscaling

**⚠️ IMPORTANT: Use `term` NOT `query` for search!**

**Correct Search Parameters:**
- `term` - Search term (NOT `query`!)
- `filters[content_type][vector]` - Set to 1 for vectors
- `order` - Use `relevance` for best results
- `per_page` - Results per page (max 100)

**Example Request:**
```
GET /v1/resources?term=butterfly+life+cycle&filters[content_type][vector]=1&order=relevance&per_page=10
Header: x-freepik-api-key: YOUR_KEY
```

**Elementary Topic Test Results (Jan 17, 2026):**
| Topic | Results | Quality |
|-------|---------|--------|
| Parts of flower diagram | 5,000+ | ⭐ Excellent |
| Butterfly life cycle | 2,069 | ⭐ Excellent |
| Solar system planets | 5,000+ | ⭐ Excellent |
| Water cycle | 5,000+ | ⭐ Excellent |
| Food pyramid nutrition | 2,075 | ⭐ Excellent |
| Simple machines | 5,000+ | ⭐ Excellent |
| Frog life cycle | 4,217 | ⭐ Excellent |
| Animal cell labeled | 5,000+ | ⭐ Excellent |

#### 6.1.3 Vecteezy API (Remote) - ⭐ SECONDARY SOURCE
**Base URL:** https://api.vecteezy.com/v2/
**Documentation:** https://www.vecteezy.com/api-docs
**Status:** ✅ TESTED & WORKING (Jan 17, 2026)

**Available Endpoints:**
- `GET /v2/{account_id}/resources` - Search resources
- `GET /v2/{account_id}/resources/{id}` - Get resource details
- `GET /v2/{account_id}/resources/{id}/download` - Download resource

**Required Parameters:**
- `term` - Search term (required!)
- `content_type` - vector, photo, png, psd, svg, video
- `per_page` - Results per page

**Example Request:**
```
GET /v2/53822/resources?term=parts+of+a+flower&content_type=vector&per_page=10
Header: Authorization: Bearer YOUR_SECRET_KEY
```

**Free Tier:** 500 downloads/month, unlimited API calls

**Elementary Topic Test Results (Jan 17, 2026):**
| Topic | Results | Quality |
|-------|---------|--------|
| Parts of a flower | 435 | ⭐ Excellent |
| Butterfly life cycle | 383 | ⭐ Excellent |
| Solar system planets | 6,869 | ⭐ Excellent |
| Water cycle diagram | 290 | ⭐ Excellent |
| Food groups nutrition | 3,119 | ⭐ Good |
| Simple machines | 15,439 | ⭐ Excellent |
| Frog life cycle | 231 | ⭐ Excellent |
| Plant cell diagram | 477 | ⭐ Excellent |

### 6.2 Asset Index Database Schema

```sql
CREATE TABLE assets (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,           -- 'servier', 'freepik', 'vecteezy', 'local'
  source_id TEXT,                 -- ID from source API
  file_path TEXT,                 -- Local file path (if downloaded)
  url TEXT,                       -- Remote URL (if not downloaded)
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,        -- 'svg', 'png', 'jpg', 'eps'
  category TEXT,                  -- Primary category
  subcategory TEXT,               -- Subcategory
  keywords TEXT,                  -- JSON array of keywords
  description TEXT,
  width INTEGER,
  height INTEGER,
  license TEXT,
  attribution TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME
);

CREATE INDEX idx_assets_category ON assets(category);
CREATE INDEX idx_assets_keywords ON assets(keywords);
CREATE INDEX idx_assets_source ON assets(source);
```

### 6.3 Asset Search Strategy

**Priority Order (Updated Jan 17, 2026):**
1. **Freepik API** - Primary source, best educational illustrations
2. **Vecteezy API** - Secondary source, good backup
3. **AI Generation** - Last resort fallback (DALL-E 3)
4. ~~Servier SMART~~ - Deprioritized (manual extraction required)

```typescript
async function findAsset(query: string, category?: string): Promise<Asset[]> {
  // 1. Search Freepik API first (best results)
  let results = await searchFreepik(query, { 
    contentType: 'vector',
    order: 'relevance'
  });
  if (results.length >= 3) return results;
  
  // 2. Search Vecteezy API as backup
  const vecteezyResults = await searchVecteezy(query, {
    contentType: 'vector'
  });
  results = [...results, ...vecteezyResults];
  if (results.length >= 3) return results;
  
  // 3. Fallback to AI image generation (last resort)
  // Note: AI images may be less accurate for educational diagrams
  const aiImage = await generateWithDALLE(query);
  results.push(aiImage);
  
  return results;
}
```

---

## 7. CONTENT GENERATION STRATEGY

### 7.1 LLM Selection

**Primary:** OpenAI GPT-4 (gpt-4-turbo or gpt-4o)
- Best for structured output
- Reliable JSON mode
- Good educational content quality

**Backup:** Anthropic Claude (claude-3-opus or claude-3-sonnet)
- Alternative if OpenAI is down
- Sometimes better for nuanced educational content

### 7.2 Prompt Templates

#### 7.2.1 Vocabulary Cards Prompt
```
You are an educational content creator. Generate vocabulary content for a worksheet.

Topic: {{topic}}
Grade Level: {{gradeLevel}}
Number of Terms: {{termCount}}

Return a JSON object with this structure:
{
  "title": "Vocabulary: [Topic]",
  "instructions": "Study each term and its definition.",
  "terms": [
    {
      "term": "word",
      "definition": "Clear, grade-appropriate definition",
      "imageKeywords": ["keyword1", "keyword2"]
    }
  ]
}

Requirements:
- Definitions should be appropriate for {{gradeLevel}} students
- Each definition should be 1-2 sentences
- Provide 2-3 image search keywords for finding illustrations
```

#### 7.2.2 Labeled Diagram Prompt
```
You are an educational content creator. Generate content for a labeled diagram worksheet.

Topic: {{topic}}
Grade Level: {{gradeLevel}}
Number of Labels: {{labelCount}}

Return a JSON object with this structure:
{
  "title": "Parts of a [Topic]",
  "instructions": "Label each part of the [topic] using the word bank.",
  "diagramDescription": "Description of what the main diagram should show",
  "diagramKeywords": ["keyword1", "keyword2"],
  "labels": [
    {
      "part": "Part name",
      "description": "What this part does",
      "position": "where on the diagram (top-left, center, etc.)"
    }
  ],
  "wordBank": ["word1", "word2", "..."]
}
```

#### 7.2.3 Multiple Choice Quiz Prompt
```
You are an educational content creator. Generate a multiple choice quiz.

Topic: {{topic}}
Grade Level: {{gradeLevel}}
Number of Questions: {{questionCount}}

Return a JSON object with this structure:
{
  "title": "Quiz: [Topic]",
  "instructions": "Choose the best answer for each question.",
  "questions": [
    {
      "question": "Question text?",
      "options": ["A) option", "B) option", "C) option", "D) option"],
      "correctAnswer": "B",
      "explanation": "Why B is correct"
    }
  ]
}

Requirements:
- Questions should be factually accurate
- Distractors should be plausible but clearly wrong
- Vary question difficulty slightly
```

### 7.3 Content Validation

All generated content should be validated:

```typescript
interface ContentValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

function validateContent(content: any, schema: JSONSchema): ContentValidation {
  // 1. Validate JSON structure matches expected schema
  // 2. Check for empty or missing required fields
  // 3. Validate grade-appropriateness (word complexity, sentence length)
  // 4. Check for potential factual issues (known incorrect statements)
  // 5. Verify image keywords are searchable
}
```

---

## 8. PDF GENERATION STRATEGY

### 8.1 Primary Approach: React-PDF

**Library:** @react-pdf/renderer
**Documentation:** https://react-pdf.org/

**Pros:**
- Native PDF generation (not HTML conversion)
- Vector text (crisp at any zoom)
- Embedded fonts
- React component model
- Works in Node.js and browser

**Cons:**
- Learning curve for complex layouts
- Some CSS properties not supported
- Image handling can be tricky

### 8.2 Fallback Approach: Puppeteer

**Library:** puppeteer
**Use When:** Complex layouts that React-PDF can't handle

**Pros:**
- Full CSS support
- Easier for complex designs
- Can screenshot existing HTML

**Cons:**
- Requires headless Chrome
- Higher memory usage
- Slower generation
- Text may be rasterized

### 8.3 PDF Specifications

| Property | Value |
|----------|-------|
| Page Size | Letter (8.5" x 11") default, A4 optional |
| Orientation | Portrait (default), Landscape (optional) |
| Margins | 0.5" all sides |
| Resolution | 300 DPI for images |
| Fonts | Embedded (not system fonts) |
| Color Space | RGB (for screen/print compatibility) |

### 8.4 Font Strategy

**Primary Font:** Inter or Open Sans (clean, readable)
**Heading Font:** Poppins or Nunito (friendly, educational feel)
**Handwriting Font:** Caveat or Patrick Hand (for fill-in lines)

All fonts must be:
- Open source / freely licensed
- Embedded in PDF
- Loaded in React-PDF document

---

## 9. USER INTERFACE REQUIREMENTS

### 9.1 Core Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing, quick generator access |
| Generator | `/generate` | Main worksheet creation interface |
| Templates | `/templates` | Browse template types |
| Preview | `/preview/[id]` | View generated worksheet |
| My Worksheets | `/worksheets` | History of generated worksheets |

### 9.2 Generator Form Fields

```typescript
interface WorksheetFormData {
  // Basic Info
  title?: string;                    // Optional, can be auto-generated
  topic: string;                     // Required
  gradeLevel: GradeLevel;            // K, 1-12
  subject: Subject;                  // Science, Math, History, etc.
  
  // Template Selection
  worksheetType: WorksheetType;      // From Section 5
  
  // Content Options
  questionCount?: number;            // For quiz types
  termCount?: number;                // For vocabulary
  difficulty?: 'easy' | 'medium' | 'hard';
  
  // Styling Options
  pageSize: 'letter' | 'a4';
  includeAnswerKey: boolean;
  includeNameDateLine: boolean;
  
  // Advanced (Phase 2)
  curriculumStandard?: string;       // Common Core, NGSS, etc.
  customInstructions?: string;
}
```

### 9.3 UI Components Needed

- **TopicInput** - Autocomplete with suggestions
- **GradeLevelSelector** - K-12 dropdown/buttons
- **WorksheetTypePicker** - Visual cards for each type
- **OptionsPanel** - Collapsible advanced options
- **PreviewPanel** - Live preview of worksheet
- **DownloadButton** - PDF/PNG download
- **RegenerateButton** - Try again with same params

---

## 10. FILE STRUCTURE & CONVENTIONS

### 10.1 Project Structure

```
c:\Users\scoso\WEBSITES\new worksheet generator\
├── .env                          # Environment variables (API keys)
├── .env.example                  # Example env file (no secrets)
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── docs/                         # Documentation
│   ├── CONTEXT.md               # This file - project context
│   ├── PLAN.md                  # Step-by-step implementation plan
│   ├── RESEARCH_FINDINGS.md     # Research and competitor analysis
│   └── BRAINSTORM.md            # Initial brainstorming
│
├── assets/                       # Local assets
│   ├── servier-smart/           # Downloaded Servier SMART images
│   │   ├── anatomy/
│   │   ├── cellular-biology/
│   │   └── ...
│   ├── templates/               # PDF template backgrounds/frames
│   └── fonts/                   # Embedded fonts
│
├── prisma/                       # Database
│   ├── schema.prisma
│   └── migrations/
│
├── public/                       # Static files
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home page
│   │   ├── generate/
│   │   │   └── page.tsx         # Generator page
│   │   ├── preview/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Preview page
│   │   ├── templates/
│   │   │   └── page.tsx         # Templates page
│   │   └── api/                 # API routes
│   │       ├── generate/
│   │       │   └── route.ts     # POST /api/generate
│   │       ├── assets/
│   │       │   └── search/
│   │       │       └── route.ts # GET /api/assets/search
│   │       └── pdf/
│   │           └── route.ts     # POST /api/pdf
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Generic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Card.tsx
│   │   ├── forms/               # Form components
│   │   │   ├── WorksheetForm.tsx
│   │   │   ├── TopicInput.tsx
│   │   │   └── GradeLevelSelector.tsx
│   │   ├── preview/             # Preview components
│   │   │   ├── WorksheetPreview.tsx
│   │   │   └── PDFViewer.tsx
│   │   └── templates/           # Template selection
│   │       └── TemplateCard.tsx
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── api/                 # API client functions
│   │   │   ├── openai.ts
│   │   │   ├── freepik.ts
│   │   │   ├── vecteezy.ts
│   │   │   └── stability.ts
│   │   ├── content/             # Content generation
│   │   │   ├── generator.ts
│   │   │   └── prompts.ts
│   │   ├── assets/              # Asset resolution
│   │   │   ├── resolver.ts
│   │   │   ├── local-search.ts
│   │   │   └── indexer.ts
│   │   ├── pdf/                 # PDF generation
│   │   │   ├── renderer.ts
│   │   │   └── fonts.ts
│   │   └── utils/               # General utilities
│   │       ├── validation.ts
│   │       └── formatting.ts
│   │
│   ├── templates/               # Worksheet templates (React-PDF)
│   │   ├── base/
│   │   │   ├── PageWrapper.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── VocabularyCards.tsx
│   │   ├── LabeledDiagram.tsx
│   │   ├── MultipleChoice.tsx
│   │   ├── FillInBlank.tsx
│   │   ├── ComparisonGrid.tsx
│   │   └── ...
│   │
│   ├── types/                   # TypeScript types
│   │   ├── worksheet.ts
│   │   ├── content.ts
│   │   ├── assets.ts
│   │   └── api.ts
│   │
│   └── store/                   # State management
│       └── worksheetStore.ts
│
└── scripts/                     # Utility scripts
    ├── download-servier.ts      # Download Servier SMART assets
    ├── index-assets.ts          # Index local assets
    └── test-apis.ts             # Test API connections
```

### 10.2 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (components) | PascalCase | `WorksheetForm.tsx` |
| Files (utilities) | kebab-case | `asset-resolver.ts` |
| Files (types) | kebab-case | `worksheet.ts` |
| Components | PascalCase | `WorksheetForm` |
| Functions | camelCase | `generateContent` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_QUESTIONS` |
| Types/Interfaces | PascalCase | `WorksheetData` |
| CSS Classes | Tailwind utilities | `className="flex items-center"` |

### 10.3 Import Order Convention

```typescript
// 1. React/Next.js
import React from 'react';
import { NextRequest } from 'next/server';

// 2. Third-party libraries
import { z } from 'zod';
import { Document, Page } from '@react-pdf/renderer';

// 3. Internal - lib/utilities
import { generateContent } from '@/lib/content/generator';
import { searchAssets } from '@/lib/assets/resolver';

// 4. Internal - components
import { Button } from '@/components/ui/Button';
import { WorksheetForm } from '@/components/forms/WorksheetForm';

// 5. Internal - types
import type { WorksheetData } from '@/types/worksheet';

// 6. Styles (if any)
import styles from './styles.module.css';
```

---

## 11. DATABASE SCHEMA

### 11.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"  // Change to "postgresql" for production
  url      = env("DATABASE_URL")
}

model Worksheet {
  id            String   @id @default(cuid())
  title         String
  topic         String
  gradeLevel    String
  subject       String
  worksheetType String
  
  // Generated content (JSON)
  content       String   // JSON blob of generated content
  
  // Generation metadata
  contentModel  String   // e.g., "gpt-4-turbo"
  
  // PDF info
  pdfPath       String?
  pdfSize       Int?
  
  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  assets        WorksheetAsset[]
}

model WorksheetAsset {
  id          String    @id @default(cuid())
  worksheetId String
  worksheet   Worksheet @relation(fields: [worksheetId], references: [id])
  
  assetId     String
  asset       Asset     @relation(fields: [assetId], references: [id])
  
  usage       String    // How the asset is used: "main-diagram", "vocabulary-image", etc.
  position    Int?      // Order/position in worksheet
}

model Asset {
  id          String   @id @default(cuid())
  source      String   // 'servier', 'freepik', 'vecteezy', 'generated'
  sourceId    String?  // ID from source API
  
  filePath    String?  // Local file path
  url         String?  // Remote URL
  
  filename    String
  fileType    String   // 'svg', 'png', 'jpg'
  
  category    String?
  subcategory String?
  keywords    String   // JSON array
  description String?
  
  width       Int?
  height      Int?
  
  license     String?
  attribution String?
  
  createdAt   DateTime @default(now())
  lastUsedAt  DateTime?
  
  worksheets  WorksheetAsset[]
  
  @@index([source])
  @@index([category])
}
```

---

## 12. DEPLOYMENT STRATEGY

### 12.1 Development Environment

```bash
# Local development
npm run dev  # Starts Next.js dev server on localhost:3000

# Database
npm run db:push  # Push schema changes to SQLite
npm run db:studio  # Open Prisma Studio

# Asset indexing
npm run index-assets  # Index local Servier SMART assets
```

### 12.2 Production Deployment

**Target Platform:** Vercel (recommended for Next.js)

**Alternative:** Railway, Render, or self-hosted

**Environment Variables Required:**
- All API keys from `.env`
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_BASE_URL` - Production URL

### 12.3 Asset Storage (Production)

**Options:**
1. **Vercel Blob** - Simple, integrated with Vercel
2. **Cloudflare R2** - S3-compatible, cheaper
3. **AWS S3** - Standard choice, more setup

**Generated PDFs:** Store temporarily (24-48 hours), then clean up

---

## 13. KNOWN CONSTRAINTS & LIMITATIONS

### 13.1 Technical Constraints

| Constraint | Impact | Mitigation |
|------------|--------|------------|
| React-PDF limited CSS | Some layouts hard to achieve | Use Puppeteer fallback |
| Freepik free credits | Limited generations | Cache assets, prioritize local |
| Vecteezy 500/month limit | Limited downloads | Cache downloaded assets |
| AI image gen quality | May not match illustration style | Use as last resort only |
| Serverless function timeout | Long generation may fail | Optimize, use streaming |

### 13.2 Content Constraints

| Constraint | Impact | Mitigation |
|------------|--------|------------|
| LLM factual accuracy | May generate incorrect info | Validate science content |
| Grade-level appropriateness | May be too easy/hard | Include grade in prompts |
| Image relevance | May not find exact match | Multiple search strategies |
| Copyright concerns | Must respect licenses | Only use licensed content |

### 13.3 Scope Constraints (v1)

- No user accounts (generate anonymously)
- No saved history (worksheets stored temporarily)
- No curriculum alignment validation
- No multi-language support
- No collaborative editing

---

## 14. RESEARCH FINDINGS SUMMARY

*See full details in `RESEARCH_FINDINGS.md`*

### 14.1 Key Insights

1. **Chalkie.ai uses OpenAI/Google models** for content, NOT for images
2. **Template-based design** is the industry standard
3. **Curated illustration libraries** beat AI image generation for accuracy
4. **Freepik and Vecteezy** have the best educational illustration APIs
5. **Servier SMART** is the best free source for science diagrams
6. **React-PDF** is the best option for print-quality PDFs

### 14.2 Why Previous Attempts Failed

1. Relying on AI image generation for diagrams
2. Using stock photos instead of illustrations
3. HTML-to-PDF producing web-page-looking output
4. Not using template-based layouts

---

## 15. COMPETITOR ANALYSIS

| Competitor | Strengths | Weaknesses | Our Advantage |
|------------|-----------|------------|---------------|
| **Chalkie.ai** | Great UX, curriculum alignment | Closed system, no API | More customization |
| **Canva Worksheets** | Beautiful templates | Manual creation, no AI content | AI-generated content |
| **MagicSchool.ai** | Many tools | Not worksheet-focused | Specialized for worksheets |
| **TPT** | Huge library | Not generated, costs money | Free, on-demand generation |

---

## 16. GLOSSARY

| Term | Definition |
|------|------------|
| **Asset** | An image, illustration, or icon used in a worksheet |
| **Cloze** | A fill-in-the-blank exercise where words are removed from text |
| **Content** | The text elements of a worksheet (title, questions, answers) |
| **LLM** | Large Language Model (GPT-4, Claude) |
| **React-PDF** | Library for rendering PDFs using React components |
| **Template** | A reusable layout structure for a specific worksheet type |
| **Word Bank** | A list of words provided for students to use in answers |

---

## 17. CHANGE LOG

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-17 | 1.3.0 | Phase 0 & 1 complete, Phase 3 partially complete, pushed to GitHub | AI Assistant |
| 2026-01-17 | 1.2.0 | API testing complete, Servier deprioritized, elementary focus confirmed | AI Assistant |
| 2026-01-17 | 1.1.0 | Added Servier SMART download info, linked to ASSET_INDEX.md | AI Assistant |
| 2026-01-17 | 1.0.0 | Initial context document created | AI Assistant |

---

## 📎 RELATED DOCUMENTS

- [PLAN.md](./PLAN.md) - Step-by-step implementation plan
- [ASSET_INDEX.md](./ASSET_INDEX.md) - Servier Medical Art asset catalog (49 kits)
- [RESEARCH_FINDINGS.md](./RESEARCH_FINDINGS.md) - Full research document
- [BRAINSTORM.md](./BRAINSTORM.md) - Initial brainstorming notes

---

*This is a living document. Update it as the project evolves.*
