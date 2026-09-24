import { PrismaClient } from '@prisma/client';
import { aiProvider } from '../lib/ai/provider';
import { DocumentAnalysisSchema, documentAnalysisSystemPrompt } from '../lib/ai/prompts';
// import pdfParse from 'pdf-parse'; // Will be used when implemented
// import mammoth from 'mammoth'; // Will be used when implemented

const prisma = new PrismaClient();

export class DocumentService {
  /**
   * Process and analyze an uploaded document
   */
  async processDocument(documentId: string, fileBuffer: Buffer, fileType: string) {
    try {
      // 1. Update status to processing
      await prisma.document.update({
        where: { id: documentId },
        data: { status: 'PROCESSING' }
      });

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
      const dbAnalysis = await prisma.analysisResult.create({
        data: {
          documentId,
          summary: analysisResult.summary,
          keyTopics: JSON.stringify(analysisResult.keyTopics),
          importantDates: JSON.stringify(analysisResult.importantDates),
        }
      });

      // 5. Save Clauses
      for (const clause of analysisResult.clauses) {
        await prisma.detectedClause.create({
          data: {
            analysisId: dbAnalysis.id,
            category: clause.category,
            originalText: clause.originalText,
            explanation: clause.explanation,
            importance: clause.importance,
            whyItMatters: clause.whyItMatters,
            questions: JSON.stringify(clause.questionsToCheck),
          }
        });
      }

      // 6. Save Checklist
      if (analysisResult.checklist.length > 0) {
        const checklist = await prisma.checklist.create({
          data: {
            userId: (await prisma.document.findUnique({ where: { id: documentId } }))?.userId || '',
            documentId,
            title: 'Before You Sign'
          }
        });

        for (const item of analysisResult.checklist) {
          await prisma.checklistItem.create({
            data: {
              checklistId: checklist.id,
              content: item
            }
          });
        }
      }

      // 7. Update document status
      await prisma.document.update({
        where: { id: documentId },
        data: { status: 'COMPLETED' }
      });

      return { success: true, analysis: dbAnalysis };
    } catch (error) {
      console.error('Error processing document:', error);
      await prisma.document.update({
        where: { id: documentId },
        data: { status: 'FAILED' }
      });
      throw error;
    }
  }
}

export const documentService = new DocumentService();
