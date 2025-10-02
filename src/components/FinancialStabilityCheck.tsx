import React, { useState } from 'react';
import { CheckCircle, HelpCircle } from 'lucide-react';
import { financialQuestions } from '../data/questions';

interface FinancialStabilityCheckProps {
  onComplete: (answers: number[], trustScore: number) => void;
}

const FinancialStabilityCheck: React.FC<FinancialStabilityCheckProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (score: number) => {
    setSelectedAnswer(score);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      
      if (currentQuestion < financialQuestions.length - 1) {
        setAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate trust score
        const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
        const maxPossibleScore = financialQuestions.length * 10;
        const trustScore = Math.round((totalScore / maxPossibleScore) * 100);
        
        onComplete(newAnswers, trustScore);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setAnswers(answers.slice(0, -1));
    }
  };

  const question = financialQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / financialQuestions.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-8 h-8 text-purple-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            आर्थिक स्थिरता जाँच / Financial Stability Check
          </h2>
          <p className="text-gray-600">
            कुछ सवालों के जवाब दें / Answer a few questions
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>प्रश्न {currentQuestion + 1} / Question {currentQuestion + 1}</span>
          <span>{financialQuestions.length} में से / of {financialQuestions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            {question.hindi}
          </h3>
          <p className="text-purple-700">
            {question.english}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option.score)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                selectedAnswer === option.score
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswer === option.score
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option.score && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{option.hindi}</p>
                  <p className="text-sm text-gray-600">{option.english}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          पिछला / Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === financialQuestions.length - 1 ? 'पूरा करें / Complete' : 'अगला / Next'}
        </button>
      </div>
    </div>
  );
};

export default FinancialStabilityCheck;