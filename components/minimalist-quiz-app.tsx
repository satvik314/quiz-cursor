'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Home } from 'lucide-react'
import ReactConfetti from 'react-confetti'
import toast, { Toaster } from 'react-hot-toast'
import { VintageTimer } from './VintageTimer'

interface Question {
  question: string;
  options: string[];
  correctAnswers: string[];
}

interface MinimalistQuizAppProps {
  questions: Question[];
  onResetQuiz: () => void;
}

export function MinimalistQuizApp({ questions, onResetQuiz }: MinimalistQuizAppProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(''))
  const [showResults, setShowResults] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    if (showResults) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showResults])

  useEffect(() => {
    if (showResults) {
      console.log('Questions:', questions);
      console.log('User Answers:', userAnswers);
    }
  }, [showResults, questions, userAnswers]);

  useEffect(() => {
    console.log('Questions structure:', JSON.stringify(questions, null, 2));
  }, [questions]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers]
    const currentAnswer = newAnswers[currentQuestion]
    
    if (currentAnswer === answer) {
      // Deselect the option if it's already selected
      newAnswers[currentQuestion] = ''
      toast('❌ Option deselected', {
        icon: '🔄',
        position: 'top-center',
        duration: 1000,
      })
    } else {
      // Select the new option
      newAnswers[currentQuestion] = answer
      toast('✅ Option selected', {
        icon: '🎉',
        position: 'top-center',
        duration: 1000,
      })
    }
    
    setUserAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    if (!questions || questions.length === 0) return 0;
    
    return userAnswers.reduce((score, answer, index) => {
      if (index >= questions.length) return score;
      
      const correctAnswers = questions[index].correctAnswers;
      if (!correctAnswers || !Array.isArray(correctAnswers) || correctAnswers.length === 0) return score;
      
      const isCorrect = correctAnswers.includes(answer);
      return score + (isCorrect ? 1 : 0);
    }, 0);
  }

  const handleTimeUp = () => {
    setTimeUp(true)
    setShowResults(true)
    toast('⏰ Time&apos;s up!', {
      icon: '⏰',
      position: 'top-center',
      duration: 2000,
    })
  }

  const resetQuiz = () => {
    onResetQuiz()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster />
      {showConfetti && <ReactConfetti />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl" // Increased max-width for better layout
      >
        {!showResults && (
          <VintageTimer initialTime={300} onTimeUp={handleTimeUp} />
        )}
        
        {/* Progress Bar */}
        <div className="bg-white rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="bg-blue-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {showResults ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">Quiz Results</h2>
              {timeUp && (
                <p className="text-xl text-red-500 text-center mb-4">Time&apos;s up!</p>
              )}
              <div className="flex justify-center items-center mb-8">
                <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center">
                  <p className="text-4xl font-bold text-blue-600">
                    {calculateScore()} / {questions ? questions.length : 0}
                  </p>
                </div>
              </div>
              <div className="mb-8 space-y-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Question Review:</h3>
                {questions && questions.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                    <p className="font-medium text-lg mb-3 text-gray-800">{index + 1}. {question.question}</p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex} 
                          className={`p-3 rounded-md ${
                            userAnswers[index] === option
                              ? question.correctAnswers.includes(option)
                                ? 'bg-green-100 border-2 border-green-500'
                                : 'bg-red-100 border-2 border-red-500'
                              : question.correctAnswers.includes(option)
                                ? 'bg-green-50 border-2 border-green-200'
                                : 'bg-gray-200'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <p className={`text-sm ${
                      userAnswers[index] && question.correctAnswers.includes(userAnswers[index])
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      Your answer: {userAnswers[index] || 'No answer'}
                    </p>
                    <p className="text-sm text-green-600">
                      Correct answer: {question.correctAnswers.join(' or ')}
                    </p>
                  </div>
                ))}
              </div>
              <motion.button
                onClick={resetQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-md"
              >
                Start New Quiz
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-6">{questions[currentQuestion].question}</h2>
              <p className="text-sm text-gray-600 mb-4">Select one option:</p>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    className={`w-full py-3 px-6 rounded-full font-semibold text-left transition-colors ${
                      userAnswers[currentQuestion] === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`p-3 rounded-full ${
              currentQuestion === 0 ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500 shadow-md'
            }`}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-3 rounded-full bg-blue-500 text-white shadow-md"
          >
            {currentQuestion === questions.length - 1 ? (
              <Home size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}