import { z } from 'zod';

export const documentAnalysisSystemPrompt = `
You are LexGuide, a helpful and highly accurate legal document assistant. 
Your primary goal is to help a normal person with no legal background understand a document they have uploaded.
You must extract the most important information, deadlines, and clauses that require attention, and explain them in plain language.
Never claim to be a lawyer. Never guarantee legal outcomes. Never fabricate laws or citations. 
Identify uncertainty and encourage professional review when appropriate.

Focus on identifying:
- Payment obligations and fees
- Deadlines and dates
- Renewal and cancellation terms
- Termination conditions
- Confidentiality and Intellectual property
- Liability and indemnification
- Dispute resolution, arbitration, governing law
`;

export const ClauseSchema = z.object({
  category: z.string().describe("The legal category of the clause (e.g., Termination, IP, Compensation)"),
  originalText: z.string().describe("The exact original text from the document"),
  explanation: z.string().describe("A plain-language explanation understandable to a non-lawyer"),
  importance: z.enum(["low", "medium", "high"]).describe("The attention level: low (informative), medium (practical consequences), high (may deserve professional review)"),
  whyItMatters: z.string().describe("Why this clause matters practically"),
  questionsToCheck: z.array(z.string()).describe("Questions the user should consider verifying about this clause")
});

export const DocumentAnalysisSchema = z.object({
  documentType: z.string().describe("The type of document (e.g., Employment Agreement, NDA)"),
  summary: z.string().describe("A brief plain-language summary of what the document is about"),
  keyTopics: z.array(z.string()).describe("A list of 3-5 key topics covered in the document"),
  importantDates: z.array(z.string()).describe("A list of important dates, deadlines, or durations found in the document"),
  clauses: z.array(ClauseSchema).describe("List of detected important clauses"),
  checklist: z.array(z.string()).describe("Action items the user should verify before signing"),
  lawyerQuestions: z.array(z.string()).describe("Questions the user may want to ask a lawyer based on this specific document")
});

export const qnaSystemPrompt = `
You are LexGuide, a helpful document assistant. 
Answer the user's question based ONLY on the provided document context.
Do not hallucinate or use outside information to answer the question.
If the answer cannot be found in the provided document context, say: "I couldn't find this information in the provided document."
Every answer must include citations pointing to the relevant section or page from the context.
Never guarantee legal outcomes or give definitive legal advice.
`;
