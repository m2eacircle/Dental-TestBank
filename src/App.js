import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Clock, Trophy, BarChart3, CheckCircle, XCircle, Home, Play, ArrowLeft, ChevronRight, Download, Flag, Eye, TrendingUp, Pause, X, Copy } from 'lucide-react';

// Import everything from centralized index
import { subjectsWithSubtopics, allQuestions } from './questions/index.js';

// Use imported data from index.js
const subjectsByLesson = subjectsWithSubtopics;
const questionBank = allQuestions;

// Define which keys are top-level lessons (for main screen display)
const mainLessons = ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Board Exam"];


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

// AI Assistant Button Component
// Copy Button Component - Simple copy to clipboard
const CopyButton = ({ question, options, className = "" }) => {
  const [copied, setCopied] = useState(false);
  
  const formatQuestionForCopy = () => {
    const optionsText = options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n');
    return `${question}\n\n${optionsText}`;
  };
  
  const handleCopy = () => {
    const text = formatQuestionForCopy();
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
      title="Copy question to clipboard"
    >
      <Copy className={`w-5 h-5 ${copied ? 'text-green-600' : 'text-gray-600'}`} />
    </button>
  );
};

// AI Assistant Panel Component - Shows after submitting answer
const AIAssistantPanel = ({ question, options, show }) => {
  const formatQuestionForAI = useCallback(() => {
    const optionsText = options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n');
    return `${question}\n\n${optionsText}`;
  }, [question, options]);
  
  // AI Assistant configurations
  const aiAssistants = [
    {
      name: 'Claude',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#CC9B7A"/>
          <path d="M7 12L10 9L13 12L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 15L10 12L13 15L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
      getUrl: (text) => `https://claude.ai/new?q=${encodeURIComponent(text)}`,
    },
    {
      name: 'ChatGPT',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#10A37F"/>
          <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      getUrl: (text) => `https://chat.openai.com/?q=${encodeURIComponent(text)}`,
    },
    {
      name: 'Gemini',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#4285F4"/>
          <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white"/>
        </svg>
      ),
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      getUrl: (text) => `https://gemini.google.com/app`,
    },
    {
      name: 'Copilot',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0078D4"/>
          <path d="M7 9L12 6L17 9V15L12 18L7 15V9Z" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      color: 'bg-sky-50 hover:bg-sky-100 border-sky-200',
      getUrl: (text) => `https://copilot.microsoft.com/`,
    }
  ];
  
  const handleAIClick = (assistant) => {
    const questionText = formatQuestionForAI();
    
    // Copy to clipboard
    navigator.clipboard.writeText(questionText).catch(err => {
      console.error('Copy failed:', err);
    });
    
    // Open AI assistant
    const url = assistant.getUrl(questionText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  // Auto-copy when panel shows
  useEffect(() => {
    if (show && question && options) {
      const questionText = formatQuestionForAI();
      navigator.clipboard.writeText(questionText).catch(err => {
        console.error('Auto-copy failed:', err);
      });
    }
  }, [show, question, options, formatQuestionForAI]);
  
  if (!show) return null;
  
  return (
    <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
      <div className="text-sm font-semibold text-gray-700 mb-3 text-center">
        ASK AI ASSISTANT
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        {aiAssistants.map((assistant) => (
          <button
            key={assistant.name}
            onClick={() => handleAIClick(assistant)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all ${assistant.color}`}
          >
            {assistant.icon}
            <span className="font-medium text-gray-700 text-sm">{assistant.name}</span>
          </button>
        ))}
      </div>
      
      <p className="text-xs text-gray-600 text-center">
        Question sent automatically and copied to clipboard
      </p>
    </div>
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

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9038637277741137"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Add Terms Modal Component
const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Terms and Conditions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <section>
            <h3 className="font-bold text-lg mb-2">1. Content Usage</h3>
            <p>This test bank is provided for educational purposes only. All content is protected by copyright and intellectual property laws.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">2. Prohibited Actions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Copying, reproducing, or distributing content</li>
              <li>Sharing questions or answers with others</li>
              <li>Using automated tools to extract content</li>
              <li>Commercial use without authorization</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">3. Data Collection</h3>
            <p>We store test results locally on your device. No personal information is transmitted to external servers. Your progress data remains private and is only accessible on your current device.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">4. Accuracy Disclaimer</h3>
            <p>While we strive for accuracy, the content is provided "as is" without warranties. Always verify information with official sources and licensed professionals.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">5. Educational Purpose</h3>
            <p>This tool is designed to supplement your studies, not replace official educational materials or professional guidance.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">6. Modifications</h3>
            <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">7. Contact</h3>
            <p>For questions or concerns, please contact us through our official channels.</p>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ onViewTerms }) => (
  <div className="mt-4 text-center text-white text-sm space-y-2">
    <div>
      <button 
        onClick={onViewTerms}
        className="underline hover:text-blue-200 transition-colors"
      >
        Terms and Conditions
      </button>
    </div>
    <div>© 2025 m2ea Labs. All rights reserved.</div>
  </div>
);

// Wrapper component for screens with Terms
const ScreenWithTerms = ({ children, showTermsModal, onCloseTerms }) => (
  <>
    {children}
    <TermsModal isOpen={showTermsModal} onClose={onCloseTerms} />
  </>
);

// Main App Component
export default function App() {
  // State for screen navigation
  const [screen, setScreen] = useState('home'); // 'home', 'subject', 'test', 'results', 'progress', 'history'
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  // State for test configuration
  const [numQuestions, setNumQuestions] = useState(20);
  const [studyMode, setStudyMode] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  // State for test execution
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

  // State for timer
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);

  // State for results
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // State for history and statistics
  const [testHistory, setTestHistory] = useState([]);
  const [subjectStats, setSubjectStats] = useState({});

  // State for Terms Modal
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('testHistory');
    if (saved) {
      setTestHistory(JSON.parse(saved));
    }
  }, []);

  // Calculate subject statistics
  const detailedStats = useMemo(() => {
    if (testHistory.length === 0) return null;

    const allScores = testHistory.map(t => t.score);
    const avgScore = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
    const bestScore = Math.max(...allScores);
    const totalCorrect = testHistory.reduce((sum, t) => sum + t.correct, 0);
    const totalQuestions = testHistory.reduce((sum, t) => sum + t.total, 0);
    const accuracy = Math.round((totalCorrect / totalQuestions) * 100);

    // Calculate trend
    const recent5 = allScores.slice(-5);
    const older5 = allScores.slice(-10, -5);
    let trend = 'stable';
    if (recent5.length >= 3 && older5.length >= 3) {
      const recentAvg = recent5.reduce((a, b) => a + b, 0) / recent5.length;
      const olderAvg = older5.reduce((a, b) => a + b, 0) / older5.length;
      if (recentAvg > olderAvg + 5) trend = 'improving';
      else if (recentAvg < olderAvg - 5) trend = 'declining';
    }

    return {
      averageScore: avgScore,
      bestScore,
      accuracy,
      totalTests: testHistory.length,
      trend
    };
  }, [testHistory]);

  // Update subject statistics when test history changes
  useEffect(() => {
    const stats = {};
    testHistory.forEach(test => {
      if (!stats[test.subject]) {
        stats[test.subject] = {
          total: 0,
          scores: [],
          correct: 0,
          questions: 0
        };
      }
      stats[test.subject].total++;
      stats[test.subject].scores.push(test.score);
      stats[test.subject].correct += test.correct;
      stats[test.subject].questions += test.total;
    });
    setSubjectStats(stats);
  }, [testHistory]);

  // finishTest function defined here so it can be used in useEffect
  const finishTest = useCallback(() => {
    // Calculate score
    let correct = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        correct++;
      }
    });

    const scorePercent = Math.round((correct / questions.length) * 100);
    setCorrectAnswers(correct);
    setScore(scorePercent);

    // Save to history
    const testResult = {
      subject: selectedSubject,
      subtopic: selectedSubtopic,
      lesson: selectedLesson,
      date: new Date().toLocaleString(),
      score: scorePercent,
      correct: correct,
      total: questions.length,
      timeTaken: timeTaken,
      studyMode: studyMode,
      incomplete: userAnswers.some(a => a === null)
    };

    const newHistory = [testResult, ...testHistory];
    setTestHistory(newHistory);
    localStorage.setItem('testHistory', JSON.stringify(newHistory));

    setIsTestActive(false);
    setScreen('results');
  }, [questions, userAnswers, selectedSubject, selectedSubtopic, selectedLesson, timeTaken, studyMode, testHistory]);

  // Timer effect
  useEffect(() => {
    if (!studyMode && isTestActive && !isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [studyMode, isTestActive, isPaused, timeRemaining, finishTest]);

  // Time tracking effect
  useEffect(() => {
    if (isTestActive && !isPaused) {
      const interval = setInterval(() => {
        if (startTime) {
          setTimeTaken(Math.floor((Date.now() - startTime) / 1000));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTestActive, isPaused, startTime]);

  // Copy protection
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = globalStyles;
    document.head.appendChild(style);

    const preventCopy = (e) => e.preventDefault();
    const preventContextMenu = (e) => e.preventDefault();
    const preventKeyboardShortcuts = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
      }
    };

    document.addEventListener('copy', preventCopy);
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('keydown', preventKeyboardShortcuts);

    return () => {
      document.head.removeChild(style);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setScreen('subject');
  };

  const selectSubject = (subject, subtopic = null) => {
    setSelectedSubject(subject);
    setSelectedSubtopic(subtopic);
    setScreen('configure');
  };

  const startTest = () => {
    let availableQuestions;
    
    if (selectedSubtopic) {
      // Get questions for specific subtopic
      const lessonKey = selectedLesson.toLowerCase().replace(' ', '-');
      const subjectKey = selectedSubject.toLowerCase().replace(/[\s\/]+/g, '-');
      const subtopicKey = selectedSubtopic.toLowerCase().replace(/[\s\/]+/g, '-');
      const fullKey = `${lessonKey}-${subjectKey}-${subtopicKey}`;
      availableQuestions = questionBank[fullKey] || [];
    } else {
      // Get all questions for the subject (all subtopics combined)
      const lessonKey = selectedLesson.toLowerCase().replace(' ', '-');
      const subjectKey = selectedSubject.toLowerCase().replace(/[\s\/]+/g, '-');
      
      availableQuestions = [];
      Object.keys(questionBank).forEach(key => {
        if (key.startsWith(`${lessonKey}-${subjectKey}`)) {
          availableQuestions = [...availableQuestions, ...questionBank[key]];
        }
      });
    }

    if (availableQuestions.length === 0) {
      alert('No questions available for this selection');
      return;
    }

    // Shuffle and select questions
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, Math.min(numQuestions, shuffled.length));

    setQuestions(selectedQuestions);
    setUserAnswers(new Array(selectedQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setFlaggedQuestions(new Set());
    
    // Set timer (1.5 minutes per question for timed mode)
    if (!studyMode) {
      setTimeRemaining(selectedQuestions.length * 90);
    }
    
    setStartTime(Date.now());
    setTimeTaken(0);
    setIsTestActive(true);
    setIsPaused(false);
    setScreen('test');
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    
    if (studyMode) {
      setShowAnswer(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(studyMode && userAnswers[currentQuestionIndex + 1] !== null);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(studyMode && userAnswers[currentQuestionIndex - 1] !== null);
    }
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex);
    } else {
      newFlagged.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlagged);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowAnswer(studyMode && userAnswers[index] !== null);
  };

  const resetTest = () => {
    setScreen('home');
    setSelectedLesson(null);
    setSelectedSubject(null);
    setSelectedSubtopic(null);
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setIsTestActive(false);
    setIsPaused(false);
    setFlaggedQuestions(new Set());
    setTimeRemaining(0);
    setStartTime(null);
    setTimeTaken(0);
  };

  const exportResults = () => {
    const csv = [
      ['Date', 'Subject', 'Subtopic', 'Score', 'Correct', 'Total', 'Time', 'Mode'],
      ...testHistory.map(test => [
        test.date,
        test.subject,
        test.subtopic || 'All',
        `${test.score}%`,
        test.correct,
        test.total,
        formatTime(test.timeTaken),
        test.studyMode ? 'Study' : 'Timed'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-history.csv';
    a.click();
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all test history?')) {
      setTestHistory([]);
      localStorage.removeItem('testHistory');
    }
  };

  // Home Screen
  if (screen === 'home') {
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Dental Hygiene
              </h1>
              <p className="text-gray-600">Practice Test Bank</p>
            </div>

            <div className="space-y-4 mb-6">
              {mainLessons.map((lesson) => (
                <button
                  key={lesson}
                  onClick={() => selectLesson(lesson)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-between px-6"
                >
                  <span className="text-lg">{lesson}</span>
                  <ChevronRight className="w-6 h-6" />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setScreen('progress')}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Progress</span>
              </button>
              <button
                onClick={() => setScreen('history')}
                className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>History</span>
              </button>
            </div>

            {/* Ad Space - Home Screen */}
            <div className="mt-6">
              <GoogleAd slot="1234567890" format="auto" />
            </div>
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }

  // Subject Selection Screen
  if (screen === 'subject') {
    const subjects = subjectsByLesson[selectedLesson] || {};
    
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center mb-6">
              <button onClick={() => setScreen('home')} className="mr-4 text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedLesson}</h2>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {Object.entries(subjects).map(([subject, subtopics]) => {
                // Check if there are subtopics
                const hasSubtopics = subtopics && subtopics.length > 0;
                
                return (
                  <div key={subject} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{subject}</h3>
                      {!hasSubtopics && (
                        <button
                          onClick={() => selectSubject(subject)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          Start Test
                        </button>
                      )}
                    </div>
                    
                    {hasSubtopics && (
                      <div className="space-y-2 mt-3">
                        {/* "All Topics" option */}
                        <button
                          onClick={() => selectSubject(subject)}
                          className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg text-left transition-all border border-gray-200 hover:border-blue-300 flex items-center justify-between"
                        >
                          <span className="font-medium">All Topics</span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                        
                        {/* Individual subtopics */}
                        {subtopics.map((subtopic) => (
                          <button
                            key={subtopic}
                            onClick={() => selectSubject(subject, subtopic)}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg text-left transition-all border border-gray-200 hover:border-purple-300 flex items-center justify-between"
                          >
                            <span>{subtopic}</span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
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

  // Test Configuration Screen
  if (screen === 'configure') {
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center mb-6">
              <button onClick={() => setScreen('subject')} className="mr-4 text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedSubject}</h2>
                {selectedSubtopic && <p className="text-gray-600">{selectedSubtopic}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Number of Questions</label>
                <div className="grid grid-cols-4 gap-3">
                  {[10, 20, 30, 50].map(num => (
                    <button
                      key={num}
                      onClick={() => setNumQuestions(num)}
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        numQuestions === num
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-800">Study Mode</div>
                    <div className="text-sm text-gray-600">See answers immediately</div>
                  </div>
                  <button
                    onClick={() => setStudyMode(!studyMode)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      studyMode ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-all ${
                      studyMode ? 'ml-7' : 'ml-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">Show Explanations</div>
                    <div className="text-sm text-gray-600">Display answer rationales</div>
                  </div>
                  <button
                    onClick={() => setShowExplanations(!showExplanations)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      showExplanations ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-all ${
                      showExplanations ? 'ml-7' : 'ml-1'
                    }`} />
                  </button>
                </div>
              </div>

              <button
                onClick={startTest}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Test
              </button>
            </div>
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }

  // Test Screen
  if (screen === 'test' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    const isCorrect = userAnswer === currentQuestion.answer;
    const answeredCount = userAnswers.filter(a => a !== null).length;

    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          {/* Pause Overlay */}
          {isPaused && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 max-w-md">
                <Pause className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-center mb-4">Test Paused</h2>
                <p className="text-gray-600 text-center mb-6">Take your time. Click resume when ready.</p>
                <button
                  onClick={togglePause}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Resume Test
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            {/* Header with Timer and Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {!studyMode && (
                  <div className={`flex items-center ${timeRemaining < 60 ? 'text-red-600' : 'text-gray-700'}`}>
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{formatTime(timeRemaining)}</span>
                  </div>
                )}
                {studyMode && (
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{formatTime(timeTaken)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {!studyMode && (
                  <button
                    onClick={togglePause}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Pause test"
                  >
                    <Pause className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <button
                  onClick={toggleFlag}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Flag question"
                >
                  <Flag className={`w-5 h-5 ${flaggedQuestions.has(currentQuestionIndex) ? 'text-red-600 fill-red-600' : 'text-gray-600'}`} />
                </button>
                <CopyButton 
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{answeredCount}/{questions.length} answered</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-4">
                <p className="text-lg text-gray-800 leading-relaxed">{currentQuestion.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = userAnswer === index;
                  const isCorrectAnswer = index === currentQuestion.answer;
                  let buttonClass = 'bg-white hover:bg-gray-50 border-gray-200';
                  
                  if (showAnswer) {
                    if (isCorrectAnswer) {
                      buttonClass = 'bg-green-100 border-green-500 border-2';
                    } else if (isSelected && !isCorrect) {
                      buttonClass = 'bg-red-100 border-red-500 border-2';
                    }
                  } else if (isSelected) {
                    buttonClass = 'bg-blue-100 border-blue-500 border-2';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => !showAnswer && selectAnswer(index)}
                      disabled={showAnswer}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${buttonClass} ${
                        showAnswer ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start">
                        <span className="font-bold mr-3 text-gray-700">{String.fromCharCode(65 + index)}.</span>
                        <span className="flex-1 text-gray-800">{option}</span>
                        {showAnswer && isCorrectAnswer && <CheckCircle className="w-6 h-6 text-green-600 ml-2" />}
                        {showAnswer && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-600 ml-2" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {showAnswer && showExplanations && currentQuestion.explanation && (
              <div className="mb-6 bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                <div className="flex items-start">
                  <Eye className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-blue-800 mb-1">Explanation</div>
                    <p className="text-gray-700">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Assistant Panel */}
            <AIAssistantPanel 
              question={currentQuestion.question}
              options={currentQuestion.options}
              show={showAnswer}
            />

            {/* Navigation Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={finishTest}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Finish Test
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Next
                </button>
              )}
            </div>

            {/* Question Navigator */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700">Quick Navigation</h3>
                <div className="flex gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                    <span className="text-gray-600">Current</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                    <span className="text-gray-600">Answered</span>
                  </div>
                  {flaggedQuestions.size > 0 && (
                    <div className="flex items-center">
                      <Flag className="w-3 h-3 text-red-600 fill-red-600 mr-1" />
                      <span className="text-gray-600">Flagged</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-10 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all relative ${
                      index === currentQuestionIndex
                        ? 'bg-blue-500 text-white'
                        : userAnswers[index] !== null
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                    {flaggedQuestions.has(index) && (
                      <Flag className="w-3 h-3 absolute top-0 right-0 text-red-600 fill-red-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Footer onViewTerms={() => setShowTermsModal(true)} />
        </div>
      </div>
    </ScreenWithTerms>
    );
  }

  // Results Screen
  if (screen === 'results') {
    return (
      <ScreenWithTerms showTermsModal={showTermsModal} onCloseTerms={() => setShowTermsModal(false)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-4 ${score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                {score}%
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {score >= 90 ? 'Outstanding!' : score >= 70 ? 'Good Job!' : 'Keep Practicing!'}
              </h2>
              <p className="text-gray-600">
                {correctAnswers} out of {questions.length} correct
              </p>
              {!studyMode && (
                <p className="text-gray-600">Time: {formatTime(timeTaken)}</p>
              )}
            </div>

            {/* Performance Breakdown */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Performance Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{questions.length - correctAnswers}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setScreen('test');
                  setCurrentQuestionIndex(0);
                  setShowAnswer(true);
                  setIsTestActive(false);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Review Answers
              </button>
              <button
                onClick={startTest}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Retake Test
              </button>
              <button
                onClick={resetTest}
                className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
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
                          {test.incomplete && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                              Incomplete
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
