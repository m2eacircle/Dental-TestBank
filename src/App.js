import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Trophy, BarChart3, CheckCircle, XCircle, Home, Play, ArrowLeft, ChevronRight, Download, Flag, Eye, TrendingUp, Pause } from 'lucide-react';

// Import questions from separate files - NO questions in this file!
import { questionBank, subjectsWithSubtopics, subjectsByLesson } from './questions';

// Google AdSense component
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
  const [cumulativeQuestionsAnswered, setCumulativeQuestionsAnswered] = useState(0);
  const [totalTopicQuestions, setTotalTopicQuestions] = useState(0);
  const [userRequestedLimit, setUserRequestedLimit] = useState(null);

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

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
      
      const questionKey = subtopic || subject;
      const allQuestions = questionBank[questionKey] || [];
      
      if (allQuestions.length === 0) {
        alert('No questions available for this topic yet.');
        return;
      }
      
      // Initialize cumulative tracking
      const limit = questionLimit[questionKey];
      const requestedLimit = limit && !isNaN(limit) && limit > 0 && limit < allQuestions.length ? parseInt(limit) : null;
      setUserRequestedLimit(requestedLimit);
      setTotalTopicQuestions(allQuestions.length);
      
      // If this is a new test (not retake), don't reset cumulative count
      // If retake, keep the cumulative count
      if (!isRetake && requestedLimit) {
        // This is tracked in results screen, keep existing cumulative count
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
          setCumulativeQuestionsAnswered(0); // Reset cumulative count
          alert('You\'ve completed all available questions! Starting fresh with new questions.');
          questionsToUse = shuffleArray(allQuestions);
        } else {
          questionsToUse = shuffleArray(availableQuestions);
        }
        
        // Apply question limit if set
        if (requestedLimit) {
          questionsToUse = questionsToUse.slice(0, requestedLimit);
        }
        
        // Save these questions for potential retake
        setLastTestQuestions(questionsToUse);
        
        // Mark these questions as used
        const newUsedIds = new Set(usedQuestionIds);
        questionsToUse.forEach(q => newUsedIds.add(q.id));
        setUsedQuestionIds(newUsedIds);
      }
      
      setSelectedQuestions(questionsToUse);
      
      const totalTime = studyMode ? 0 : questionsToUse.length * 70;
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
      
      const totalTime = studyMode ? 0 : flaggedQs.length * 70;
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
    
    // Use selectedAnswer directly (no shuffling)
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    // Store for review
    const reviewData = {
      question: currentQuestion,
      selectedAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct,
      isCorrect: selectedAnswer === currentQuestion.correct
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
      if (answer === selectedQuestions[idx].correct) correct++;
    });
    
    const score = selectedQuestions.length > 0 ? Math.round((correct / selectedQuestions.length) * 100) : 0;
    const timeTaken = studyMode ? 0 : totalTestTime - timeLeft;
    
    // Update cumulative count if user set a limit
    if (userRequestedLimit) {
      setCumulativeQuestionsAnswered(prev => prev + selectedQuestions.length);
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

  const getFlaggedQuestionsForTopic = (topicKey) => {
    const allQuestions = questionBank[topicKey] || [];
    return allQuestions.filter(q => flaggedQuestions.includes(q.id));
  };

  // Home Screen
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
          {/* Google Ad - Home Screen Top Banner */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-center mb-6">
              <svg className="w-10 h-10 mr-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,40) scale(0.1,-0.1)" fill="#38BDF8" stroke="none">
                  <path d="M71 334 c-12 -15 -21 -36 -20 -48 1 -17 2 -15 9 7 17 56 43 69 95 45 18 -8 22 -14 13 -20 -26 -16 17 -8 61 12 52 24 65 25 85 4 9 -8 16 -12 16 -7 0 15 -23 33 -43 33 -10 0 -35 -7 -54 -16 -32 -16 -37 -16 -69 0 -48 22 -69 20 -93 -10z"/>
                  <path d="M331 295 c-1 -11 -12 -44 -26 -73 -14 -30 -25 -59 -25 -65 0 -7 14 19 31 56 17 37 28 76 26 85 -4 14 -5 13 -6 -3z"/>
                  <path d="M60 255 c0 -5 9 -32 20 -60 10 -27 19 -43 20 -34 0 9 -9 36 -20 60 -11 24 -20 40 -20 34z"/>
                  <path d="M172 138 c-7 -7 -12 -17 -12 -22 0 -6 5 -3 11 7 15 25 28 21 44 -15 8 -18 14 -26 15 -18 0 17 -27 60 -39 60 -4 0 -12 -5 -19 -12z"/>
                  <path d="M106 105 c7 -45 20 -75 34 -75 12 0 24 45 17 62 -3 7 -6 0 -6 -15 -1 -42 -23 -28 -38 24 l-13 44 6 -40z"/>
                  <path d="M272 110 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z"/>
                  <path d="M231 59 c-1 -9 2 -19 6 -22 8 -9 33 12 33 27 0 6 -6 2 -12 -9 -11 -19 -11 -19 -19 0 -6 15 -8 16 -8 4z"/>
                </g>
              </svg>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 mb-1">Ontario</span>
                <h1 className="text-2xl font-bold text-gray-800">Dental Hygiene Exam Question Bank</h1>
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
        </div>
      </div>
    );
  }

  // Question Input Screen
  if (screen === 'questionInput') {
    const totalQuestions = questionBank[selectedSubject]?.length || 0;
    const currentLimit = questionLimit[selectedSubject] || '';
    const flaggedCount = getFlaggedQuestionsForTopic(selectedSubject).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
          {/* Google Ad - Subject Selection Screen */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => {
                  // Check if this subject has a parent (came from a Lesson)
                  const cameFromLesson = Object.entries(subjectsByLesson).find(([lecture, subjects]) => 
                    subjects.includes(selectedSubject)
                  );
                  
                  if (cameFromLesson) {
                    // Go back to the lecture's subject list
                    setSelectedSubject(cameFromLesson[0]);
                    setScreen('subtopics');
                  } else {
                    // Go back to home
                    setScreen('home');
                  }
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
                className="w-full bg-gradient-to-r from-blue-300 to-blue-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
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
        </div>
      </div>
    );
  }

  // Subtopics Screen
  if (screen === 'subtopics') {
    const subtopics = subjectsWithSubtopics[selectedSubject];
    const isLesson = selectedSubject.startsWith('Lesson');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
          {/* Google Ad - Topic Selection Screen */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setScreen('home')}
                className="mr-3 text-blue-600 hover:text-blue-700"
                aria-label="Back to home"
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
                              className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all flex items-center"
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
        </div>
      </div>
    );
  }

  // Test Screen
  if (screen === 'test') {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const showAdBetweenQuestions = currentQuestionIndex > 0 && !isAnswerSubmitted;
    
    if (!currentQuestion) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md">
            <p className="text-gray-700 text-center">No questions available for this subject yet.</p>
            <button
              onClick={() => setScreen('home')}
              className="w-full mt-4 bg-blue-400 text-white py-3 rounded-xl font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const isFlagged = flaggedQuestions.includes(currentQuestion.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
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
            
            {/* Current test progress bar (blue) */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
              />
            </div>
            
            {/* Cumulative progress bar (green) - only show if user set a limit */}
            {userRequestedLimit && userRequestedLimit < totalTopicQuestions && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Topic Progress</span>
                  <span className="font-semibold">{cumulativeQuestionsAnswered + currentQuestionIndex + 1}/{totalTopicQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all"
                    style={{ width: `${((cumulativeQuestionsAnswered + currentQuestionIndex + 1) / totalTopicQuestions) * 100}%` }}
                  />
                </div>
              </div>
            )}

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
                      className="w-full bg-gradient-to-r from-blue-300 to-blue-400 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
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

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isThisCorrect = index === currentQuestion.correct;
                const isSelected = selectedAnswer === index;
                
                let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                
                if (isAnswerSubmitted) {
                  if (isThisCorrect) {
                    buttonClass = 'bg-green-500 text-white';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-500 text-white';
                  } else {
                    buttonClass = 'bg-gray-100 text-gray-400';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-blue-400 text-white shadow-lg scale-105';
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
                    <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            {isAnswerSubmitted && !isCorrect && (
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-800 font-semibold mb-2">Incorrect Answer</p>
                <p className="text-gray-700">
                  <span className="font-semibold">Correct answer: </span>
                  {currentQuestion.options[currentQuestion.correct]}
                </p>
              </div>
            )}

            {isAnswerSubmitted && isCorrect && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <p className="text-green-800 font-semibold flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Correct!
                </p>
              </div>
            )}

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
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center"
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
                    ? 'bg-gradient-to-r from-blue-300 to-blue-400 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-green-300 to-green-400 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnswerSubmitted 
                ? (currentQuestionIndex === selectedQuestions.length - 1 ? 'Finish Test' : 'Next Question')
                : 'Submit Answer'
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review Screen
  if (screen === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto">
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
              {reviewAnswers.map((review, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl border-2 ${
                    review.isCorrect 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-800 flex-1">
                      Question {index + 1}: {review.question.question}
                    </h3>
                    {review.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 ml-2" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 ml-2" />
                    )}
                  </div>

                  <div className="space-y-2 mb-3">
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
                            <span>{option}</span>
                            {isCorrect && <span className="ml-auto text-green-600 font-semibold">✓ Correct</span>}
                            {wasSelected && !isCorrect && <span className="ml-auto text-red-600 font-semibold">Your answer</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen('results')}
              className="w-full mt-4 bg-blue-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (screen === 'results') {
    const lastResult = testHistory[0];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
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
                className="w-full bg-gradient-to-r from-blue-300 to-blue-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Retake Test (Same Questions)
              </button>
              <button
                onClick={() => startTest(selectedSubject, selectedSubtopic, false)}
                className="w-full bg-gradient-to-r from-green-300 to-green-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 mr-2" />
                Next Test (New Questions)
              </button>
              {selectedSubtopic && (
                <button
                  onClick={() => setScreen('subtopics')}
                  className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
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
        </div>
      </div>
    );
  }

  // Progress Screen
  if (screen === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
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
                          className="bg-gradient-to-r from-blue-300 to-purple-300 h-3 rounded-full transition-all"
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
        </div>
      </div>
    );
  }

  // History Screen
  if (screen === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
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
                  className="flex-1 bg-gradient-to-r from-green-300 to-green-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
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
        </div>
      </div>
    );
  }
}
