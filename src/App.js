import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Trophy, BarChart3, CheckCircle, XCircle, Home, Play, ArrowLeft, ChevronRight, Download, Flag, Eye, TrendingUp, Pause, X } from 'lucide-react';

// Import subjectsWithSubtopics from centralized index
import { subjectsWithSubtopics } from './questions/index.js';

// Lesson 1 question imports
import { questions as anatomyPhysiologyQuestions } from './questions/lesson1/lesson1-anatomy-and-physiology.js';
import { questions as dentalAnatomyQuestions } from './questions/lesson1/lesson1-dental-anatomy.js';
import { questions as dentalHygieneTheory1Questions } from './questions/lesson1/lesson1-dental-hygiene-theory-i.js';
import { questions as histologyEmbryologyQuestions } from './questions/lesson1/lesson1-histology-and-embryology.js';
import { questions as statisticsResearchQuestions } from './questions/lesson1/lesson1-introduction-to-statistics-and-research.js';
import { questions as microbiologyQuestions } from './questions/lesson1/lesson1-microbiology.js';

// Lesson 2 question imports
import { radiographyQuestions } from './questions/lesson2/lesson2-radiography-questions.js';
import { questions as pathophysiologyQuestions } from './questions/lesson2/lesson2-pathophysiology.js';
import { questions as dentalMaterialsQuestions } from './questions/lesson2/lesson2-dental-materials-theory.js';
import { questions as periodontologyQuestions } from './questions/lesson2/lesson2-periodontology-i.js';
import { questions as anatomyQuestions } from './questions/lesson2/lesson2-head-and-neck-anatomy.js';
import { questions as pharmacologyQuestions } from './questions/lesson2/lesson2-pharmacology.js';


// Subjects organized by lesson
const subjectsByLesson = {
  "Lesson 1": [
    "Anatomy and Physiology",
    "Dental Anatomy",
    "Dental Hygiene Theory I",
    "Histology and Embryology",
    "Introduction to Statistics and Research",
    "Microbiology"
  ],
  "Lesson 2": [
    "Dental Hygiene Clinic II",
    "Dental Hygiene Theory II",
    "Dental Materials Theory",
    "Dental Radiography Interpretation",
    "Dental Radiography Lab",
    "Dental Radiography Theory",
    "Head and Neck Anatomy",
    "Oral Health Education",
    "Pathophysiology",
    "Periodontology I",
    "Pharmacology",
    "Medical Emergencies"
  ],
  "Lesson 3": [
    "Community Dental Health I",
    "Dental Hygiene Clinic III",
    "Dental Hygiene Theory III",
    "Dental Materials Lab",
    "Ethics and Jurisprudence",
    "Gerontology",
    "Nutrition for Living",
    "Oral Health Promotion",
    "Oral Pathology",
    "Periodontology II"
  ],
  "Lesson 4": [
    "Business Practice",
    "Community Dental Health II",
    "Consolidated Learning",
    "Dental Hygiene Clinic IV",
    "Dental Hygiene Theory IV"
  ]
};

// Question bank - all questions imported from separate files
const questionBank = {
  ...anatomyPhysiologyQuestions,
  ...dentalAnatomyQuestions,
  ...dentalHygieneTheory1Questions,
  ...histologyEmbryologyQuestions,
  ...statisticsResearchQuestions,
  ...microbiologyQuestions,
  ...radiographyQuestions,
  ...pathophysiologyQuestions,
  ...dentalMaterialsQuestions,
  ...periodontologyQuestions,
  ...anatomyQuestions,
  ...pharmacologyQuestions
};



// Global styles for copy protection
const globalStyles = `
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  
  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  
  input, textarea {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  
  * {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;

// Copy Button Component
const CopyButton = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  };
  
  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
      title="Copy question"
    >
      {copied ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
};

// Google AdSense Component
const GoogleAd = ({ slot, format = "auto", className = "" }) => {
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && slot) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={`my-4 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5701429538019796"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Footer Component
const TermsModal = ({ onClose, showCheckbox = false, onAccept = null }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg className="w-12 h-12 mr-3 flex-shrink-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 C66 0 132 0 200 0 C200 66 200 132 200 200 C134 200 68 200 0 200 C0 134 0 68 0 0 Z " fill="#FEFEFE" transform="translate(0,0)"/>
              <path d="M0 0 C10.45885154 -0.61673817 18.80097348 3.08442546 28.17529297 7.18554688 C39.86836895 12.29999915 48.02367268 14.16553024 60.2421875 9.5625 C62.90168794 8.51088074 65.54164303 7.41661948 68.1796875 6.3125 C70.09529154 5.53902969 72.01177613 4.76773114 73.9296875 4 C74.66703125 3.69449219 75.404375 3.38898437 76.1640625 3.07421875 C83.54977394 0.28310687 92.54717323 0.00463977 100.140625 2.1484375 C106.8401249 5.21990053 111.86097633 9.99969722 115.3515625 16.4921875 C116.52751027 20.49706624 116.46910405 24.28562352 116.4296875 28.4375 C116.43742188 29.22898437 116.44515625 30.02046875 116.453125 30.8359375 C116.41824934 41.64739216 113.93349434 50.82972301 109.6171875 60.6875 C108.95662354 62.23691284 108.95662354 62.23691284 108.28271484 63.81762695 C106.10343389 68.91808003 103.88011713 73.99918918 101.66015625 79.08203125 C94.99760657 94.37422088 89.69485085 109.43418719 87.5390625 126.08203125 C85.70781807 140.14191907 83.21124511 155.28094239 72.7421875 165.75 C70.1796875 167.3125 70.1796875 167.3125 67.6171875 167.625 C63.55123173 165.4356392 62.59389901 161.56591085 61.1796875 157.3125 C60.12191201 152.36707002 59.38816609 147.3803951 58.6796875 142.375 C56.90706011 127.59073766 56.90706011 127.59073766 49.9921875 114.75 C46.0809495 112.7509228 42.57443978 111.98696279 38.1796875 112.3125 C33.68919687 114.47458808 31.27285142 116.81219757 29.1796875 121.3125 C27.10905108 127.32682944 26.70948307 133.11618348 26.3046875 139.4375 C24.70777101 160.78441649 24.70777101 160.78441649 19.1796875 166.3125 C15.74877794 166.44445806 13.30455018 166.25682917 10.59765625 163.984375 C0.87088462 152.17879466 -1.42373194 136.07165002 -4.328125 121.5703125 C-4.82313279 119.15055192 -5.32063402 116.7313004 -5.8203125 114.3125 C-5.95005463 113.66527985 -6.07979675 113.01805969 -6.21347046 112.35122681 C-8.85049261 99.3693109 -13.40544553 87.48395733 -18.4050293 75.24829102 C-25.56091238 57.64691876 -31.87191369 37.72834845 -26.859375 18.65625 C-23.23148977 10.35195779 -16.95559964 5.12057373 -8.7890625 1.3828125 C-5.89437868 0.48742301 -3.00312289 0.332756 0 0 Z " fill="#FDFDFD" transform="translate(55.8203125,16.6875)"/>
              <path d="M0 0 C10.45885154 -0.61673817 18.80097348 3.08442546 28.17529297 7.18554688 C39.86836895 12.29999915 48.02367268 14.16553024 60.2421875 9.5625 C62.90168794 8.51088074 65.54164303 7.41661948 68.1796875 6.3125 C70.09529154 5.53902969 72.01177613 4.76773114 73.9296875 4 C74.66703125 3.69449219 75.404375 3.38898437 76.1640625 3.07421875 C83.54977394 0.28310687 92.54717323 0.00463977 100.140625 2.1484375 C106.8401249 5.21990053 111.86097633 9.99969722 115.3515625 16.4921875 C116.52751027 20.49706624 116.46910405 24.28562352 116.4296875 28.4375 C116.43742188 29.22898437 116.44515625 30.02046875 116.453125 30.8359375 C116.41824934 41.64739216 113.93349434 50.82972301 109.6171875 60.6875 C108.95662354 62.23691284 108.95662354 62.23691284 108.28271484 63.81762695 C106.10343389 68.91808003 103.88011713 73.99918918 101.66015625 79.08203125 C94.99760657 94.37422088 89.69485085 109.43418719 87.5390625 126.08203125 C85.70781807 140.14191907 83.21124511 155.28094239 72.7421875 165.75 C70.1796875 167.3125 70.1796875 167.3125 67.6171875 167.625 C63.55123173 165.4356392 62.59389901 161.56591085 61.1796875 157.3125 C60.12191201 152.36707002 59.38816609 147.3803951 58.6796875 142.375 C56.90706011 127.59073766 56.90706011 127.59073766 49.9921875 114.75 C46.0809495 112.7509228 42.57443978 111.98696279 38.1796875 112.3125 C33.68919687 114.47458808 31.27285142 116.81219757 29.1796875 121.3125 C27.10905108 127.32682944 26.70948307 133.11618348 26.3046875 139.4375 C24.70777101 160.78441649 24.70777101 160.78441649 19.1796875 166.3125 C15.74877794 166.44445806 13.30455018 166.25682917 10.59765625 163.984375 C0.87088462 152.17879466 -1.42373194 136.07165002 -4.328125 121.5703125 C-4.82313279 119.15055192 -5.32063402 116.7313004 -5.8203125 114.3125 C-5.95005463 113.66527985 -6.07979675 113.01805969 -6.21347046 112.35122681 C-8.85049261 99.3693109 -13.40544553 87.48395733 -18.4050293 75.24829102 C-25.56091238 57.64691876 -31.87191369 37.72834845 -26.859375 18.65625 C-23.23148977 10.35195779 -16.95559964 5.12057373 -8.7890625 1.3828125 C-5.89437868 0.48742301 -3.00312289 0.332756 0 0 Z M-19.2578125 12.5 C-25.72271705 20.51909373 -26.55685007 28.24694854 -25.8203125 38.3125 C-24.24651683 51.66951711 -20.13771604 63.58538255 -15.2578125 76.0625 C-14.56436636 77.86925923 -13.87230181 79.67654935 -13.18164062 81.484375 C-11.04763901 87.05575883 -8.91192648 92.62662187 -6.66552734 98.15380859 C-5.50827636 101.10944498 -4.77296679 104.10734698 -4.0078125 107.1875 C-3.83894531 107.86659424 -3.67007813 108.54568848 -3.49609375 109.24536133 C-2.21690598 114.47508415 -1.07554417 119.72963973 0.04150391 124.99609375 C3.29003518 144.65584796 3.29003518 144.65584796 13.1796875 161.3125 C15.78281941 162.09567932 15.78281941 162.09567932 18.1796875 162.3125 C21.46766979 154.69035924 22.4339316 147.09269269 23.49121094 138.89794922 C23.83397888 136.26360369 24.19432671 133.63198993 24.5546875 131 C24.65652344 130.16436523 24.75835937 129.32873047 24.86328125 128.46777344 C25.82006439 121.55309067 27.6623322 115.70998124 32.8046875 110.8125 C38.46001622 108.29902057 43.62130199 108.54015721 49.4921875 110.3125 C57.3593705 116.16714781 59.67496732 126.29533231 61.05859375 135.56640625 C61.29447797 137.33488632 61.52233299 139.1044557 61.7421875 140.875 C62.80247138 152.64078712 62.80247138 152.64078712 67.1796875 163.3125 C70.4538497 163.06996947 71.33005603 162.15292156 73.63110352 159.7109375 C76.25026732 156.45180222 77.86672509 152.9817076 79.26953125 149.0625 C79.5221019 148.37140137 79.77467255 147.68030273 80.03489685 146.96826172 C82.84275526 138.93285231 84.30387973 130.68018761 85.7421875 122.3125 C88.69082221 105.38895987 93.06024006 90.1305028 100.25653076 74.5149231 C112.92253358 47.17942844 112.92253358 47.17942844 112.48046875 17.65234375 C109.91343924 11.85757249 105.28533017 8.06808883 99.5546875 5.5 C86.86405847 1.29396295 76.22461432 6.45758456 64.83422852 11.66259766 C63.95822998 12.06269043 63.08223145 12.4627832 62.1796875 12.875 C61.30820068 13.27380371 60.43671387 13.67260742 59.53881836 14.08349609 C51.80312445 17.57863988 44.74838391 20.3125 36.1796875 20.3125 C39.4796875 19.3225 42.7796875 18.3325 46.1796875 17.3125 C46.1796875 16.9825 46.1796875 16.6525 46.1796875 16.3125 C45.4990625 16.17714844 44.8184375 16.04179688 44.1171875 15.90234375 C36.19607603 14.14326713 29.17860685 11.29816476 21.84375 7.93359375 C8.40967013 1.90903216 -8.44781224 1.3387723 -19.2578125 12.5 Z " fill="#171717" transform="translate(55.8203125,16.6875)"/>
            </svg>
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">Ontario</div>
              <h1 className="text-xl font-bold text-gray-800">Dental Hygiene Test Bank</h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Terms of Use</h2>
          <div className="bg-gray-50 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
            <p className="text-gray-700 leading-relaxed">
              Welcome to the Dental Hygiene Test Bank. This application is designed to help you study and prepare for your dental hygiene examinations. 
              {showCheckbox ? ' Before you begin, please read and acknowledge the following:' : ''}
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>All questions and content are provided for <strong>study purposes only</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Questions and answers <strong>may contain errors</strong> or inaccuracies</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Subject and topic classifications <strong>may be incorrect</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>This is not a substitute for official study materials or professional guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Always verify information with your instructors and official textbooks</span>
              </li>
            </ul>
          </div>
          
          {/* Show checkbox - either active (initial acceptance) or checked/readonly (viewing after acceptance) */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <label className="flex items-start group">
              <input 
                type="checkbox" 
                checked={!showCheckbox} // Checked when viewing (showCheckbox=false), unchecked when accepting (showCheckbox=true)
                disabled={!showCheckbox} // Disabled (read-only) when viewing, enabled when accepting
                className={`mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0 ${
                  showCheckbox ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
                }`}
                onChange={(e) => {
                  if (showCheckbox && e.target.checked && onAccept) {
                    onAccept();
                  }
                }}
              />
              <span className="ml-3 text-sm text-gray-700 leading-relaxed select-none">
                <strong>I acknowledge and agree</strong> that all questions are provided for study purposes only and may contain errors in the questions or answers. 
                I also understand that the subject or topic classification may be incorrect.
              </span>
            </label>
          </div>
          
          {showCheckbox && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Check the box above to continue to the test bank
            </div>
          )}
          
          {!showCheckbox && (
            <div className="text-center text-sm text-green-600 mt-4 font-medium">
              ✓ You have accepted these terms
            </div>
          )}
        </div>
        
        {!showCheckbox && (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = ({ onViewTerms }) => {
  return (
    <div className="text-center py-6 text-sm text-white">
      © 2025{' '}
      <a 
        href="https://www.m2ealabs.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-gray-200 transition-colors font-medium"
        style={{ textDecoration: 'none' }}
      >
        m2ea Labs
      </a>
      . All rights reserved.
      {onViewTerms && (
        <>
          {' · '}
          <button
            onClick={onViewTerms}
            className="text-white hover:text-gray-200 transition-colors font-medium underline"
          >
            Terms of Use
          </button>
        </>
      )}
    </div>
  );
};

// Screen wrapper that includes the terms modal overlay
const ScreenWithTerms = ({ children, showTermsModal, onCloseTerms }) => {
  return (
    <>
      {children}
      {showTermsModal && (
        <TermsModal 
          onClose={onCloseTerms}
          showCheckbox={false}
        />
      )}
    </>
  );
};

export default function ImprovedTestBankApp() {
  const [screen, setScreen] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [totalTestTime, setTotalTestTime] = useState(0);
  const [testHistory, setTestHistory] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionLimit, setQuestionLimit] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [reviewAnswers, setReviewAnswers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [parentSubject, setParentSubject] = useState(null);
  const [lastTestQuestions, setLastTestQuestions] = useState([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState(new Set());
  const [topicProgress, setTopicProgress] = useState({}); // Track progress per topic
  const [isRetakeTest, setIsRetakeTest] = useState(false); // Track if current test is a retake
  const [termsAccepted, setTermsAccepted] = useState(false); // Track terms acknowledgment
  const [showTermsModal, setShowTermsModal] = useState(false); // Track terms modal visibility

  // Shuffle function for randomizing questions
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('testHistory');
      if (savedHistory) {
        setTestHistory(JSON.parse(savedHistory));
      }
      
      const savedFlags = localStorage.getItem('flaggedQuestions');
      if (savedFlags) {
        setFlaggedQuestions(JSON.parse(savedFlags));
      }
      
      const savedTerms = localStorage.getItem('termsAccepted');
      if (savedTerms) {
        setTermsAccepted(JSON.parse(savedTerms));
      }
      
      // Inject global styles for copy protection
      const styleElement = document.createElement('style');
      styleElement.innerHTML = globalStyles;
      document.head.appendChild(styleElement);
      
      // Disable right-click context menu
      const handleContextMenu = (e) => {
        if (!e.target.closest('button')) { // Allow copy buttons to work
          e.preventDefault();
        }
      };
      document.addEventListener('contextmenu', handleContextMenu);
      
      // Disable drag and drop
      const handleDragStart = (e) => {
        e.preventDefault();
        return false;
      };
      document.addEventListener('dragstart', handleDragStart);
      
      // Disable text selection via mouse drag
      const handleSelectStart = (e) => {
        if (!e.target.closest('input') && !e.target.closest('textarea')) {
          e.preventDefault();
          return false;
        }
      };
      document.addEventListener('selectstart', handleSelectStart);
      
      // Disable keyboard shortcuts for copy/paste/cut
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'v', 'a'].includes(e.key.toLowerCase())) {
          if (!e.target.closest('input') && !e.target.closest('textarea')) {
            e.preventDefault();
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('selectstart', handleSelectStart);
        document.removeEventListener('keydown', handleKeyDown);
        if (styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      };
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Save test history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('testHistory', JSON.stringify(testHistory));
    } catch (error) {
      console.error('Error saving test history:', error);
    }
  }, [testHistory]);

  // Save flagged questions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flaggedQuestions', JSON.stringify(flaggedQuestions));
    } catch (error) {
      console.error('Error saving flagged questions:', error);
    }
  }, [flaggedQuestions]);

  // Timer logic - FIXED to only run during active test and when not paused
  useEffect(() => {
    if (testStarted && !studyMode && !isPaused && timeLeft > 0 && screen === 'test') {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (!studyMode && timeLeft === 0 && testStarted && screen === 'test') {
      finishTest();
    }
  }, [testStarted, timeLeft, screen, studyMode, isPaused]);

  // Memoized statistics calculation
  const detailedStats = useMemo(() => {
    if (testHistory.length === 0) return null;

    const totalTests = testHistory.length;
    const averageScore = Math.round(
      testHistory.reduce((sum, t) => sum + t.score, 0) / totalTests
    );
    const totalQuestions = testHistory.reduce((sum, t) => sum + t.total, 0);
    const totalCorrect = testHistory.reduce((sum, t) => sum + t.correct, 0);
    const bestScore = Math.max(...testHistory.map(t => t.score));
    const worstScore = Math.min(...testHistory.map(t => t.score));
    
    // Calculate recent trend (last 5 tests vs previous 5 tests)
    let trend = 'stable';
    if (totalTests >= 10) {
      const recent5 = testHistory.slice(0, 5).reduce((sum, t) => sum + t.score, 0) / 5;
      const previous5 = testHistory.slice(5, 10).reduce((sum, t) => sum + t.score, 0) / 5;
      if (recent5 > previous5 + 5) trend = 'improving';
      else if (recent5 < previous5 - 5) trend = 'declining';
    }

    return {
      totalTests,
      averageScore,
      totalQuestions,
      totalCorrect,
      bestScore,
      worstScore,
      accuracy: Math.round((totalCorrect / totalQuestions) * 100),
      trend
    };
  }, [testHistory]);

  // Memoized subject statistics
  const subjectStats = useMemo(() => {
    const stats = {};
    testHistory.forEach(test => {
      const key = test.subtopic || test.subject;
      if (!stats[key]) {
        stats[key] = { total: 0, scores: [], questions: 0, correct: 0 };
      }
      stats[key].total++;
      stats[key].scores.push(test.score);
      stats[key].questions += test.total;
      stats[key].correct += test.correct;
    });
    return stats;
  }, [testHistory]);

  const selectSubject = (subject) => {
    // Reset topic progress when selecting a different topic
    if (subject !== selectedSubject) {
      setTopicProgress(prev => ({
        ...prev,
        [subject]: 0
      }));
    }
    
    if (subjectsWithSubtopics[subject]) {
      setSelectedSubject(subject);
      setQuestionLimit({});
      setScreen('subtopics');
    } else {
      setSelectedSubject(subject);
      setScreen('questionInput');
    }
  };

  const handleQuestionLimitChange = (key, value) => {
    setQuestionLimit(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const startTest = (subject, subtopic = null, isRetake = false) => {
    try {
      // Store parent for back navigation
      if (subtopic) {
        setParentSubject(subject);
      } else {
        setParentSubject(null);
      }
      
      setSelectedSubject(subject);
      setSelectedSubtopic(subtopic);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setReviewAnswers([]);
      setIsAnswerSubmitted(false);
      setIsPaused(false);
      setIsRetakeTest(isRetake); // Track if this is a retake
      
      const questionKey = subtopic || subject;
      const allQuestions = questionBank[questionKey] || [];
      
      // Reset topic progress when selecting a DIFFERENT topic (but not on retake)
      if (!isRetake && questionKey !== (selectedSubtopic || selectedSubject)) {
        setTopicProgress(prev => ({
          ...prev,
          [questionKey]: 0
        }));
      }
      
      if (allQuestions.length === 0) {
        alert('No questions available for this topic yet.');
        return;
      }
      
      let questionsToUse;
      
      if (isRetake) {
        // Retake: use the exact same questions from last test
        questionsToUse = lastTestQuestions.length > 0 ? lastTestQuestions : shuffleArray(allQuestions).slice(0, 20);
      } else {
        // New test: filter out used questions
        const availableQuestions = allQuestions.filter(q => !usedQuestionIds.has(q.id));
        
        if (availableQuestions.length === 0) {
          // All questions used, reset
          setUsedQuestionIds(new Set());
          alert('You\'ve completed all available questions! Starting fresh with new questions.');
          questionsToUse = shuffleArray(allQuestions);
        } else {
          questionsToUse = shuffleArray(availableQuestions);
        }
        
        // Apply question limit if set
        const limit = questionLimit[questionKey];
        if (limit && !isNaN(limit) && limit > 0 && limit < questionsToUse.length) {
          questionsToUse = questionsToUse.slice(0, parseInt(limit));
        }
        
        // Save these questions for potential retake
        setLastTestQuestions(questionsToUse);
        
        // Mark these questions as used
        const newUsedIds = new Set(usedQuestionIds);
        questionsToUse.forEach(q => newUsedIds.add(q.id));
        setUsedQuestionIds(newUsedIds);
      }
      
      setSelectedQuestions(questionsToUse);
      
      const totalTime = studyMode ? 0 : questionsToUse.length * 70; // 70 seconds per question
      setTimeLeft(totalTime);
      setTotalTestTime(totalTime);
      
      setTestStarted(true);
      setScreen('test');
    } catch (error) {
      console.error('Error starting test:', error);
      alert('An error occurred while starting the test. Please try again.');
    }
  };

  const startFlaggedTest = (subject, subtopic = null) => {
    try {
      // Store parent for back navigation
      if (subtopic) {
        setParentSubject(subject);
      } else {
        setParentSubject(null);
      }
      
      setSelectedSubject(subject);
      setSelectedSubtopic(subtopic);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setReviewAnswers([]);
      setIsAnswerSubmitted(false);
      setIsPaused(false);
      
      const questionKey = subtopic || subject;
      const flaggedQs = getFlaggedQuestionsForTopic(questionKey);
      
      if (flaggedQs.length === 0) {
        alert('No flagged questions for this topic yet. Flag questions during practice to review them later!');
        return;
      }
      
      setSelectedQuestions(flaggedQs);
      
      const totalTime = studyMode ? 0 : flaggedQs.length * 90;
      setTimeLeft(totalTime);
      setTotalTestTime(totalTime);
      
      setTestStarted(true);
      setScreen('test');
    } catch (error) {
      console.error('Error starting flagged test:', error);
      alert('An error occurred while starting the test. Please try again.');
    }
  };

  const selectAnswer = (index) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
  };

  const toggleFlag = () => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const questionId = currentQuestion.id;
    
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  const nextQuestion = () => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const correctIndex = getCorrectAnswerIndex(currentQuestion);
    
    // Use selectedAnswer directly (no shuffling)
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    // Store for review
    const reviewData = {
      question: currentQuestion,
      selectedAnswer: selectedAnswer,
      correctAnswer: correctIndex,
      isCorrect: selectedAnswer === correctIndex
    };
    setReviewAnswers([...reviewAnswers, reviewData]);
    
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = (finalAnswers = answers) => {
    setTestStarted(false);
    let correct = 0;
    
    finalAnswers.forEach((answer, idx) => {
      const correctIndex = getCorrectAnswerIndex(selectedQuestions[idx]);
      if (answer === correctIndex) correct++;
    });
    
    const score = selectedQuestions.length > 0 ? Math.round((correct / selectedQuestions.length) * 100) : 0;
    const timeTaken = studyMode ? 0 : totalTestTime - timeLeft;
    
    // Update topic progress only for NEW tests (not retakes)
    // Track the highest question number reached in this topic
    if (!isRetakeTest) {
      const topicKey = selectedSubtopic || selectedSubject;
      const currentProgress = topicProgress[topicKey] || 0;
      const newProgress = currentProgress + selectedQuestions.length;
      setTopicProgress(prev => ({
        ...prev,
        [topicKey]: Math.max(currentProgress, newProgress)
      }));
    }
    
    const result = {
      subject: selectedSubject,
      subtopic: selectedSubtopic,
      score,
      correct,
      total: selectedQuestions.length,
      timeTaken,
      date: new Date().toLocaleString(),
      studyMode
    };
    
    setTestHistory([result, ...testHistory]);
    setShowReview(false);
    setScreen('results');
  };

  const exportResults = () => {
    try {
      const csv = testHistory.map(t => 
        `${t.date},${t.subject},"${t.subtopic || ''}",${t.score}%,${t.correct}/${t.total},${formatTime(t.timeTaken)},${t.studyMode ? 'Study' : 'Timed'}`
      ).join('\n');
      
      const csvContent = `Date,Subject,Topic,Score,Correct/Total,Time,Mode\n${csv}`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-history-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting results:', error);
      alert('Failed to export results. Please try again.');
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all test history? This cannot be undone.')) {
      setTestHistory([]);
      localStorage.removeItem('testHistory');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert correct answer to index (handles both letter "A" and number 0 formats)
  const getCorrectAnswerIndex = (question) => {
    if (typeof question.correct === 'number') {
      return question.correct;
    }
    // Convert letter to index: A=0, B=1, C=2, D=3
    return question.correct.charCodeAt(0) - 65;
  };

  const getFlaggedQuestionsForTopic = (topicKey) => {
    const allQuestions = questionBank[topicKey] || [];
    return allQuestions.filter(q => flaggedQuestions.includes(q.id));
  };

  // Terms Acknowledgment Modal
  if (!termsAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <TermsModal 
          showCheckbox={true}
          onAccept={() => {
            setTermsAccepted(true);
            localStorage.setItem('termsAccepted', JSON.stringify(true));
          }}
        />
      </div>
    );
  }

  // Home Screen
  if (screen === 'home') {
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          
          {/* Google Ad - Home Screen Top Banner */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-center mb-6">
              <svg className="w-12 h-12 mr-3 flex-shrink-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 C66 0 132 0 200 0 C200 66 200 132 200 200 C134 200 68 200 0 200 C0 134 0 68 0 0 Z " fill="#FEFEFE" transform="translate(0,0)"/>
                <path d="M0 0 C10.45885154 -0.61673817 18.80097348 3.08442546 28.17529297 7.18554688 C39.86836895 12.29999915 48.02367268 14.16553024 60.2421875 9.5625 C62.90168794 8.51088074 65.54164303 7.41661948 68.1796875 6.3125 C70.09529154 5.53902969 72.01177613 4.76773114 73.9296875 4 C74.66703125 3.69449219 75.404375 3.38898437 76.1640625 3.07421875 C83.54977394 0.28310687 92.54717323 0.00463977 100.140625 2.1484375 C106.8401249 5.21990053 111.86097633 9.99969722 115.3515625 16.4921875 C116.52751027 20.49706624 116.46910405 24.28562352 116.4296875 28.4375 C116.43742188 29.22898437 116.44515625 30.02046875 116.453125 30.8359375 C116.41824934 41.64739216 113.93349434 50.82972301 109.6171875 60.6875 C108.95662354 62.23691284 108.95662354 62.23691284 108.28271484 63.81762695 C106.10343389 68.91808003 103.88011713 73.99918918 101.66015625 79.08203125 C94.99760657 94.37422088 89.69485085 109.43418719 87.5390625 126.08203125 C85.70781807 140.14191907 83.21124511 155.28094239 72.7421875 165.75 C70.1796875 167.3125 70.1796875 167.3125 67.6171875 167.625 C63.55123173 165.4356392 62.59389901 161.56591085 61.1796875 157.3125 C60.12191201 152.36707002 59.38816609 147.3803951 58.6796875 142.375 C56.90706011 127.59073766 56.90706011 127.59073766 49.9921875 114.75 C46.0809495 112.7509228 42.57443978 111.98696279 38.1796875 112.3125 C33.68919687 114.47458808 31.27285142 116.81219757 29.1796875 121.3125 C27.10905108 127.32682944 26.70948307 133.11618348 26.3046875 139.4375 C24.70777101 160.78441649 24.70777101 160.78441649 19.1796875 166.3125 C15.74877794 166.44445806 13.30455018 166.25682917 10.59765625 163.984375 C0.87088462 152.17879466 -1.42373194 136.07165002 -4.328125 121.5703125 C-4.82313279 119.15055192 -5.32063402 116.7313004 -5.8203125 114.3125 C-5.95005463 113.66527985 -6.07979675 113.01805969 -6.21347046 112.35122681 C-8.85049261 99.3693109 -13.40544553 87.48395733 -18.4050293 75.24829102 C-25.56091238 57.64691876 -31.87191369 37.72834845 -26.859375 18.65625 C-23.23148977 10.35195779 -16.95559964 5.12057373 -8.7890625 1.3828125 C-5.89437868 0.48742301 -3.00312289 0.332756 0 0 Z " fill="#FDFDFD" transform="translate(55.8203125,16.6875)"/>
                <path d="M0 0 C10.45885154 -0.61673817 18.80097348 3.08442546 28.17529297 7.18554688 C39.86836895 12.29999915 48.02367268 14.16553024 60.2421875 9.5625 C62.90168794 8.51088074 65.54164303 7.41661948 68.1796875 6.3125 C70.09529154 5.53902969 72.01177613 4.76773114 73.9296875 4 C74.66703125 3.69449219 75.404375 3.38898437 76.1640625 3.07421875 C83.54977394 0.28310687 92.54717323 0.00463977 100.140625 2.1484375 C106.8401249 5.21990053 111.86097633 9.99969722 115.3515625 16.4921875 C116.52751027 20.49706624 116.46910405 24.28562352 116.4296875 28.4375 C116.43742188 29.22898437 116.44515625 30.02046875 116.453125 30.8359375 C116.41824934 41.64739216 113.93349434 50.82972301 109.6171875 60.6875 C108.95662354 62.23691284 108.95662354 62.23691284 108.28271484 63.81762695 C106.10343389 68.91808003 103.88011713 73.99918918 101.66015625 79.08203125 C94.99760657 94.37422088 89.69485085 109.43418719 87.5390625 126.08203125 C85.70781807 140.14191907 83.21124511 155.28094239 72.7421875 165.75 C70.1796875 167.3125 70.1796875 167.3125 67.6171875 167.625 C63.55123173 165.4356392 62.59389901 161.56591085 61.1796875 157.3125 C60.12191201 152.36707002 59.38816609 147.3803951 58.6796875 142.375 C56.90706011 127.59073766 56.90706011 127.59073766 49.9921875 114.75 C46.0809495 112.7509228 42.57443978 111.98696279 38.1796875 112.3125 C33.68919687 114.47458808 31.27285142 116.81219757 29.1796875 121.3125 C27.10905108 127.32682944 26.70948307 133.11618348 26.3046875 139.4375 C24.70777101 160.78441649 24.70777101 160.78441649 19.1796875 166.3125 C15.74877794 166.44445806 13.30455018 166.25682917 10.59765625 163.984375 C0.87088462 152.17879466 -1.42373194 136.07165002 -4.328125 121.5703125 C-4.82313279 119.15055192 -5.32063402 116.7313004 -5.8203125 114.3125 C-5.95005463 113.66527985 -6.07979675 113.01805969 -6.21347046 112.35122681 C-8.85049261 99.3693109 -13.40544553 87.48395733 -18.4050293 75.24829102 C-25.56091238 57.64691876 -31.87191369 37.72834845 -26.859375 18.65625 C-23.23148977 10.35195779 -16.95559964 5.12057373 -8.7890625 1.3828125 C-5.89437868 0.48742301 -3.00312289 0.332756 0 0 Z M-19.2578125 12.5 C-25.72271705 20.51909373 -26.55685007 28.24694854 -25.8203125 38.3125 C-24.24651683 51.66951711 -20.13771604 63.58538255 -15.2578125 76.0625 C-14.56436636 77.86925923 -13.87230181 79.67654935 -13.18164062 81.484375 C-11.04763901 87.05575883 -8.91192648 92.62662187 -6.66552734 98.15380859 C-5.50827636 101.10944498 -4.77296679 104.10734698 -4.0078125 107.1875 C-3.83894531 107.86659424 -3.67007813 108.54568848 -3.49609375 109.24536133 C-2.21690598 114.47508415 -1.07554417 119.72963973 0.04150391 124.99609375 C3.29003518 144.65584796 3.29003518 144.65584796 13.1796875 161.3125 C15.78281941 162.09567932 15.78281941 162.09567932 18.1796875 162.3125 C21.46766979 154.69035924 22.4339316 147.09269269 23.49121094 138.89794922 C23.83397888 136.26360369 24.19432671 133.63198993 24.5546875 131 C24.65652344 130.16436523 24.75835937 129.32873047 24.86328125 128.46777344 C25.82006439 121.55309067 27.6623322 115.70998124 32.8046875 110.8125 C38.46001622 108.29902057 43.62130199 108.54015721 49.4921875 110.3125 C57.3593705 116.16714781 59.67496732 126.29533231 61.05859375 135.56640625 C61.29447797 137.33488632 61.52233299 139.1044557 61.7421875 140.875 C62.80247138 152.64078712 62.80247138 152.64078712 67.1796875 163.3125 C70.4538497 163.06996947 71.33005603 162.15292156 73.63110352 159.7109375 C76.25026732 156.45180222 77.86672509 152.9817076 79.26953125 149.0625 C79.5221019 148.37140137 79.77467255 147.68030273 80.03489685 146.96826172 C82.84275526 138.93285231 84.30387973 130.68018761 85.7421875 122.3125 C88.69082221 105.38895987 93.06024006 90.1305028 100.25653076 74.5149231 C112.92253358 47.17942844 112.92253358 47.17942844 112.48046875 17.65234375 C109.91343924 11.85757249 105.28533017 8.06808883 99.5546875 5.5 C86.86405847 1.29396295 76.22461432 6.45758456 64.83422852 11.66259766 C63.95822998 12.06269043 63.08223145 12.4627832 62.1796875 12.875 C61.30820068 13.27380371 60.43671387 13.67260742 59.53881836 14.08349609 C51.80312445 17.57863988 44.74838391 20.3125 36.1796875 20.3125 C39.4796875 19.3225 42.7796875 18.3325 46.1796875 17.3125 C46.1796875 16.9825 46.1796875 16.6525 46.1796875 16.3125 C45.4990625 16.17714844 44.8184375 16.04179688 44.1171875 15.90234375 C36.19607603 14.14326713 29.17860685 11.29816476 21.84375 7.93359375 C8.40967013 1.90903216 -8.44781224 1.3387723 -19.2578125 12.5 Z " fill="#171717" transform="translate(55.8203125,16.6875)"/>
                <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.81824219 1.92296875 2.63648438 2.8459375 2.44921875 3.796875 C2.19445933 5.11441865 1.9406362 6.43214352 1.6875 7.75 C1.48120972 8.81734375 1.48120972 8.81734375 1.27075195 9.90625 C0.51574303 13.91224361 -0.14237329 17.90872496 -0.65625 21.953125 C-2.45043921 35.94020061 -5.03759455 51.03759455 -15.4375 61.4375 C-18 63 -18 63 -20.625 63.1875 C-24.21942702 61.39028649 -24.73258725 58.66882638 -26 55 C-25.34 55 -24.68 55 -24 55 C-23.67 54.34 -23.34 53.68 -23 53 C-22.34 54.65 -21.68 56.3 -21 58 C-18.07015572 57.68608811 -17.08246257 57.08891688 -15.04736328 54.89453125 C-12.79212071 51.7061034 -11.32621021 48.51477661 -9.9921875 44.875 C-9.73613739 44.18269287 -9.48008728 43.49038574 -9.21627808 42.77709961 C-6.24950676 34.38336452 -4.68925782 25.74144077 -3.125 17 C-2.81643459 15.33829407 -2.50654443 13.67683357 -2.1953125 12.015625 C-1.44832369 8.0130656 -0.71904567 4.00766936 0 0 Z " fill="#151515" transform="translate(144,121)"/>
                <path d="M0 0 C1 3 1 3 -0.375 5.9375 C-0.91125 6.948125 -1.4475 7.95875 -2 9 C-5.39259722 19.83369379 -2.02160098 32.16999473 0 43 C-0.99 43 -1.98 43 -3 43 C-5.28251066 34.79383073 -6.31850311 27.05272693 -6.375 18.5625 C-6.39530273 17.30324707 -6.39530273 17.30324707 -6.41601562 16.01855469 C-6.37728657 10.61585085 -5.61572954 6.7586629 -3 2 C-2.01 1.34 -1.02 0.68 0 0 Z " fill="#0D0D0D" transform="translate(34,30)"/>
                <path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C1.66 2 2.32 2 3 2 C2.86722656 3.09957031 2.73445313 4.19914063 2.59765625 5.33203125 C2.41904956 6.82549439 2.24068021 8.31898592 2.0625 9.8125 C1.9696875 10.58480957 1.876875 11.35711914 1.78125 12.15283203 C1.16085133 17.39454548 0.67002537 22.62909026 0.34375 27.8984375 C0 30 0 30 -2 33 C-2.66 33 -3.32 33 -4 33 C-3.59481483 28.94281191 -3.18577013 24.88603312 -2.77319336 20.82958984 C-2.63346746 19.45046445 -2.49478434 18.07123299 -2.35717773 16.69189453 C-2.15885233 14.70577663 -1.95642733 12.72006946 -1.75390625 10.734375 C-1.63345947 9.54038086 -1.5130127 8.34638672 -1.38891602 7.11621094 C-1.08120422 4.65065327 -0.68306304 2.38169905 0 0 Z " fill="#171717" transform="translate(81,138)"/>
                <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.79503906 2.05058594 2.59007812 3.10117188 2.37890625 4.18359375 C0.97969748 11.4432316 -0.34177736 18.62790642 -1 26 C-1.33 26 -1.66 26 -2 26 C-3.40635636 16.74854733 -2.36143272 9.01880517 0 0 Z " fill="#2D2D2D" transform="translate(144,121)"/>
                <path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C1.66 2 2.32 2 3 2 C2.34 7.61 1.68 13.22 1 19 C0.67 19 0.34 19 0 19 C-1.03907986 12.76552084 -2.04370614 6.13111842 0 0 Z " fill="#313131" transform="translate(81,138)"/>
                <path d="M0 0 C1.32 0.33 2.64 0.66 4 1 C4.66 3.64 5.32 6.28 6 9 C5.01 9.33 4.02 9.66 3 10 C2.01 6.7 1.02 3.4 0 0 Z " fill="#242424" transform="translate(31,73)"/>
                <path d="M0 0 C0.66 0 1.32 0 2 0 C2 3.96 2 7.92 2 12 C1.01 11.34 0.02 10.68 -1 10 C-0.67 6.7 -0.34 3.4 0 0 Z " fill="#272727" transform="translate(140,141)"/>
                <path d="M0 0 C0.33 0 0.66 0 1 0 C1.66 3.63 2.32 7.26 3 11 C2.01 11 1.02 11 0 11 C-0.66 8.03 -1.32 5.06 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#181818" transform="translate(31,62)"/>
                <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.34 4.96 1.68 8.92 1 13 C0.67 13 0.34 13 0 13 C-0.19658808 11.58456585 -0.38187546 10.16755969 -0.5625 8.75 C-0.66691406 7.96109375 -0.77132812 7.1721875 -0.87890625 6.359375 C-1.00027349 3.99467126 -0.69633257 2.2488963 0 0 Z " fill="#505050" transform="translate(144,121)"/>
                <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C3.33 3.97 3.66 6.94 4 10 C3.34 10 2.68 10 2 10 C1.34 6.7 0.68 3.4 0 0 Z " fill="#0D0D0D" transform="translate(46,111)"/>
                <path d="M0 0 C1 3 1 3 -0.4375 6.1875 C-1.2109375 7.5796875 -1.2109375 7.5796875 -2 9 C-2.99 9 -3.98 9 -5 9 C-4.5206753 4.68607774 -3.2542015 2.83430453 0 0 Z " fill="#131313" transform="translate(34,30)"/>
                <path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C1.66 2.33 2.32 2.66 3 3 C2.01 5.31 1.02 7.62 0 10 C-0.33 10 -0.66 10 -1 10 C-0.67 6.7 -0.34 3.4 0 0 Z " fill="#1F1F1F" transform="translate(146,113)"/>
                <path d="M0 0 C2.35953094 2.35953094 2.49141413 3.77895617 3 7 C2.01 7.33 1.02 7.66 0 8 C-1.125 2.25 -1.125 2.25 0 0 Z " fill="#212121" transform="translate(45,104)"/>
              </svg>
              <div>
                <div className="text-xs text-gray-500 mb-1 text-left">Ontario</div>
                <h1 className="text-2xl font-bold text-gray-800 text-center">Dental Hygiene Test Bank</h1>
              </div>
            </div>
            
            {detailedStats && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Your Progress</span>
                  {detailedStats.trend === 'improving' && <TrendingUp className="w-4 h-4 text-green-600" />}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{detailedStats.averageScore}%</div>
                    <div className="text-xs text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{detailedStats.totalTests}</div>
                    <div className="text-xs text-gray-600">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{detailedStats.accuracy}%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>
            )}

            <p className="text-gray-600 text-center mb-4">
              Select a lecture to view subjects
            </p>

            <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
              {Object.keys(subjectsByLesson).map((lesson, index) => {
                const subjectCount = subjectsByLesson[lesson].length;
                
                return (
                  <button
                    key={index}
                    onClick={() => selectSubject(lesson)}
                    className="w-full text-left py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-800"
                  >
                    <span className="text-sm font-bold">{lesson}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-blue-600 mr-2">{subjectCount} subjects</span>
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setScreen('progress')}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Progress</p>
            </button>
            <button
              onClick={() => setScreen('history')}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">History</p>
            </button>
          </div>
          
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
      </ScreenWithTerms>
    );
  }

  // Question Input Screen
  if (screen === 'questionInput') {
    const totalQuestions = questionBank[selectedSubject]?.length || 0;
    const currentLimit = questionLimit[selectedSubject] || '';
    const flaggedCount = getFlaggedQuestionsForTopic(selectedSubject).length;
    
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          
          {/* Google Ad - Subject Selection Screen */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => {
                  // Always go back to home from topic selection
                  setScreen('home');
                }}
                className="mr-3 text-blue-600 hover:text-blue-700"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedSubject}</h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Total available questions: <span className="font-bold text-blue-600">{totalQuestions}</span>
                {flaggedCount > 0 && (
                  <span className="ml-2 text-yellow-600 font-semibold">
                    • {flaggedCount} flagged
                  </span>
                )}
              </p>
              
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How many questions do you want to practice?
              </label>
              <input
                type="number"
                min="1"
                max={totalQuestions}
                value={currentLimit}
                onChange={(e) => handleQuestionLimitChange(selectedSubject, e.target.value)}
                placeholder={`Enter 1-${totalQuestions}`}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                aria-label="Number of questions"
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to practice all {totalQuestions} questions
              </p>
            </div>

            <div className="mb-6">
              <label className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl cursor-pointer hover:from-green-100 hover:to-blue-100 transition-all">
                <input
                  type="checkbox"
                  checked={studyMode}
                  onChange={(e) => setStudyMode(e.target.checked)}
                  className="mr-3 w-5 h-5 text-blue-600"
                />
                <div>
                  <div className="font-semibold text-gray-800">Study Mode</div>
                  <div className="text-xs text-gray-600">No timer, instant feedback on each question</div>
                </div>
              </label>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => startTest(selectedSubject, null)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start {studyMode ? 'Study Session' : 'Test'}
              </button>

              {flaggedCount > 0 && (
                <button
                  onClick={() => startFlaggedTest(selectedSubject, null)}
                  className="w-full bg-yellow-50 border-2 border-yellow-300 text-yellow-700 py-4 rounded-xl font-semibold hover:bg-yellow-100 transition-all flex items-center justify-center"
                >
                  <Flag className="w-5 h-5 mr-2" fill="currentColor" />
                  Practice {flaggedCount} Flagged Question{flaggedCount !== 1 ? 's' : ''}
                </button>
              )}
            </div>
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
      </ScreenWithTerms>
    );
  }

  // Subtopics Screen
  if (screen === 'subtopics') {
    const subtopics = subjectsWithSubtopics[selectedSubject];
    const isLesson = selectedSubject.startsWith('Lesson');
    
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          
          {/* Google Ad - Topic Selection Screen */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => {
                  // Find which lesson this subject belongs to
                  const parentLesson = Object.entries(subjectsByLesson).find(([lesson, subjects]) => 
                    subjects.includes(selectedSubject)
                  );
                  
                  if (parentLesson) {
                    // Go back to the lesson's subject list
                    setSelectedSubject(parentLesson[0]);
                    setScreen('subtopics');
                  } else {
                    // If no parent lesson found, go to home
                    setScreen('home');
                  }
                }}
                className="mr-3 text-blue-600 hover:text-blue-700"
                aria-label="Back to subjects"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedSubject}</h2>
            </div>

            <div className="mb-6">
              <label className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl cursor-pointer hover:from-green-100 hover:to-blue-100 transition-all">
                <input
                  type="checkbox"
                  checked={studyMode}
                  onChange={(e) => setStudyMode(e.target.checked)}
                  className="mr-3 w-5 h-5 text-blue-600"
                />
                <div>
                  <div className="font-semibold text-gray-800">Study Mode</div>
                  <div className="text-xs text-gray-600">No timer, instant feedback</div>
                </div>
              </label>
            </div>

            <p className="text-gray-600 mb-6">
              {isLesson ? 'Select a subject to start your test' : 'Select a topic to start your test'}
            </p>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {subtopics.map((subtopic, index) => {
                const hasQuestions = questionBank[subtopic]?.length > 0;
                const questionCount = questionBank[subtopic]?.length || 0;
                const currentLimit = questionLimit[subtopic] || '';
                const flaggedCount = getFlaggedQuestionsForTopic(subtopic).length;
                
                // Check if this subtopic has its own subtopics (like Pathophysiology)
                const hasSubSubtopics = subjectsWithSubtopics[subtopic];
                
                return (
                  <div key={index} className="space-y-2">
                    <div className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all ${
                      hasQuestions || hasSubSubtopics
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50'
                        : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm ${hasQuestions || hasSubSubtopics ? 'text-gray-800' : 'text-gray-400'}`}>{subtopic}</span>
                        <div className="flex items-center gap-2">
                          {hasSubSubtopics ? (
                            <button
                              onClick={() => selectSubject(subtopic)}
                              className="flex items-center text-xs text-blue-600 hover:text-blue-700"
                            >
                              <span className="mr-1">{subjectsWithSubtopics[subtopic].length} topics</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : hasQuestions ? (
                            <>
                              <span className="text-xs text-blue-600">{questionCount} Q</span>
                              {flaggedCount > 0 && (
                                <span className="text-xs text-yellow-600 flex items-center">
                                  <Flag className="w-3 h-3 mr-1" fill="currentColor" />
                                  {flaggedCount}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">Coming soon</span>
                          )}
                        </div>
                      </div>
                      
                      {hasQuestions && !hasSubSubtopics && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="1"
                              max={questionCount}
                              value={currentLimit}
                              onChange={(e) => handleQuestionLimitChange(subtopic, e.target.value)}
                              placeholder={`Max ${questionCount}`}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Number of questions for ${subtopic}`}
                            />
                            <button
                              onClick={() => startTest(selectedSubject, subtopic)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center"
                              aria-label={`Start test for ${subtopic}`}
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                          {flaggedCount > 0 && (
                            <button
                              onClick={() => startFlaggedTest(selectedSubject, subtopic)}
                              className="w-full bg-yellow-50 border-2 border-yellow-300 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-all flex items-center justify-center text-sm font-semibold"
                              aria-label={`Practice ${flaggedCount} flagged questions`}
                            >
                              <Flag className="w-4 h-4 mr-2" fill="currentColor" />
                              Practice {flaggedCount} Flagged Question{flaggedCount !== 1 ? 's' : ''}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
      </ScreenWithTerms>
    );
  }

  // Test Screen
  if (screen === 'test') {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const showAdBetweenQuestions = currentQuestionIndex > 0 && !isAnswerSubmitted;
    
    if (!currentQuestion) {
      return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md sm:max-w-2xl lg:max-w-4xl">
            <p className="text-gray-700 text-center">No questions available for this subject yet.</p>
            <button
              onClick={() => setScreen('home')}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
        </ScreenWithTerms>
      );
    }
    
    const isCorrect = selectedAnswer === getCorrectAnswerIndex(currentQuestion);
    const isFlagged = flaggedQuestions.includes(currentQuestion.id);
    
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          
          {/* Google Ad - Show every 5 questions */}
          {showAdBetweenQuestions && (
            <GoogleAd slot="5701429538019796" format="rectangle" className="mb-4" />
          )}
          
          <div className="bg-white rounded-t-3xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="w-6"></div> {/* Spacer to maintain layout */}
              {!studyMode && (
                <div className="flex items-center">
                  <Clock className={`w-5 h-5 mr-2 ${timeLeft < 60 ? 'text-red-600' : isPaused ? 'text-gray-400' : 'text-blue-600'}`} />
                  <span className={`font-bold ${timeLeft < 60 && !isPaused ? 'text-red-600' : isPaused ? 'text-gray-400' : 'text-gray-700'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              {studyMode && <div className="text-sm font-semibold text-green-600">Study Mode</div>}
              <div className="text-sm font-semibold text-gray-600">
                {currentQuestionIndex + 1}/{selectedQuestions.length}
              </div>
            </div>
            
            {/* Test Progress Bar (for current test session) */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Test Progress</span>
                <span className="font-semibold">
                  {currentQuestionIndex + 1} / {selectedQuestions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Topic Progress Bar (overall topic progress) */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Topic Progress</span>
                <span className="font-semibold">
                  {(topicProgress[selectedSubtopic || selectedSubject] || 0) + currentQuestionIndex + 1} / {(questionBank[selectedSubtopic || selectedSubject] || []).length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all"
                  style={{ 
                    width: `${(((topicProgress[selectedSubtopic || selectedSubject] || 0) + currentQuestionIndex + 1) / (questionBank[selectedSubtopic || selectedSubject] || []).length) * 100}%` 
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>{selectedSubject}{selectedSubtopic ? ` • ${selectedSubtopic}` : ''}</span>
              <div className="flex items-center gap-2">
                {!studyMode && (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`flex items-center ${isPaused ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 transition-colors`}
                    aria-label={isPaused ? 'Resume test' : 'Pause test'}
                  >
                    <Pause className="w-4 h-4 mr-1" fill={isPaused ? 'currentColor' : 'none'} />
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                )}
                <button
                  onClick={toggleFlag}
                  className={`flex items-center ${isFlagged ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600 transition-colors`}
                  aria-label={isFlagged ? 'Unflag question' : 'Flag question'}
                >
                  <Flag className="w-4 h-4 mr-1" fill={isFlagged ? 'currentColor' : 'none'} />
                  {isFlagged ? 'Flagged' : 'Flag'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-b-3xl shadow-2xl p-6 mb-4 relative">
            {/* Blur overlay when paused */}
            {isPaused && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-b-3xl z-10 flex items-center justify-center">
                <div className="text-center px-6">
                  <Pause className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Test Paused</h3>
                  <p className="text-gray-600 mb-6">Timer is stopped</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsPaused(false)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Resume Test
                    </button>
                    <button
                      onClick={() => {
                        setTestStarted(false);
                        setIsPaused(false);
                        
                        // Navigate back to appropriate screen
                        if (selectedSubtopic && parentSubject) {
                          setSelectedSubject(parentSubject);
                          setScreen('subtopics');
                        } 
                        else if (subjectsWithSubtopics[selectedSubject]) {
                          setScreen('subtopics');
                        } 
                        else {
                          setScreen('home');
                        }
                      }}
                      className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back to Topics
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex-1 no-select">
                {currentQuestion.question}
              </h2>
              <CopyButton 
                text={`${currentQuestion.question}\n\nA. ${currentQuestion.options[0]}\nB. ${currentQuestion.options[1]}\nC. ${currentQuestion.options[2]}\nD. ${currentQuestion.options[3]}`}
                className="ml-2 flex-shrink-0"
              />
            </div>

            <div className="space-y-3 no-select">
              {currentQuestion.options.map((option, index) => {
                const correctIndex = getCorrectAnswerIndex(currentQuestion);
                const isThisCorrect = index === correctIndex;
                const isSelected = selectedAnswer === index;
                
                let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                
                if (isAnswerSubmitted) {
                  if (isThisCorrect) {
                    buttonClass = 'bg-green-100 border-2 border-green-300';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-100 border-2 border-red-300';
                  } else {
                    buttonClass = 'bg-gray-50 text-gray-400';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-blue-600 text-white shadow-lg scale-105';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    onKeyPress={(e) => e.key === 'Enter' && selectAnswer(index)}
                    disabled={isAnswerSubmitted || isPaused}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Answer ${String.fromCharCode(65 + index)}: ${option}`}
                    tabIndex={0}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all ${buttonClass} ${isAnswerSubmitted || isPaused ? 'cursor-default' : ''}`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                      <span className="flex-1">{option}</span>
                      {isAnswerSubmitted && isThisCorrect && <span className="ml-auto text-green-600 font-semibold">✓ Correct Answer</span>}
                      {isAnswerSubmitted && isSelected && !isCorrect && <span className="ml-auto text-red-600 font-semibold">✗ Your Answer</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Study Mode: Show Previous and Back to Topics buttons */}
            {studyMode && (
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                      setSelectedAnswer(null);
                      setIsAnswerSubmitted(false);
                    }
                  }}
                  disabled={currentQuestionIndex === 0}
                  className={`py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center ${
                    currentQuestionIndex > 0
                      ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={() => {
                    setTestStarted(false);
                    setIsPaused(false);
                    
                    // Navigate back to appropriate screen
                    if (selectedSubtopic && parentSubject) {
                      setSelectedSubject(parentSubject);
                      setScreen('subtopics');
                    } 
                    else if (subjectsWithSubtopics[selectedSubject]) {
                      setScreen('subtopics');
                    } 
                    else {
                      setScreen('home');
                    }
                  }}
                  className="bg-gradient-to-r from-pink-300 to-rose-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Topics
                </button>
              </div>
            )}

            {/* Normal Submit/Next button (Test Mode and Study Mode after answer submitted) */}
            <button
              onClick={isAnswerSubmitted ? nextQuestion : submitAnswer}
              disabled={selectedAnswer === null || isPaused}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all ${
                selectedAnswer !== null && !isPaused
                  ? isAnswerSubmitted 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnswerSubmitted 
                ? (currentQuestionIndex === selectedQuestions.length - 1 ? 'Finish Test' : 'Next Question')
                : 'Submit Answer'
              }
            </button>
          </div>
          
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }

  // Review Screen
  if (screen === 'review') {
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Answer Review</h2>
              <button 
                onClick={() => setScreen('results')}
                className="text-blue-600 hover:text-blue-700"
                aria-label="Back to results"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {reviewAnswers.map((review, index) => {
                const questionId = review.question.id;
                const isFlagged = flaggedQuestions.includes(questionId);
                
                return (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl border-2 ${
                    review.isCorrect 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-800 flex-1 no-select">
                      Question {index + 1}: {review.question.question}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <button
                        onClick={() => {
                          if (isFlagged) {
                            setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
                          } else {
                            setFlaggedQuestions([...flaggedQuestions, questionId]);
                          }
                        }}
                        className={`flex items-center ${isFlagged ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600 transition-colors`}
                        aria-label={isFlagged ? 'Unflag question' : 'Flag question'}
                      >
                        <Flag className="w-5 h-5" fill={isFlagged ? 'currentColor' : 'none'} />
                      </button>
                      <CopyButton 
                        text={`Question ${index + 1}: ${review.question.question}\n\nA. ${review.question.options[0]}\nB. ${review.question.options[1]}\nC. ${review.question.options[2]}\nD. ${review.question.options[3]}\n\nCorrect Answer: ${String.fromCharCode(65 + review.correctAnswer)}`}
                      />
                      {review.isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-3 no-select">
                    {review.question.options.map((option, optIndex) => {
                      const isCorrect = optIndex === review.correctAnswer;
                      const wasSelected = optIndex === review.selectedAnswer;
                      
                      return (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg ${
                            isCorrect
                              ? 'bg-green-100 border-2 border-green-300'
                              : wasSelected && !isCorrect
                              ? 'bg-red-100 border-2 border-red-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                            <span className="flex-1">{option}</span>
                            {isCorrect && <span className="ml-auto text-green-600 font-semibold">✓ Correct Answer</span>}
                            {wasSelected && !isCorrect && <span className="ml-auto text-red-600 font-semibold">✗ Your Answer</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
              })}
            </div>

            <button
              onClick={() => setScreen('results')}
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Back to Results
            </button>
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }

  // Results Screen
  if (screen === 'results') {
    const lastResult = testHistory[0];
    
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="text-center mb-6">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {lastResult.studyMode ? 'Study Session Complete!' : 'Test Complete!'}
              </h2>
              <p className="text-gray-600">{lastResult.subject}</p>
              {lastResult.subtopic && <p className="text-sm text-gray-500">{lastResult.subtopic}</p>}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {lastResult.score}%
                </div>
                <p className="text-gray-600">Your Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{lastResult.correct}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{lastResult.total - lastResult.correct}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
              </div>

              {!lastResult.studyMode && (
                <div className="mt-4 text-center text-gray-600">
                  <Clock className="w-5 h-5 inline mr-2" />
                  Time: {formatTime(lastResult.timeTaken)}
                </div>
              )}
            </div>

            {/* Google Ad - Results Screen */}
            <GoogleAd slot="5701429538019796" format="rectangle" className="my-6" />

            <div className="space-y-3">
              {reviewAnswers.length > 0 && (
                <button
                  onClick={() => setScreen('review')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Review Answers
                </button>
              )}
              <button
                onClick={() => startTest(selectedSubject, selectedSubtopic, true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Retake Test (Same Questions)
              </button>
              <button
                onClick={() => startTest(selectedSubject, selectedSubtopic, false)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 mr-2" />
                Next Test (New Questions)
              </button>
              {selectedSubtopic && (
                <button
                  onClick={() => setScreen('subtopics')}
                  className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Back to Topics
                </button>
              )}
              <button
                onClick={() => setScreen('home')}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }

  // Progress Screen
  if (screen === 'progress') {
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Progress Analytics</h2>
              <button onClick={() => setScreen('home')} className="text-blue-600" aria-label="Back to home">
                <Home className="w-6 h-6" />
              </button>
            </div>

            {detailedStats && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Overall Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{detailedStats.averageScore}%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">{detailedStats.totalTests}</div>
                    <div className="text-sm text-gray-600">Tests Taken</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{detailedStats.bestScore}%</div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">{detailedStats.accuracy}%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>
                
                {detailedStats.trend !== 'stable' && (
                  <div className={`mt-4 p-3 rounded-xl flex items-center justify-center ${
                    detailedStats.trend === 'improving' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <TrendingUp className={`w-5 h-5 mr-2 ${detailedStats.trend === 'declining' ? 'rotate-180' : ''}`} />
                    <span className="font-semibold">
                      Your scores are {detailedStats.trend}!
                    </span>
                  </div>
                )}
              </div>
            )}

            {Object.keys(subjectStats).length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No test data yet. Take a test to see your progress!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-450px)] overflow-y-auto">
                <h3 className="font-bold text-gray-800 mb-3">Subject Breakdown</h3>
                {Object.entries(subjectStats).map(([subject, stats]) => {
                  const avgScore = Math.round(stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length);
                  const accuracy = Math.round((stats.correct / stats.questions) * 100);
                  
                  return (
                    <div key={subject} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                      <h3 className="font-bold text-gray-800 mb-3">{subject}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Average Score</span>
                        <span className="text-2xl font-bold text-blue-600">{avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                          style={{ width: `${avgScore}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-gray-600">Tests</div>
                          <div className="font-bold text-gray-800">{stats.total}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Questions</div>
                          <div className="font-bold text-gray-800">{stats.questions}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Accuracy</div>
                          <div className="font-bold text-gray-800">{accuracy}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }

  // History Screen
  if (screen === 'history') {
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Test History</h2>
              <button onClick={() => setScreen('home')} className="text-blue-600" aria-label="Back to home">
                <Home className="w-6 h-6" />
              </button>
            </div>

            {testHistory.length > 0 && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={exportResults}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
                <button
                  onClick={clearHistory}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Clear All
                </button>
              </div>
            )}

            {testHistory.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No test history yet. Start taking tests!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                {testHistory.map((test, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800">{test.subject}</h3>
                          {test.studyMode && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Study
                            </span>
                          )}
                        </div>
                        {test.subtopic && <p className="text-sm text-gray-600">{test.subtopic}</p>}
                        <p className="text-xs text-gray-500">{test.date}</p>
                      </div>
                      <div className={`text-2xl font-bold ${test.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                        {test.score}%
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{test.correct}/{test.total} correct</span>
                      {!test.studyMode && <span>{formatTime(test.timeTaken)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }
}
