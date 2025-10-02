export interface UserData {
  aadhaarNumber: string;
  aadhaarVerified: boolean;
  loanAmount: number;
  hasBankAccount: boolean;
  bankStatementMonths?: number;
  averageMonthlyIncome?: number;
  annualIncome?: number;
  incomeVerificationMethod?: 'bank' | 'upi' | 'field';
  upiData?: string;
  fieldVerificationRequested?: boolean;
  trustScore: number;
  confidenceScore: number;
  eligibilityTier: 'Low' | 'Medium' | 'High' | 'Not Eligible';
  maxLoanAmount: number;
  suggestedEMI: number;
  financialAnswers: number[];
}

export interface Question {
  id: number;
  hindi: string;
  english: string;
  options: {
    hindi: string;
    english: string;
    score: number;
  }[];
}