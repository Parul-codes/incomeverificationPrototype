import React from 'react';
import { CheckCircle, XCircle, IndianRupee, TrendingUp, Award, FileText, Smartphone, MapPin } from 'lucide-react';
import { UserData } from '../types';

interface DashboardProps {
  userData: UserData;
  onRestart: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onRestart }) => {
  const getVerificationMethodIcon = () => {
    switch (userData.incomeVerificationMethod) {
      case 'bank': return <FileText className="w-5 h-5" />;
      case 'upi': return <Smartphone className="w-5 h-5" />;
      case 'field': return <MapPin className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getVerificationMethodText = () => {
    switch (userData.incomeVerificationMethod) {
      case 'bank': return 'बैंक स्टेटमेंट / Bank Statement';
      case 'upi': return 'UPI रिपोर्ट / UPI Reports';
      case 'field': return 'फील्ड वेरिफिकेशन / Field Verification';
      default: return 'अज्ञात / Unknown';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-orange-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          लोन आवेदन सारांश / Loan Application Summary
        </h2>
        <p className="text-gray-600">
          आपकी सभी जानकारी का विवरण / Complete details of your information
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Aadhaar Verification */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">
                आधार सत्यापन / Aadhaar Verification
              </h3>
              <p className="text-green-600">सत्यापित / Verified ✓</p>
              <p className="text-sm text-green-600">
                आधार: ****{userData.aadhaarNumber.slice(-4)}
              </p>
            </div>
          </div>
        </div>

        {/* Income Verification */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            {getVerificationMethodIcon()}
            <div>
              <h3 className="font-semibold text-blue-800">
                आय सत्यापन / Income Verification
              </h3>
              <p className="text-blue-600">{getVerificationMethodText()}</p>
              <p className="text-sm text-blue-600">
                वार्षिक आय: ₹{new Intl.NumberFormat('en-IN').format(userData.annualIncome || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-semibold text-purple-800 text-sm mb-1">
            ट्रस्ट स्कोर
          </h4>
          <p className="text-2xl font-bold text-purple-900">{userData.trustScore}%</p>
        </div>

        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-green-800 text-sm mb-1">
            कॉन्फिडेंस स्कोर
          </h4>
          <p className="text-2xl font-bold text-green-900">{userData.confidenceScore}%</p>
        </div>

        <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <span className={`text-2xl font-bold ${getTierColor(userData.eligibilityTier)}`}>
            {userData.eligibilityTier === 'High' && 'उच्च'}
            {userData.eligibilityTier === 'Medium' && 'मध्यम'}
            {userData.eligibilityTier === 'Low' && 'निम्न'}
            {userData.eligibilityTier === 'Not Eligible' && 'अपात्र'}
          </span>
          <h4 className="font-semibold text-yellow-800 text-sm mt-1">
            पात्रता स्तर
          </h4>
        </div>

        <div className="text-center p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <IndianRupee className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="font-semibold text-indigo-800 text-sm mb-1">
            सुझावित EMI
          </h4>
          <p className="text-lg font-bold text-indigo-900">
            ₹{new Intl.NumberFormat('en-IN').format(userData.suggestedEMI)}
          </p>
        </div>
      </div>

      {/* Loan Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          लोन विवरण / Loan Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">मांगी गई राशि:</span>
              <span className="font-medium">₹{new Intl.NumberFormat('en-IN').format(userData.loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">अधिकतम स्वीकृत राशि:</span>
              <span className="font-medium text-green-600">₹{new Intl.NumberFormat('en-IN').format(userData.maxLoanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">वार्षिक आय:</span>
              <span className="font-medium">₹{new Intl.NumberFormat('en-IN').format(userData.annualIncome || 0)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">ब्याज दर:</span>
              <span className="font-medium">12% प्रति वर्ष</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">अवधि:</span>
              <span className="font-medium">12 महीने</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">मासिक EMI:</span>
              <span className="font-medium text-blue-600">₹{new Intl.NumberFormat('en-IN').format(userData.suggestedEMI)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          अगले कदम / Next Steps
        </h3>
        
        {userData.eligibilityTier !== 'Not Eligible' ? (
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>आवश्यक दस्तावेज तैयार करें / Prepare required documents</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>बैंक खाता विवरण की जांच करें / Verify bank account details</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>लोन एग्रीमेंट की समीक्षा करें / Review loan agreement</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>हमारे एजेंट का कॉल का इंतजार करें / Wait for agent's call</span>
            </li>
          </ul>
        ) : (
          <div className="text-red-700">
            <p className="mb-2">वर्तमान में आप लोन के लिए पात्र नहीं हैं। सुधार के लिए:</p>
            <ul className="space-y-1 text-sm">
              <li>• अपनी आय बढ़ाने का प्रयास करें</li>
              <li>• नियमित बचत की आदत डालें</li>
              <li>• 6 महीने बाद दोबारा आवेदन करें</li>
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onRestart}
          className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          नया आवेदन / New Application
        </button>
        
        {userData.eligibilityTier !== 'Not Eligible' && (
          <button
            onClick={() => alert('लोन प्रक्रिया शुरू की गई / Loan process initiated')}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            लोन के लिए आवेदन करें / Apply for Loan
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;