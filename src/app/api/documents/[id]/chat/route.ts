import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import { aiProvider } from '@/lib/ai/provider';
import { qnaSystemPrompt } from '@/lib/ai/prompts';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // 1. Fetch document text/chunks (simplified for demo, typically uses vector search)
    // In a real RAG setup, we'd search DocumentEmbedding using pgvector
    const document = await db.orm.public.Document
      .where((d) => d.id.eq(id))
      .include('versions')
      .first();

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Prepare context from chunks
    const latestVersion = document.versions.sort((a, b) => b.versionNum - a.versionNum)[0];
    let chunks: any[] = [];
    if (latestVersion) {
      chunks = await db.orm.public.DocumentChunk.where((c) => c.versionId.eq(latestVersion.id)).all();
    }
    const contextText = chunks.map(c => `[Page ${c.pageNumber}]: ${c.content}`).join('\n\n');

    // If no chunks (mock mode), just provide some dummy context
    const effectiveContext = contextText || `
      [Page 7 - Termination]: The Employee shall provide thirty days' written notice prior to voluntary termination.
      [Page 6 - Intellectual Property]: All intellectual property conceived by the Employee belongs to the Employer.
    `;

    // 2. Generate Answer
    const prompt = `Context:\n${effectiveContext}\n\nQuestion: ${question}\n\nPlease answer the question strictly based on the context provided above. Include citations.`;

    const { text } = await aiProvider.generateText(
      prompt,
      qnaSystemPrompt,
      { temperature: 0.1, maxTokens: 500 }
    );

    // 3. Save Question to DB
    const dbQuestion = await db.orm.public.Question.create({
      userId: document.userId, // Link to document owner
      documentId: id,
      content: question,
      answer: text,
    });

    return NextResponse.json({ 
      id: dbQuestion.id,
      answer: text 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
