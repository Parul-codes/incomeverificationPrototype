import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';

interface LoanAmountInputProps {
  onSubmit: (amount: number) => void;
  currentAmount: number;
}

const LoanAmountInput: React.FC<LoanAmountInputProps> = ({ onSubmit, currentAmount }) => {
  const [amount, setAmount] = useState(currentAmount || 50000);

  const presetAmounts = [25000, 50000, 100000, 200000, 500000];

  const formatAmount = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handleSubmit = () => {
    if (amount >= 10000 && amount <= 1000000) {
      onSubmit(amount);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <IndianRupee className="w-8 h-8 text-green-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            लोन राशि / Loan Amount
          </h2>
          <p className="text-gray-600">
            आप कितनी राशि का लोन चाहते हैं?
          </p>
          <p className="text-gray-600 text-sm">
            How much loan amount do you need?
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            राशि दर्ज करें / Enter Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              min="10000"
              max="1000000"
              step="1000"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            न्यूनतम ₹10,000 - अधिकतम ₹10,00,000 / Min ₹10,000 - Max ₹10,00,000
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            त्वरित चयन / Quick Select:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                onClick={() => setAmount(presetAmount)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                  amount === presetAmount
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                ₹{formatAmount(presetAmount)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">
            चुनी गई राशि / Selected Amount:
          </h3>
          <p className="text-2xl font-bold text-blue-900">₹{formatAmount(amount)}</p>
          <p className="text-sm text-blue-600 mt-1">
            {amount < 50000 && 'छोटी राशि - तेज़ अप्रूवल / Small amount - Fast approval'}
            {amount >= 50000 && amount < 200000 && 'मध्यम राशि - सामान्य प्रक्रिया / Medium amount - Standard process'}
            {amount >= 200000 && 'बड़ी राशि - विस्तृत जांच / Large amount - Detailed verification'}
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={amount < 10000 || amount > 1000000}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          आगे बढ़ें / Continue
        </button>
      </div>
    </div>
  );
};

export default LoanAmountInput;