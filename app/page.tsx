'use client'

import { useState } from 'react'
import { MinimalistQuizApp } from '../components/minimalist-quiz-app'
import { QuizTopicInput } from '../components/QuizTopicInput'
import { getQuizQuestions } from './actions'
import Link from 'next/link'
import { Github } from 'lucide-react'

interface Question {
  question: string;
  options: string[];
  correctAnswers: string[];
}

export default function Home() {
  const [quizTopic, setQuizTopic] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quizTime, setQuizTime] = useState(60)

  const handleTopicSubmit = async (topic: string, numQuestions: number, instructions: string, time: number) => {
    setLoading(true)
    setError(null)
    setQuizTopic(topic)
    setQuizTime(time)
    try {
      const quiz = await getQuizQuestions(topic, numQuestions, instructions)
      setQuestions(quiz.questions)
    } catch (error) {
      console.error('Error generating quiz questions:', error)
      setError('Failed to generate questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetQuiz = () => {
    setQuizTopic(null)
    setQuestions(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4 relative">
      <Link 
        href="https://github.com/satvik314/quiz-cursor"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Github size={24} />
      </Link>
      <h1 className="text-4xl font-bold text-blue-600 mb-8">AI Quiz Generator</h1>
      <div className="flex-grow flex items-center justify-center w-full">
        {!quizTopic ? (
          <QuizTopicInput onSubmit={handleTopicSubmit} />
        ) : loading ? (
          <div className="text-2xl font-bold text-blue-600">Generating your quiz...</div>
        ) : error ? (
          <div className="text-2xl font-bold text-red-500">{error}</div>
        ) : questions ? (
          <MinimalistQuizApp questions={questions} onResetQuiz={handleResetQuiz} quizTime={quizTime} />
        ) : (
          <div className="text-2xl font-bold text-red-500">An unexpected error occurred. Please try again.</div>
        )}
      </div>
      <footer className="w-full text-center py-4 text-gray-600">
        Built by{' '}
        <Link href="https://www.buildfastwithai.com/genai-course" className="text-blue-600 hover:underline">
          Build Fast with AI
        </Link>
      </footer>
    </main>
  )
}
