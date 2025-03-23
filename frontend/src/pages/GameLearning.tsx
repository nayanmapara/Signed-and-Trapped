
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import TextAnimation from '@/components/ui/TextAnimation';
import { toast } from 'sonner';

// Questions based on the document
const questions = [
  {
    id: 1,
    question: "What must you do if you use someone's ideas directly in your work?",
    options: [
      "Nothing, ideas aren't copyrighted",
      "Give proper credit by citing sources",
      "Change a few words to make it your own",
      "Delete all reference to the original"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "According to the document, what is considered plagiarism?",
    options: [
      "Only copying word-for-word without citation",
      "Copying with citation",
      "Using multiple sources for research",
      "Presenting others' ideas or work as your own"
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    question: "What does the document say about citing sources?",
    options: [
      "Citations are optional for most work",
      "You must cite sources when using exact words or specific ideas",
      "Only direct quotes need citation",
      "You only need to cite books, not online sources"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What should you do when paraphrasing according to the document?",
    options: [
      "Copy the text but change a few words",
      "Use the exact same structure but different words",
      "Rewrite the information completely in your own words and still cite the source",
      "No citation is needed when paraphrasing"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the consequence of academic dishonesty mentioned in the document?",
    options: [
      "A verbal warning only",
      "Potential course failure or dismissal",
      "A small reduction in grade",
      "No consequences are mentioned"
    ],
    correctAnswer: 1
  }
];

const GameLearning = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return; // Prevent selecting after answer is shown
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer!");
    }
    
    // Move to next question after 2 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setGameCompleted(false);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <AnimatedContainer 
        className="container mx-auto px-4 max-w-4xl"
        animation="fadeIn"
      >
        <div className="mb-8">
          <Link to="/learn" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Options
          </Link>
        </div>

        <div className="mb-10 bg-card p-6 rounded-xl border border-primary/10">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Academic Integrity Document</h3>
              <p className="text-muted-foreground mb-4">
                Before starting the quiz, please review the academic integrity document that contains information about plagiarism, citations, and proper academic conduct.
              </p>
              <a 
                href="https://drive.google.com/file/d/1QX0Hpn9HJpkU3PNGLq4WuzuAAr6mjF9n/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-primary hover:underline"
              >
                View Document <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {gameCompleted ? (
          <AnimatedContainer 
            className="bg-card p-8 rounded-2xl border border-primary/10 text-center"
            animation="scale"
          >
            <TextAnimation 
              className="text-3xl md:text-4xl font-bold mb-6"
              text="Quiz Completed!"
              type="letters"
            />
            <div className="text-7xl font-bold mb-8 text-primary">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-muted-foreground mb-12">
              {score === questions.length 
                ? "Perfect! You've mastered academic integrity concepts." 
                : score >= questions.length / 2
                ? "Good effort! Review the document again to improve your understanding."
                : "You might need to review the document more carefully to understand academic integrity principles."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={resetGame} size="lg" className="rounded-full px-8">
                Try Again
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/learn">Try Different Style</Link>
              </Button>
            </div>
          </AnimatedContainer>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-sm font-medium">
                Score: {score}/{currentQuestion}
              </div>
            </div>

            <AnimatedContainer 
              className="bg-card p-8 rounded-2xl border border-primary/10 mb-8"
              animation="slideUp"
              key={currentQuestion}
            >
              <h2 className="text-2xl font-bold mb-6">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4 mt-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedAnswer === index 
                        ? showAnswer 
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-500/20 border-green-500/50'
                            : 'bg-red-500/20 border-red-500/50'
                          : 'bg-primary/20 border-primary/50'
                        : 'bg-card hover:bg-primary/10 border-primary/10'
                    }`}
                    disabled={showAnswer}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showAnswer && index === questions[currentQuestion].correctAnswer && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {showAnswer && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </AnimatedContainer>

            <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </>
        )}
      </AnimatedContainer>
    </div>
  );
};

export default GameLearning;
