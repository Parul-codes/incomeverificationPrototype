import React, { useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';

interface AadhaarVerificationProps {
  onVerify: (aadhaarNumber: string) => void;
  isVerified: boolean;
}

const AadhaarVerification: React.FC<AadhaarVerificationProps> = ({ onVerify, isVerified }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    if (aadhaarNumber.length === 12) {
      setIsLoading(true);
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      onVerify(aadhaarNumber);
    } else {
      alert('गलत OTP / Invalid OTP. Please use 123456 for demo.');
    }
  };

  if (isVerified) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-green-800">
              आधार सत्यापित / Aadhaar Verified
            </h3>
            <p className="text-green-600">
              आपका आधार सफलतापूर्वक सत्यापित हो गया है
            </p>
            <p className="text-green-600 text-sm">
              Your Aadhaar has been successfully verified
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            आधार सत्यापन / Aadhaar Verification
          </h2>
          <p className="text-gray-600">
            कृपया अपना 12 अंकों का आधार नंबर दर्ज करें
          </p>
          <p className="text-gray-600 text-sm">
            Please enter your 12-digit Aadhaar number
          </p>
        </div>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              आधार संख्या / Aadhaar Number
            </label>
            <input
              type="text"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
              placeholder="1234 5678 9012"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg tracking-wider"
              maxLength={12}
            />
            <p className="text-xs text-gray-500 mt-1">
              डेमो के लिए कोई भी 12 अंक का नंबर डालें / Enter any 12-digit number for demo
            </p>
          </div>
          
          <button
            onClick={handleSendOtp}
            disabled={aadhaarNumber.length !== 12 || isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>OTP भेजा जा रहा है... / Sending OTP...</span>
              </div>
            ) : (
              'OTP भेजें / Send OTP'
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              OTP आपके रजिस्टर्ड मोबाइल नंबर पर भेजा गया है
            </p>
            <p className="text-blue-600 text-sm">
              OTP sent to your registered mobile number
            </p>
            <p className="text-xs text-gray-600 mt-2">
              डेमो के लिए 123456 का उपयोग करें / Use 123456 for demo
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP दर्ज करें / Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg tracking-wider text-center"
              maxLength={6}
            />
          </div>
          
          <button
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            OTP सत्यापित करें / Verify OTP
          </button>
          
          <button
            onClick={() => setOtpSent(false)}
            className="w-full text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            वापस जाएं / Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default AadhaarVerification;