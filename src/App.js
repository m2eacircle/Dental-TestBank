// FIXED VERSION - Replace the nextQuestion function (lines 726-750)

const nextQuestion = () => {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const correctIndex = getCorrectAnswerIndex(currentQuestion);
  
  // FIX: Update answer at current index instead of always appending
  const newAnswers = [...answers];
  newAnswers[currentQuestionIndex] = selectedAnswer;
  setAnswers(newAnswers);
  
  // FIX: Update review data at current index instead of appending
  const newReviewAnswers = [...reviewAnswers];
  const reviewData = {
    question: currentQuestion,
    selectedAnswer: selectedAnswer,
    correctAnswer: correctIndex,
    isCorrect: selectedAnswer === correctIndex
  };
  newReviewAnswers[currentQuestionIndex] = reviewData;
  setReviewAnswers(newReviewAnswers);
  
  if (currentQuestionIndex < selectedQuestions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  } else {
    finishTest(newAnswers);
  }
};


// FIXED VERSION - Replace the Previous button onClick (lines 1628-1633)

onClick={() => {
  if (currentQuestionIndex > 0) {
    const previousIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(previousIndex);
    
    // FIX: Restore the previously selected answer if it exists
    setSelectedAnswer(answers[previousIndex] ?? null);
    
    // FIX: Restore submission state if answer was previously submitted
    setIsAnswerSubmitted(answers[previousIndex] !== null && answers[previousIndex] !== undefined);
  }
}}
