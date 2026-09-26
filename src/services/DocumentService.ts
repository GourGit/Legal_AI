import { db } from '../prisma/db';
import { aiProvider } from '../lib/ai/provider';
import { DocumentAnalysisSchema, documentAnalysisSystemPrompt } from '../lib/ai/prompts';
// import pdfParse from 'pdf-parse'; // Will be used when implemented
// import mammoth from 'mammoth'; // Will be used when implemented
export class DocumentService {
  /**
   * Process and analyze an uploaded document
   */
  async processDocument(documentId: string, fileBuffer: Buffer, fileType: string) {
    try {
      // 1. Update status to processing
      await db.orm.public.Document.where(d => d.id.eq(documentId)).update({ status: 'PROCESSING' });

      // 2. Extract Text (simplified for now, replace with actual parsing)
      let extractedText = '';
      if (fileType === 'application/pdf') {
        // extractedText = (await pdfParse(fileBuffer)).text;
        extractedText = fileBuffer.toString('utf-8'); // Mock extraction
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // extractedText = (await mammoth.extractRawText({ buffer: fileBuffer })).value;
        extractedText = fileBuffer.toString('utf-8'); // Mock extraction
      } else {
        extractedText = fileBuffer.toString('utf-8');
      }

      // 3. Analyze with AI
      const prompt = `Please analyze the following legal document and extract key information, clauses, and action items according to the schema.\n\nDocument Text:\n${extractedText.substring(0, 50000)}`; // Limit context
      
      const { object: analysisResult } = await aiProvider.generateStructured(
        prompt,
        DocumentAnalysisSchema,
        documentAnalysisSystemPrompt,
        { temperature: 0.1 }
      );

      // 4. Save Analysis to DB
      const dbAnalysis = await db.orm.public.AnalysisResult.create({
        documentId,
        summary: analysisResult.summary,
        keyTopics: JSON.stringify(analysisResult.keyTopics),
        importantDates: JSON.stringify(analysisResult.importantDates),
      });

      // 5. Save Clauses
      for (const clause of analysisResult.clauses) {
        await db.orm.public.DetectedClause.create({
          analysisId: dbAnalysis.id,
          category: clause.category,
          originalText: clause.originalText,
          explanation: clause.explanation,
          importance: clause.importance,
          whyItMatters: clause.whyItMatters,
          questions: JSON.stringify(clause.questionsToCheck),
        });
      }

      // 6. Save Checklist
      if (analysisResult.checklist.length > 0) {
        const checklist = await db.orm.public.Checklist.create({
          userId: (await db.orm.public.Document.where(d => d.id.eq(documentId)).first())?.userId || '',
          documentId,
          title: 'Before You Sign'
        });

        for (const item of analysisResult.checklist) {
          await db.orm.public.ChecklistItem.create({
            checklistId: checklist.id,
            content: item
          });
        }
      }

      // 7. Update document status
      await db.orm.public.Document.where(d => d.id.eq(documentId)).update({ status: 'COMPLETED' });

      return { success: true, analysis: dbAnalysis };
    } catch (error) {
      console.error('Error processing document:', error);
      await db.orm.public.Document.where(d => d.id.eq(documentId)).update({ status: 'FAILED' });
      throw error;
    }
  }
}

export const documentService = new DocumentService();
