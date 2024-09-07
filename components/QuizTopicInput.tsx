'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface QuizTopicInputProps {
  onSubmit: (topic: string, numQuestions: number, instructions: string) => void
}

export function QuizTopicInput({ onSubmit }: QuizTopicInputProps) {
  const [topic, setTopic] = useState('')
  const [numQuestions, setNumQuestions] = useState(5)
  const [instructions, setInstructions] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      onSubmit(topic.trim(), numQuestions, instructions.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create Your Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Quiz Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Ancient History, Quantum Physics"
            className="w-full py-3 px-4 bg-gray-100 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
          <input
            id="numQuestions"
            type="number"
            min="1"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="w-full py-3 px-4 bg-gray-100 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Custom Instructions (optional)</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g., Focus on specific era, Include multiple choice questions"
            className="w-full py-3 px-4 bg-gray-100 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24 resize-none"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md"
        >
          Generate Quiz
        </motion.button>
      </form>
    </motion.div>
  )
}

