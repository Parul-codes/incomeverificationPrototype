import React from 'react';
import { Building2, X } from 'lucide-react';

interface BankAccountStatusProps {
  onSelect: (hasBankAccount: boolean) => void;
}

const BankAccountStatus: React.FC<BankAccountStatusProps> = ({ onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Building2 className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            बैंक खाता स्थिति / Bank Account Status
          </h2>
          <p className="text-gray-600">
            क्या आपका कोई सक्रिय बैंक खाता है?
          </p>
          <p className="text-gray-600 text-sm">
            Do you have an active bank account?
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => onSelect(true)}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                हाँ, मेरा बैंक खाता है
              </h3>
              <p className="text-gray-600">Yes, I have a bank account</p>
              <p className="text-sm text-green-600 mt-1">
                बैंक स्टेटमेंट से आय सत्यापन / Income verification via bank statements
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect(false)}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200">
              <X className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                नहीं, मेरा बैंक खाता नहीं है
              </h3>
              <p className="text-gray-600">No, I don't have a bank account. Exit</p>
              <p className="text-sm text-orange-600 mt-1">
                वैकल्पिक सत्यापन विकल्प / Alternative verification options
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">
          जानकारी / Information:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• बैंक खाता होने से तेज़ अप्रूवल मिलता है</li>
          <li>• Bank account enables faster approval</li>
          <li>• बिना बैंक खाते के भी लोन मिल सकता है</li>
          <li>• Loan possible even without bank account</li>
        </ul>
      </div>
    </div>
  );
};

export default BankAccountStatus;