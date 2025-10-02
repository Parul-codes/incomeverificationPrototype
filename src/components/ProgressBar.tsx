import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>चरण {currentStep} / Step {currentStep}</span>
        <span>{totalSteps} में से / of {totalSteps}</span>
      </div>
    </div>
  );
};

export default ProgressBar;