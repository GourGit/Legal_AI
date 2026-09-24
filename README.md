# LexGuide

LexGuide is an AI-powered legal document assistant that helps you understand the fine print before you sign. It transforms complex legal jargon into clear, practical explanations, allowing you to approach legal documents with confidence and clarity.

> **Disclaimer:** LexGuide is designed to help you understand legal information and prepare for discussions with legal professionals. It does not replace professional legal advice.

## Features

- **Understand:** Turn difficult legal language into clear, practical explanations.
- **Compare:** See exactly what changed between two versions of an agreement.
- **Review:** Find important clauses, obligations, dates, and potential inconsistencies.
- **Prepare:** Create a useful checklist and questions to discuss with a legal professional.
- **Ask:** Ask questions about the documents you provide and receive answers grounded strictly in their contents.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **UI:** React, Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/)
- **Database & ORM:** [Prisma](https://prisma.io)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/docs) with Google (Gemini)
- **Document Parsing:** pdf-parse, mammoth (for document extraction)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Set up your environment variables by copying `.env.example` to `.env`:

```bash
cp .env.example .env
```
Make sure to fill in the necessary API keys (like your Google AI API key and database connection string).

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and shared libraries.
- `src/services`: Core application services (like AI processing and document parsing).
- `prisma`: Database schema and Prisma configuration.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the MIT License.
