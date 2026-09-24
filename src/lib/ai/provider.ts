import { generateText, streamText, embed, embedMany, generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export interface AIProviderOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class AIProvider {
  private defaultModel = 'gemini-1.5-pro-latest';
  private defaultEmbeddingModel = 'text-embedding-004';

  constructor() {
    // The google provider automatically uses GOOGLE_GENERATIVE_AI_API_KEY from environment variables
  }

  /**
   * Generate text based on a prompt
   */
  async generateText(prompt: string, systemPrompt?: string, options?: AIProviderOptions) {
    const { text, usage } = await generateText({
      model: google(options?.model || this.defaultModel),
      system: systemPrompt,
      prompt,
      temperature: options?.temperature ?? 0.1, // Low temperature for factual legal analysis
      maxTokens: options?.maxTokens,
    });

    return { text, usage };
  }

  /**
   * Generate structured object based on a Zod schema
   */
  async generateStructured<T>(prompt: string, schema: z.Schema<T>, systemPrompt?: string, options?: AIProviderOptions) {
    const { object, usage } = await generateObject({
      model: google(options?.model || this.defaultModel),
      system: systemPrompt,
      prompt,
      schema,
      temperature: options?.temperature ?? 0.1,
    });

    return { object, usage };
  }

  /**
   * Stream text for real-time responses
   */
  async streamText(prompt: string, systemPrompt?: string, options?: AIProviderOptions) {
    const result = await streamText({
      model: google(options?.model || this.defaultModel),
      system: systemPrompt,
      prompt,
      temperature: options?.temperature ?? 0.1,
      maxTokens: options?.maxTokens,
    });

    return result;
  }

  /**
   * Generate a single embedding for a query/chunk
   */
  async generateEmbedding(text: string) {
    const { embedding } = await embed({
      model: google.textEmbeddingModel(this.defaultEmbeddingModel),
      value: text,
    });

    return embedding;
  }

  /**
   * Generate multiple embeddings for document chunks
   */
  async generateEmbeddings(texts: string[]) {
    const { embeddings } = await embedMany({
      model: google.textEmbeddingModel(this.defaultEmbeddingModel),
      values: texts,
    });

    return embeddings;
  }
}

export const aiProvider = new AIProvider();
