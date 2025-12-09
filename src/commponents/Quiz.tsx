import { useState } from "react";
import { BrainCircuit, CheckCircle, XCircle, Trophy, RefreshCw, ArrowRight } from "lucide-react";
import {  saveQuizAttempt } from "../services/quizeattempt"; // Services Import
import { getQuiz } from "../services/ai";

interface SummaryViewProps {
  noteId: string | undefined;
}

interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface IQuizData {
  quizId: string;
  questions: IQuestion[];
}

function Quiz({ noteId }: SummaryViewProps) {
  
  const [quizData, setQuizData] = useState<IQuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!noteId) return;
    setLoading(true);
    try {
      const res = await getQuiz(noteId);
      setQuizData({
        quizId: res.data.quizId,
        questions: res.data.questions
      });
      // Reset States
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizFinished(false);
      resetQuestionState();
    } catch (error) {
      console.error("Quiz Gen Error:", error);
      alert("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = async (option: string) => {
    if (isAnswerChecked || !quizData) return; 

    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    try {
      await saveQuizAttempt(quizData.quizId, {
        userAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
        quizIndex: currentQuestionIndex
      });
    } catch (error) {
      console.error("Failed to save attempt", error);
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return;

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  // --- UI RENDER ---

  // A. Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-purple-600">
        <RefreshCw className="animate-spin mb-2" size={32} />
        <p>Generating Quiz with AI...</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-purple-50 rounded-2xl border border-purple-100 p-8 text-center">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <BrainCircuit size={40} className="text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Test Your Knowledge</h2>
        <p className="text-gray-500 mb-6 max-w-md">Generate an AI-powered quiz based on your note content to reinforce learning.</p>
        <button 
          onClick={handleGenerateQuiz}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-purple-700 transition shadow-md"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="text-center p-10 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
          <Trophy size={48} className="text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-600 mb-6">You scored <span className="font-bold text-purple-600 text-xl">{score}</span> out of {quizData.questions.length}</p>
        
        <button 
          onClick={handleGenerateQuiz} 
          className="flex items-center gap-2 mx-auto bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
        >
          <RefreshCw size={18} /> Try Another Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Progress Bar */}
      <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
        <span>Question {currentQuestionIndex + 1} of {quizData.questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h3>

        {/* Options Grid */}
        <div className="grid gap-3">
          {currentQuestion.options.map((option, idx) => {
            
            let buttonClass = "border-gray-200 hover:bg-gray-50 hover:border-purple-300 text-gray-700"; // Default
            
            if (isAnswerChecked) {
              if (option === currentQuestion.correctAnswer) {
                buttonClass = "bg-green-100 border-green-500 text-green-800 font-medium"; 
              } else if (option === selectedOption) {
                buttonClass = "bg-red-100 border-red-500 text-red-800 font-medium"; 
              } else {
                buttonClass = "border-gray-100 text-gray-400 opacity-50"; 
              }
            } else if (selectedOption === option) {
               buttonClass = "bg-purple-50 border-purple-500 text-purple-700";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswerChecked} 
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${buttonClass}`}
              >
                <span>{option}</span>
                {isAnswerChecked && option === currentQuestion.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                {isAnswerChecked && option === selectedOption && option !== currentQuestion.correctAnswer && <XCircle size={20} className="text-red-600" />}
              </button>
            );
          })}
        </div>

        {isAnswerChecked && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-purple-700 transition shadow-lg animate-in fade-in slide-in-from-right-5"
            >
              {currentQuestionIndex + 1 === quizData.questions.length ? "Finish Quiz" : "Next Question"} <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Quiz;