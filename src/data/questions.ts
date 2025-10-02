import { Question } from '../types';

export const financialQuestions: Question[] = [
  {
    id: 1,
    hindi: "आप कितनी बार पैसे बचाते हैं?",
    english: "How often do you save money?",
    options: [
      { hindi: "हर महीने नियमित रूप से", english: "Regularly every month", score: 10 },
      { hindi: "कभी-कभी", english: "Sometimes", score: 6 },
      { hindi: "बहुत कम", english: "Rarely", score: 3 },
      { hindi: "कभी नहीं", english: "Never", score: 0 }
    ]
  },
  {
    id: 2,
    hindi: "क्या आपने पहले कभी लोन लिया है?",
    english: "Have you taken a loan before?",
    options: [
      { hindi: "हाँ, और समय पर चुकाया", english: "Yes, and repaid on time", score: 10 },
      { hindi: "हाँ, लेकिन देर से चुकाया", english: "Yes, but repaid late", score: 4 },
      { hindi: "हाँ, लेकिन पूरा नहीं चुकाया", english: "Yes, but didn't repay fully", score: 0 },
      { hindi: "नहीं, पहली बार", english: "No, first time", score: 7 }
    ]
  },
  {
    id: 3,
    hindi: "आपकी मासिक आय में से कितना प्रतिशत आप खर्च करते हैं?",
    english: "What percentage of your monthly income do you spend?",
    options: [
      { hindi: "50% से कम", english: "Less than 50%", score: 10 },
      { hindi: "50-70%", english: "50-70%", score: 8 },
      { hindi: "70-90%", english: "70-90%", score: 5 },
      { hindi: "90% से ज्यादा", english: "More than 90%", score: 2 }
    ]
  },
  {
    id: 4,
    hindi: "आपके पास आपातकालीन फंड है?",
    english: "Do you have an emergency fund?",
    options: [
      { hindi: "हाँ, 6 महीने का खर्च", english: "Yes, 6 months expenses", score: 10 },
      { hindi: "हाँ, 3 महीने का खर्च", english: "Yes, 3 months expenses", score: 8 },
      { hindi: "हाँ, 1 महीने का खर्च", english: "Yes, 1 month expenses", score: 5 },
      { hindi: "नहीं", english: "No", score: 0 }
    ]
  },
  {
    id: 5,
    hindi: "आप अपने बिलों का भुगतान कैसे करते हैं?",
    english: "How do you pay your bills?",
    options: [
      { hindi: "हमेशा समय पर", english: "Always on time", score: 10 },
      { hindi: "ज्यादातर समय पर", english: "Mostly on time", score: 7 },
      { hindi: "कभी-कभी देर से", english: "Sometimes late", score: 4 },
      { hindi: "अक्सर देर से", english: "Often late", score: 1 }
    ]
  },
  {
    id: 6,
    hindi: "आपकी मुख्य आय का स्रोत क्या है?",
    english: "What is your main source of income?",
    options: [
      { hindi: "नियमित नौकरी", english: "Regular job", score: 10 },
      { hindi: "अपना व्यवसाय", english: "Own business", score: 8 },
      { hindi: "दैनिक मजदूरी", english: "Daily wages", score: 5 },
      { hindi: "अनियमित काम", english: "Irregular work", score: 3 }
    ]
  },
  {
    id: 7,
    hindi: "आप पैसे कहाँ रखते हैं?",
    english: "Where do you keep your money?",
    options: [
      { hindi: "बैंक खाते में", english: "In bank account", score: 10 },
      { hindi: "बैंक और घर दोनों में", english: "Both bank and home", score: 7 },
      { hindi: "ज्यादातर घर में", english: "Mostly at home", score: 4 },
      { hindi: "हमेशा घर में", english: "Always at home", score: 1 }
    ]
  },
  {
    id: 8,
    hindi: "आप भविष्य की योजना कैसे बनाते हैं?",
    english: "How do you plan for the future?",
    options: [
      { hindi: "लिखित योजना बनाता हूँ", english: "Make written plans", score: 10 },
      { hindi: "मन में योजना रखता हूँ", english: "Keep plans in mind", score: 7 },
      { hindi: "कभी-कभी सोचता हूँ", english: "Think sometimes", score: 4 },
      { hindi: "कोई योजना नहीं", english: "No planning", score: 1 }
    ]
  },
  {
    id: 9,
    hindi: "अगर अचानक पैसे की जरूरत हो तो आप क्या करेंगे?",
    english: "What would you do if you suddenly need money?",
    options: [
      { hindi: "अपनी बचत से लूंगा", english: "Use my savings", score: 10 },
      { hindi: "परिवार से मांगूंगा", english: "Ask family", score: 7 },
      { hindi: "दोस्तों से उधार लूंगा", english: "Borrow from friends", score: 5 },
      { hindi: "साहूकार से लूंगा", english: "Take from moneylender", score: 2 }
    ]
  },
  {
    id: 10,
    hindi: "आप अपने खर्चों का हिसाब कैसे रखते हैं?",
    english: "How do you track your expenses?",
    options: [
      { hindi: "रोज लिखकर रखता हूँ", english: "Write daily", score: 10 },
      { hindi: "हफ्ते में एक बार", english: "Once a week", score: 7 },
      { hindi: "महीने में एक बार", english: "Once a month", score: 4 },
      { hindi: "कोई हिसाब नहीं रखता", english: "Don't track", score: 1 }
    ]
  }
];