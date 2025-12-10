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
              <svg className="w-10 h-10 mr-2" viewBox="0 0 2048 2048" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 C675.84 0 1351.68 0 2048 0 C2048 675.84 2048 1351.68 2048 2048 C1372.16 2048 696.32 2048 0 2048 C0 1372.16 0 696.32 0 0 Z " fill="#FEFEFE" transform="translate(0,0)"/>
                <path d="M0 0 C2.64 0.66 5.28 1.32 8 2 C8 4.64 8 7.28 8 10 C7.34 10.33 6.68 10.66 6 11 C5.67 28.45 5.34 45.9 5 63.35546875 C4.99993896 63.6491394 4.99987793 63.94281006 4.99981689 64.24401855 C4.96874084 70.41050653 4.96874084 70.41050653 5 76.35546875 C4.08865662 77.17031769 3.17731323 77.98516663 2.23925781 78.82446289 C-0.32816792 81.0723753 -3.02094026 83.02963781 -5.90625 84.67578125 C-7.81171875 85.73359375 -7.81171875 85.73359375 -9.765625 86.8125 C-10.76453125 87.32898438 -11.7634375 87.84546875 -12.7890625 88.37695312 C-15.15623936 89.58833004 -17.57167709 90.65874928 -20 91.73046875 C-21.94503906 92.54691406 -23.89007812 93.36335937 -25.88671875 94.20703125 C-28.26242752 95.20819679 -30.55990779 96.39273595 -32.8125 97.6875 C-35.29976562 99.12832031 -37.78703125 100.56914062 -40.359375 102.0625 C-44.16 104.16 -44.16 104.16 -46 107 C-46.22210938 108.18960938 -46.44421875 109.37921875 -46.67236328 110.60742188 C-46.96789603 112.41073267 -47.26342878 114.21404346 -47.56640625 116.0625 C-47.89082031 118.01746094 -48.21523437 119.97242187 -48.54833984 121.98242187 C-48.98654297 124.93410156 -49.42474609 127.88578125 -49.875 130.9140625 C-50.54664062 135.40796875 -51.21828125 139.9019375 -51.890625 144.39453125 C-52.42734375 147.90976562 -52.96484375 151.42460937 -53.5 155 C-54.7 155 -55.9 155 -57.125 155 C-58.8775 153.35 -60.63 151.7 -62.4375 150 C-63.73195312 149.01710938 -65.02640625 148.03421875 -66.359375 147.02148438 C-69.76859375 144.46875 -69.76859375 144.46875 -73.22265625 141.87890625 C-76.08 139.68 -76.08 139.68 -79 137.4375 C-81.04320312 135.83515625 -83.08640625 134.2328125 -85.1875 132.5859375 C-89.16 129.48 -89.16 129.48 -91 127 C-91.33 126.01 -91.66 125.02 -92 124 C-92.2673 118.34 -92.5346 112.68 -92.80859375 106.94140625 C-92.83577148 105.96143555 -92.86294922 104.98146484 -92.89086914 103.97119141 C-92.87 100.71 -92.85 97.45 -92.83 94.19 C-92.82012695 92.68515625 -92.81025391 91.1803125 -92.80029297 89.62890625 C-92.77 84.49 -92.74 79.35 -92.71 74.21 C-92.69933105 72.48183105 -92.68866211 70.75366211 -92.67773438 68.97265625 C-92.64 60.21 -92.6 51.45 -92.5625 42.6875 C-92.54929688 41.0609375 -92.53609375 39.434375 -92.52246094 37.7578125 C-92.42 23.45 -92.42 23.45 -90.4375 15 C-89.43824219 13.7421875 -89.43824219 13.7421875 -88.42285156 12.46484375 C-84.08 7.48 -84.08 7.48 -80.5 4 C-79.5078125 3.175 -78.515625 2.35 -77.4921875 1.5 C-73.5185 -1.26453506 -73.5185 -1.26453506 -70.125 -2.375 C-68 -3 -68 -3 -64 -3 C-58.61 -2.34 -58.61 -2.34 -53.75 0 C-51.32363281 1.24617187 -51.32363281 1.24617187 -48.85742188 2.51757812 C-45.95203125 3.99914062 -43.04664062 5.48070312 -40.08203125 6.98828125 C-37.68972656 8.19121094 -35.29742187 9.39414062 -32.84375 10.62890625 C-29.1325 12.4325 -29.1325 12.4325 -25.37890625 14.27734375 C-24.08445312 14.98632812 -22.79 15.695 -21.453125 16.42578125 C-16.28 19.16 -16.28 19.16 -12.625 21.4375 C-11.14453125 22.35234375 -9.6640625 23.2671875 -8.140625 24.20703125 C-4.49 26.49 -4.49 26.49 -2 28 C-0.72 26.4 0.56 24.8 1.875 23.1875 C2.54082031 22.38359375 3.20664062 21.5796875 3.89257812 20.75 C5.96 18.16 5.96 18.16 9 15 C9 10.05 9 5.1 9 0 C6.03 0 3.06 0 0 0 Z " fill="#4C7C9B" transform="translate(1041,1110)"/>
                <path d="M0 0 C3.63 1.32 7.26 2.64 11 4 C11 10.27 11 16.54 11 23 C10.34 23.33 9.68 23.66 9 24 C9 29.94 9 35.88 9 42 C8.34 42 7.68 42 7 42 C7 51.57 7 61.14 7 71 C5.68 71 4.36 71 3 71 C3 80.24 3 89.48 3 99 C2.34 99 1.68 99 1 99 C1 113.53 1 128.06 1 143 C-0.32 143 -1.64 143 -3 143 C-3 149.6 -3 156.2 -3 163 C-4.32 163 -5.64 163 -7 163 C-6.67 165.97 -6.34 168.94 -6 172 C-8.25296875 173.03085937 -10.50679687 174.05601562 -12.76171875 175.08203125 C-17.46 177.22 -17.46 177.22 -22 178 C-27.96 178.99 -33.92 179.98 -40 181 C-40.94875 180.50875 -41.8975 180.0175 -42.875 179.5125 C-45.64351562 177.87296875 -48.41203125 176.2334375 -51.18046875 174.59375 C-54.2 172.68 -54.2 172.68 -56.0625 170.8125 C-58.38640625 168.1740625 -58.38640625 168.1740625 -60.4375 165.3125 C-62.32992187 162.62523437 -64.22234375 159.93796875 -66.1640625 157.1875 C-71.36 148.51 -71.36 148.51 -72.375 137.6875 C-72.33175781 136.27273438 -72.28851562 134.85796875 -72.24414062 133.39453125 C-71.92 123.58 -71.92 123.58 -70.625 117.5 C-68.52128906 111.66707031 -68.52128906 111.66707031 -66.375 105.75 C-65.70710938 104.0646875 -65.03921875 102.379375 -64.35351562 100.64453125 C-59.95 90.23 -59.95 90.23 -56.5625 84.875 C-54.875 82.59 -54.875 82.59 -52.875 81 C-50.89402344 79.72238281 -48.91304687 78.44476562 -46.875 77.125 C-45.80117188 76.53046875 -45.80117188 76.53046875 -44.703125 75.92578125 C-40.38 73.84 -40.38 73.84 -35 73 C-23.14 72.01 -23.14 72.01 -16 76 C-15.4359375 76.54460938 -14.871875 77.08921875 -14.29101562 77.65039062 C-12.3 79.66 -12.3 79.66 -10 81.375 C-8.8378125 82.25808594 -7.675625 83.14117187 -6.478125 84.05273438 C-4.08 85.92 -4.08 85.92 0 88 C0 59.56 0 31.12 0 2 C0 1.34 0 0.68 0 0 Z " fill="#6C92B1" transform="translate(1037,992)"/>
                <path d="M0 0 C2.64 0.99 5.28 1.98 8 3 C8 7.62 8 12.24 8 17 C7.34 17 6.68 17 6 17 C6 24.59 6 32.18 6 40 C5.34 40 4.68 40 4 40 C4 49.24 4 58.48 4 68 C3.34 68 2.68 68 2 68 C2 74.27 2 80.54 2 87 C1.34 87 0.68 87 0 87 C0 94.59 0 102.18 0 110 C-0.66 110 -1.32 110 -2 110 C-2 118.91 -2 127.82 -2 137 C-2.66 137 -3.32 137 -4 137 C-4 145.91 -4 154.82 -4 164 C-4.66 164 -5.32 164 -6 164 C-6 166.97 -6 169.94 -6 173 C-6.66 173 -7.32 173 -8 173 C-9.19636719 174.93398437 -10.39273437 176.86796875 -11.62890625 178.8515625 C-14.99433594 183.70238281 -18.37457031 188.53722656 -21.75 193.375 C-22.80214844 194.88757812 -23.85429687 196.40015625 -24.9375 197.953125 C-28.34 202.79 -28.34 202.79 -30.0625 207.75 C-30.67960938 209.17945312 -31.29671875 210.60890625 -31.93164062 212.08203125 C-34.19 217.51 -34.19 217.51 -35.9375 223 C-37.2575 227.92 -38.5775 232.84 -39.9375 237.875 C-42.62 248 -42.62 248 -46 250 C-48.97 250 -51.94 250 -55 250 C-58.63 250 -62.26 250 -66 250 C-66.66 249.34 -67.32 248.68 -68 248 C-68.66 247.34 -69.32 246.68 -70 246 C-75.93 240.40460937 -75.93 240.40460937 -80 233 C-80 227.69 -80 222.38 -80 217 C-79.34 217 -78.68 217 -78 217 C-77.67 214.36 -77.34 211.72 -77 209 C-76.34 209 -75.68 209 -75 209 C-75 204.71 -75 200.42 -75 196 C-74.34 196 -73.68 196 -73 196 C-73 189.07 -73 182.14 -73 175 C-72.34 175 -71.68 175 -71 175 C-71 168.73 -71 162.46 -71 156 C-70.01 156 -69.02 156 -68 156 C-67.67 155.34 -67.34 154.68 -67 154 C-66.67 153.01 -66.34 152.02 -66 151 C-64.75855469 148.27964844 -64.75855469 148.27964844 -63.49609375 145.51171875 C-61.26 140.37 -61.26 140.37 -59.8125 137 C-57.875 132.55625 -57.875 132.55625 -56.0625 128.4375 C-55.37976562 126.99851562 -54.69703125 125.55953125 -53.9921875 124.078125 C-51.52 118.83 -51.52 118.83 -49 114 C-48.34 114 -47.68 114 -47 114 C-46.01 113.34 -45.02 112.68 -44 112 C-37.07 109.08 -37.07 109.08 -32 109 C-23.8 110.32 -23.8 110.32 -18.3125 114 C-17.16179688 114.82320313 -16.01109375 115.64640625 -14.82421875 116.49609375 C-11.56 118.85 -11.56 118.85 -10 121 C-9.01 121.66 -8.02 122.32 -7 123 C-6.34 124.65 -5.68 126.3 -5 128 C-4.34 128 -3.68 128 -3 128 C-3 125.69 -3 123.38 -3 121 C-2.34 121 -1.68 121 -1 121 C-1 111.43 -1 101.86 -1 92 C-0.34 92 0.32 92 1 92 C1 80.79 1 69.58 1 58 C1.66 58 2.32 58 3 58 C3 48.43 3 38.86 3 29 C3.66 29 4.32 29 5 29 C5 19.1 5 9.2 5 -1 C3.35 -0.67 1.7 -0.34 0 0 Z " fill="#84AACC" transform="translate(1030,904)"/>
                <path d="M0 0 C1.98 0 3.96 0 6 0 C8.48359375 2.00140625 10.9671875 4.0028125 13.5 6.0625 C22 13 22 13 25.875 18 C26.87484375 19.32546875 27.8746875 20.6509375 28.90625 22.015625 C30.91230469 24.67027344 32.9183594 27.32492187 35 30 C35.66 30.99 36.32 31.98 37 33 C37.99 34.32 38.98 35.64 40 37 C40.99 38.32 41.98 39.64 43 41 C43.66 42.32 44.32 43.64 45 45 C45.33 46.65 45.66 48.3 46 50 C46.66 50.66 47.32 51.32 48 52 C49.44035156 54.10070312 50.88070312 56.20140625 52.37109375 58.37890625 C53.40570313 59.92597656 54.44031249 61.47304688 55.5078125 63.0625 C57.32 65.97 59.13 68.88 61 71.875 C64.04742187 76.34078125 67.09484375 80.8065625 70.1875 85.3125 C71.70707031 87.55039063 73.22664062 89.78828125 74.7890625 92.0859375 C77 95.54 77 95.54 79 98 C79.99 99.32 80.98 100.64 82 102 C82.32734375 102.9496875 82.6546875 103.899375 82.99218749 104.87890625 C84.24 108.99 84.24 108.99 85 113 C85.01070312 115.28960938 85.02140625 117.57921875 85.03320312 119.92578125 C85.09 128.04 85.09 128.04 84.6875 135.1875 C84.58609375 136.69023437 84.48468749 138.19296875 84.38085938 139.73828125 C83.90859375 145.4384375 83.4363281 151.13859375 82.94921875 156.8359375 C82.8828125 157.61113281 82.81640625 158.38632813 82.7478125 159.18359375 C82.18378906 165.27074219 81.61976562 171.35789062 81.04296875 177.44140625 C81.04296875 178.21710937 81.04296875 178.9928125 81.04296875 179.79296875 C81.02 187.1 81.02 187.1 79 192 C78.38121094 193.30640625 77.76242187 194.6128125 77.125 195.9609375 C75.49 199.3 75.49 199.3 73 202 C70.30671875 204.37117187 67.61648438 206.74539062 65.0625 209.3125 C64.10261719 210.23164062 63.14273438 211.15078125 62.15234375 212.09765625 C59.96 214.24 59.96 214.24 56.75 216 C54.75867187 217.01273438 52.76734375 218.02546875 50.71875 219.0625 C47.59 220.7 47.59 220.7 44 222 C39.38 222.99 34.76 223.98 30 225 C24.075 225.66 18.15 226.32 12 227 C7.93070312 226.95820312 3.86140625 226.91640625 -0.29296875 226.87109375 C-10.98 226.64 -10.98 226.64 -16.625 224.875 C-19.28367187 224.06238281 -21.94234375 223.24976562 -24.66015625 222.41015625 C-28.23 221.32 -28.23 221.32 -30.3125 219.8125 C-32.33894531 218.28882812 -34.36539062 216.76515625 -36.44921875 215.1953125 C-39.84 212.73 -39.84 212.73 -43 210 C-47.51492187 205.41648438 -52.02984375 200.83296875 -56.625 196.1875 C-61 191.81 -61 191.81 -63.375 185.25 C-63.82859375 183.8234375 -64.2821875 182.396875 -64.74609375 180.9296875 C-65.58 178.21 -65.58 178.21 -66 175 C-66 174.01 -66 173.02 -66 172 C-66.99 172 -67.98 172 -69 172 C-68.67 169.03 -68.34 166.06 -68 163 C-68 162.01 -68 161.02 -68 160 C-68.66 160 -69.32 160 -70 160 C-70 156.04 -70 152.08 -70 148 C-70.66 148 -71.32 148 -72 148 C-72 139.09 -72 130.18 -72 121 C-72.66 121 -73.32 121 -74 121 C-74 111.43 -74 101.86 -74 92 C-74.66 92 -75.32 92 -76 92 C-76 84.74 -76 77.48 -76 70 C-76.66 70 -77.32 70 -78 70 C-78 64.06 -78 58.12 -78 52 C-78.66 52 -79.32 52 -80 52 C-80 44.41 -80 36.82 -80 29 C-80.66 29 -81.32 29 -82 29 C-82 23.06 -82 17.12 -82 11 C-82.66 11 -83.32 11 -84 11 C-84 6.05 -84 1.1 -84 -4 C-81.03 -4 -78.06 -4 -75 -4 C-74.01 -3.01 -73.02 -2.02 -72 -1 C-71.67 -0.67 -71.34 -0.34 -71 0 C-70.01 0.66 -69.02 1.32 -68 2 C-67.67 2.66 -67.34 3.32 -67 4 C-66.34 4.66 -65.68 5.32 -65 6 C-64.67 6.66 -64.34 7.32 -64 8 C-63.34 8 -62.68 8 -62 8 C-61.34 8.99 -60.68 9.98 -60 11 C-59.34 11.33 -58.68 11.66 -58 12 C-57.34 12.99 -56.68 13.98 -56 15 C-55.34 15 -54.68 15 -54 15 C-51.03 16.65 -48.06 18.3 -45 20 C-43.86734375 20.6753125 -42.7346875 21.350625 -41.56640625 22.04296875 C-39.57 23.23 -39.57 23.23 -37 24 C-36.34 24.99 -35.68 25.98 -35 27 C-34.67 27.66 -34.34 28.32 -34 29 C-29.75 30.32 -25.5 31.64 -21.125 33 C-20.49359375 33.33 -19.8621875 33.66 -19.2109375 34 C-12.96 37.13 -12.96 37.13 -10.375 40 C-8.72199219 42.36800781 -8.72199219 42.36800781 -7.03515625 44.7890625 C-1.73 54.03 -1.73 54.03 0 59 C0 60.65 0 62.3 0 64 C0.66 64 1.32 64 2 64 C2 52.13 2 40.26 2 28 C1.01 28 0.02 28 -1 28 C-0.67 25.36 -0.34 22.72 0 20 C0 13.4 0 6.8 0 0 Z " fill="#84AACC" transform="translate(1042,1076)"/>
                <path d="M0 0 C0.33 0 0.66 0 1 0 C2.28382014 14.69222884 3.34308755 29.24723527 3 44 C2.67 44 2.34 44 2 44 C-0.31479714 29.3465074 -0.21275375 14.80602439 0 0 Z " fill="#575757" transform="translate(336,454)"/>
                <path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C-0.78694182 3.8364029 -3.58042817 6.66617691 -6.38012695 9.48999023 C-7.33149157 10.45140847 -8.28105291 11.41461464 -9.22875977 12.37963867 C-10.59175121 13.7669055 -11.96180411 15.14722328 -13.33203125 16.52734375 C-14.56530151 17.77632446 -14.56530151 17.77632446 -15.82348633 19.05053711 C-18 21 -18 21 -21 22 C-17.89901979 15.09053438 -11.42900281 10.43041698 -5.80078125 5.578125 C-3.7757781 3.80350185 -1.86454143 1.94223065 0 0 Z " fill="#2B2B2B" transform="translate(405,182)"/>
              </svg>
              <h1 className="text-2xl font-bold text-gray-800">Dental Hygiene Test Bank</h1>
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
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold"
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
                className="bg-blue-600 h-2 rounded-full transition-all"
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
                    className="bg-green-600 h-2 rounded-full transition-all"
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
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
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
        </div>
      </div>
    );
  }
}
