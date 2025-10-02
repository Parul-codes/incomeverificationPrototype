import React, { useState } from 'react';
import { UserData } from './types';
import ProgressBar from './components/ProgressBar';
import AadhaarVerification from './components/AadhaarVerification';
import LoanAmountInput from './components/LoanAmountInput';
import BankAccountStatus from './components/BankAccountStatus';
import IncomeVerification from './components/IncomeVerification';
import FinancialStabilityCheck from './components/FinancialStabilityCheck';
import LoanEligibility from './components/LoanEligibility';
import Dashboard from './components/Dashboard';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    aadhaarNumber: '',
    aadhaarVerified: false,
    loanAmount: 0,
    hasBankAccount: false,
    trustScore: 0,
    confidenceScore: 0,
    eligibilityTier: 'Not Eligible',
    maxLoanAmount: 0,
    suggestedEMI: 0,
    financialAnswers: []
  });

  const totalSteps = 7;

  const handleAadhaarVerify = (aadhaarNumber: string) => {
    setUserData(prev => ({
      ...prev,
      aadhaarNumber,
      aadhaarVerified: true
    }));
    setCurrentStep(2);
  };

  const handleLoanAmountSubmit = (amount: number) => {
    setUserData(prev => ({
      ...prev,
      loanAmount: amount
    }));
    setCurrentStep(3);
  };

  const handleBankAccountSelect = (hasBankAccount: boolean) => {
    setUserData(prev => ({
      ...prev,
      hasBankAccount
    }));
    setCurrentStep(4);
  };

  const handleIncomeVerification = (incomeData: any) => {
    setUserData(prev => ({
      ...prev,
      ...incomeData
    }));
    setCurrentStep(5);
  };

  const handleFinancialStabilityComplete = (answers: number[], trustScore: number) => {
    setUserData(prev => ({
      ...prev,
      financialAnswers: answers,
      trustScore
    }));
    setCurrentStep(6);
  };

  const handleEligibilityComplete = () => {
    // Calculate final scores and eligibility
    const { annualIncome = 0, trustScore, loanAmount } = userData;
    
    let confidenceScore = 0;
    if (userData.incomeVerificationMethod === 'bank') {
      confidenceScore = 85 + (userData.bankStatementMonths || 0) * 2;
    } else if (userData.incomeVerificationMethod === 'upi') {
      confidenceScore = 70;
    } else if (userData.incomeVerificationMethod === 'field') {
      confidenceScore = 60;
    }
    
    confidenceScore = Math.min(95, confidenceScore + (trustScore - 50) * 0.3);
    
    const incomeMultiplier = trustScore >= 70 ? 8 : trustScore >= 50 ? 5 : 3;
    const maxLoanAmount = Math.min(1000000, (annualIncome * incomeMultiplier) / 12);
    
    let eligibilityTier: 'Low' | 'Medium' | 'High' | 'Not Eligible' = 'Not Eligible';
    
    if (trustScore >= 70 && annualIncome >= 120000) {
      eligibilityTier = 'High';
    } else if (trustScore >= 50 && annualIncome >= 80000) {
      eligibilityTier = 'Medium';
    } else if (trustScore >= 30 && annualIncome >= 50000) {
      eligibilityTier = 'Low';
    }
    
    const monthlyRate = 0.12 / 12;
    const tenure = 12;
    const loanAmountToUse = Math.min(loanAmount, maxLoanAmount);
    const emi = loanAmountToUse > 0 ? 
      (loanAmountToUse * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
      (Math.pow(1 + monthlyRate, tenure) - 1) : 0;

    setUserData(prev => ({
      ...prev,
      confidenceScore: Math.round(confidenceScore),
      eligibilityTier,
      maxLoanAmount: Math.round(maxLoanAmount),
      suggestedEMI: Math.round(emi)
    }));
    
    setCurrentStep(7);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setUserData({
      aadhaarNumber: '',
      aadhaarVerified: false,
      loanAmount: 0,
      hasBankAccount: false,
      trustScore: 0,
      confidenceScore: 0,
      eligibilityTier: 'Not Eligible',
      maxLoanAmount: 0,
      suggestedEMI: 0,
      financialAnswers: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            लोन सत्यापन सिमुलेटर
          </h1>
          <p className="text-xl text-gray-600 mb-1">
            Loan Verification Simulator
          </p>
          <p className="text-sm text-gray-500">
            भारत में कम आय वाले उपयोगकर्ताओं के लिए / For low-income users in India
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep < 7 && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        )}

        {/* Step Components */}
        {currentStep === 1 && (
          <AadhaarVerification 
            onVerify={handleAadhaarVerify}
            isVerified={userData.aadhaarVerified}
          />
        )}

        {currentStep === 2 && (
          <LoanAmountInput 
            onSubmit={handleLoanAmountSubmit}
            currentAmount={userData.loanAmount}
          />
        )}

        {currentStep === 3 && (
          <BankAccountStatus 
            onSelect={handleBankAccountSelect}
          />
        )}

        {currentStep === 4 && (
          <IncomeVerification 
            hasBankAccount={userData.hasBankAccount}
            onSubmit={handleIncomeVerification}
          />
        )}

        {currentStep === 5 && (
          <FinancialStabilityCheck 
            onComplete={handleFinancialStabilityComplete}
          />
        )}

        {currentStep === 6 && (
          <LoanEligibility 
            userData={userData}
            onComplete={handleEligibilityComplete}
          />
        )}

        {currentStep === 7 && (
          <Dashboard 
            userData={userData}
            onRestart={handleRestart}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>यह एक डेमो एप्लिकेशन है / This is a demo application</p>
          <p>वास्तविक API कनेक्शन नहीं है / No real API connections</p>
        </div>
      </div>
    </div>
  );
}

export default App;