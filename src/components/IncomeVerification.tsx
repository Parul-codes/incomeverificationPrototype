import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface IncomeVerificationProps {
  hasBankAccount: boolean;
  onSubmit: (data: any) => void;
}

const IncomeVerification: React.FC<IncomeVerificationProps> = ({ hasBankAccount, onSubmit }) => {
  const [bankStatementMonths, setBankStatementMonths] = useState(6);
  const [averageMonthlyIncome, setAverageMonthlyIncome] = useState(15000);
  const [selectedOption, setSelectedOption] = useState<'upi' | 'field' | 'exit' | null>(null);
  const [upiData, setUpiData] = useState('');

  const handleBankSubmit = () => {
    const annualIncome = averageMonthlyIncome * 12;
    onSubmit({
      bankStatementMonths,
      averageMonthlyIncome,
      annualIncome,
      incomeVerificationMethod: 'bank'
    });
  };

  const handleAlternativeSubmit = () => {
    if (selectedOption === 'upi') {
      const estimatedMonthlyIncome = 12000; // Simulated calculation from UPI data
      const annualIncome = estimatedMonthlyIncome * 12;
      onSubmit({
        upiData,
        averageMonthlyIncome: estimatedMonthlyIncome,
        annualIncome,
        incomeVerificationMethod: 'upi'
      });
    } else if (selectedOption === 'field') {
      onSubmit({
        fieldVerificationRequested: true,
        incomeVerificationMethod: 'field'
      });
    } else if (selectedOption === 'exit') {
      alert('आवेदन रद्द किया गया / Application cancelled');
    }
  };

  if (hasBankAccount) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              आय सत्यापन / Income Verification
            </h2>
            <p className="text-gray-600">
              बैंक स्टेटमेंट की जानकारी दें
            </p>
            <p className="text-gray-600 text-sm">
              Provide bank statement information
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              बैंक स्टेटमेंट कितने महीने का है? / Bank statement months
            </label>
            <select
              value={bankStatementMonths}
              onChange={(e) => setBankStatementMonths(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={3}>3 महीने / 3 months</option>
              <option value={6}>6 महीने / 6 months</option>
              <option value={12}>12 महीने / 12 months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              औसत मासिक आय / Average Monthly Income (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={averageMonthlyIncome}
                onChange={(e) => setAverageMonthlyIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="5000"
                max="100000"
                step="1000"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              स्टेटमेंट के आधार पर औसत आय / Average income based on statements
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">
              अनुमानित वार्षिक आय / Estimated Annual Income:
            </h3>
            <p className="text-2xl font-bold text-green-900">
              ₹{new Intl.NumberFormat('en-IN').format(averageMonthlyIncome * 12)}
            </p>
            <p className="text-sm text-green-600 mt-1">
              {bankStatementMonths} महीने के डेटा के आधार पर / Based on {bankStatementMonths} months data
            </p>
          </div>

          <button
            onClick={handleBankSubmit}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            आय सत्यापित करें / Verify Income
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="w-8 h-8 text-orange-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            वैकल्पिक सत्यापन / Alternative Verification
          </h2>
          <p className="text-gray-600">
            बिना बैंक खाते के आय सत्यापन के विकल्प
          </p>
          <p className="text-gray-600 text-sm">
            Income verification options without bank account
          </p>
        </div>
      </div>

      {!selectedOption ? (
        <div className="space-y-4">
          {/* <button
            onClick={() => setSelectedOption('upi')}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  UPI/QR सेटलमेंट रिपोर्ट अपलोड करें
                </h3>
                <p className="text-sm text-gray-600">Upload UPI/QR settlement reports</p>
              </div>
            </div>
          </button> */}

          {/* <button
            onClick={() => setSelectedOption('field')}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  फील्ड वेरिफिकेशन के लिए आवेदन करें
                </h3>
                <p className="text-sm text-gray-600">Apply for Field Verification</p>
              </div>
            </div>
          </button> */}

          <button
            onClick={() => setSelectedOption('exit')}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">×</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  बाहर निकलें / Exit
                </h3>
                <p className="text-sm text-gray-600">Exit the application process</p>
              </div>
            </div>
          </button>
        </div>
      ) : selectedOption === 'upi' ? (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">
              UPI सेटलमेंट डेटा / UPI Settlement Data
            </h3>
            <p className="text-sm text-blue-600">
              पिछले 6 महीने का UPI ट्रांजैक्शन डेटा पेस्ट करें
            </p>
            <p className="text-sm text-blue-600">
              Paste last 6 months UPI transaction data
            </p>
          </div>
          
          <textarea
            value={upiData}
            onChange={(e) => setUpiData(e.target.value)}
            placeholder="UPI transaction data here... (डेमो के लिए कुछ भी लिखें / Write anything for demo)"
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="flex space-x-3">
            <button
              onClick={handleAlternativeSubmit}
              disabled={!upiData.trim()}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              डेटा सबमिट करें / Submit Data
            </button>
            <button
              onClick={() => setSelectedOption(null)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              वापस / Back
            </button>
          </div>
        </div>
      ) : selectedOption === 'field' ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">
              फील्ड वेरिफिकेशन / Field Verification
            </h3>
            <p className="text-sm text-green-600">
              हमारा एजेंट आपके घर/काम की जगह आकर आय की जांच करेगा
            </p>
            <p className="text-sm text-green-600">
              Our agent will visit your home/workplace to verify income
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">समय सीमा / Timeline:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• वेरिफिकेशन में 3-5 दिन लगेंगे / Verification takes 3-5 days</li>
              <li>• एजेंट पहले फोन करेगा / Agent will call first</li>
              <li>• सभी दस्तावेज तैयार रखें / Keep all documents ready</li>
            </ul>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleAlternativeSubmit}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              फील्ड वेरिफिकेशन बुक करें / Book Field Verification
            </button>
            <button
              onClick={() => setSelectedOption(null)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              वापस / Back
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default IncomeVerification;