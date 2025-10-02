import React from 'react';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';
import { UserData } from '../types';

interface LoanEligibilityProps {
  userData: UserData;
  onComplete: () => void;
}

const LoanEligibility: React.FC<LoanEligibilityProps> = ({ userData, onComplete }) => {
  const calculateEligibility = () => {
    const { annualIncome = 0, trustScore, loanAmount } = userData;
    
    // Calculate confidence score based on income verification method
    let confidenceScore = 0;
    if (userData.incomeVerificationMethod === 'bank') {
      confidenceScore = 85 + (userData.bankStatementMonths || 0) * 2;
    } else if (userData.incomeVerificationMethod === 'upi') {
      confidenceScore = 70;
    } else if (userData.incomeVerificationMethod === 'field') {
      confidenceScore = 60;
    }
    
    // Adjust confidence based on trust score
    confidenceScore = Math.min(95, confidenceScore + (trustScore - 50) * 0.3);
    
    // Calculate max loan amount based on income and trust score
    const incomeMultiplier = trustScore >= 70 ? 8 : trustScore >= 50 ? 5 : 3;
    const maxLoanAmount = Math.min(1000000, (annualIncome * incomeMultiplier) / 12);
    
    // Determine eligibility tier
    let eligibilityTier: 'Low' | 'Medium' | 'High' | 'Not Eligible' = 'Not Eligible';
    
    if (trustScore >= 70 && annualIncome >= 120000) {
      eligibilityTier = 'High';
    } else if (trustScore >= 50 && annualIncome >= 80000) {
      eligibilityTier = 'Medium';
    } else if (trustScore >= 30 && annualIncome >= 50000) {
      eligibilityTier = 'Low';
    }
    
    // Calculate EMI (assuming 12% annual interest for 12 months)
    const monthlyRate = 0.12 / 12;
    const tenure = 12;
    const loanAmountToUse = Math.min(loanAmount, maxLoanAmount);
    const emi = loanAmountToUse > 0 ? 
      (loanAmountToUse * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
      (Math.pow(1 + monthlyRate, tenure) - 1) : 0;
    
    return {
      eligibilityTier,
      maxLoanAmount: Math.round(maxLoanAmount),
      confidenceScore: Math.round(confidenceScore),
      suggestedEMI: Math.round(emi)
    };
  };

  const eligibilityData = calculateEligibility();
  
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'High': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'High': return <Award className="w-6 h-6" />;
      case 'Medium': return <TrendingUp className="w-6 h-6" />;
      case 'Low': return <AlertCircle className="w-6 h-6" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          लोन पात्रता परिणाम / Loan Eligibility Result
        </h2>
        <p className="text-gray-600">
          आपकी वित्तीय जानकारी के आधार पर / Based on your financial information
        </p>
      </div>

      {/* Eligibility Tier */}
      <div className={`border-2 rounded-lg p-6 mb-6 ${getTierColor(eligibilityData.eligibilityTier)}`}>
        <div className="flex items-center justify-center space-x-3 mb-4">
          {getTierIcon(eligibilityData.eligibilityTier)}
          <h3 className="text-2xl font-bold">
            {eligibilityData.eligibilityTier === 'High' && 'उच्च पात्रता / High Eligibility'}
            {eligibilityData.eligibilityTier === 'Medium' && 'मध्यम पात्रता / Medium Eligibility'}
            {eligibilityData.eligibilityTier === 'Low' && 'निम्न पात्रता / Low Eligibility'}
            {eligibilityData.eligibilityTier === 'Not Eligible' && 'अपात्र / Not Eligible'}
          </h3>
        </div>
        
        {eligibilityData.eligibilityTier !== 'Not Eligible' && (
          <div className="text-center">
            <p className="text-3xl font-bold mb-2">
              ₹{new Intl.NumberFormat('en-IN').format(eligibilityData.maxLoanAmount)}
            </p>
            <p className="font-medium">
              अधिकतम लोन राशि / Maximum Loan Amount
            </p>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-blue-800 mb-2">
            ट्रस्ट स्कोर / Trust Score
          </h4>
          <p className="text-2xl font-bold text-blue-900">{userData.trustScore}%</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-green-800 mb-2">
            कॉन्फिडेंस स्कोर / Confidence Score
          </h4>
          <p className="text-2xl font-bold text-green-900">{eligibilityData.confidenceScore}%</p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-purple-800 mb-2">
            सुझावित EMI / Suggested EMI
          </h4>
          <p className="text-2xl font-bold text-purple-900">
            ₹{new Intl.NumberFormat('en-IN').format(eligibilityData.suggestedEMI)}
          </p>
        </div>
      </div>

      {/* Loan Details */}
      {eligibilityData.eligibilityTier !== 'Not Eligible' && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            लोन विवरण / Loan Details:
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>मांगी गई राशि / Requested Amount:</span>
              <span className="font-medium">₹{new Intl.NumberFormat('en-IN').format(userData.loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>स्वीकृत राशि / Approved Amount:</span>
              <span className="font-medium text-green-600">
                ₹{new Intl.NumberFormat('en-IN').format(Math.min(userData.loanAmount, eligibilityData.maxLoanAmount))}
              </span>
            </div>
            <div className="flex justify-between">
              <span>ब्याज दर / Interest Rate:</span>
              <span className="font-medium">12% प्रति वर्ष / per annum</span>
            </div>
            <div className="flex justify-between">
              <span>अवधि / Tenure:</span>
              <span className="font-medium">12 महीने / months</span>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-yellow-800 mb-3">
          सुझाव / Recommendations:
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          {userData.trustScore < 50 && (
            <>
              <li>• नियमित बचत की आदत डालें / Develop regular saving habits</li>
              <li>• समय पर बिलों का भुगतान करें / Pay bills on time</li>
            </>
          )}
          {userData.trustScore >= 50 && userData.trustScore < 70 && (
            <>
              <li>• आपातकालीन फंड बनाएं / Build emergency fund</li>
              <li>• खर्चों का बेहतर हिसाब रखें / Better expense tracking</li>
            </>
          )}
          {userData.trustScore >= 70 && (
            <>
              <li>• आप एक अच्छे उधारकर्ता हैं / You are a good borrower</li>
              <li>• बेहतर ब्याज दरों के लिए पात्र / Eligible for better rates</li>
            </>
          )}
        </ul>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        डैशबोर्ड देखें / View Dashboard
      </button>
    </div>
  );
};

export default LoanEligibility;