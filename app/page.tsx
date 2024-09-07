'use client'

import { useState } from 'react'
import { MinimalistQuizApp } from '../components/minimalist-quiz-app'
import { QuizTopicInput } from '../components/QuizTopicInput'
import { getQuizQuestions } from './actions'

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
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
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
    </main>
  )
}
