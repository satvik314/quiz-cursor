'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswers: z.array(z.string()).min(1),
});

const QuizSchema = z.object({
  questions: z.array(QuestionSchema),
});

type Question = z.infer<typeof QuestionSchema>;

export async function getQuizQuestions(topic: string, numQuestions: number, instructions: string): Promise<{ questions: Question[] }> {
  'use server';

  const prompt = `Generate a quiz about ${topic} with ${numQuestions} questions. ${instructions}`;

  try {
    const { object: quiz } = await generateObject({
      model: openai('gpt-4o-mini'),
      system: 'You are a quiz generator that creates multiple-choice questions.',
      prompt: prompt,
      schema: QuizSchema,
    });

    return quiz;
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw new Error('Failed to generate quiz questions. Please try again.');
  }
}