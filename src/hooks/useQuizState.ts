// src/hooks/useQuizState.ts
import { useState, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

interface Quiz {
  question: string;
  answer: string;
  options: string[];
}

interface QuizState {
  score: number;
  completed: Set<string>;
  feedback: Record<string, string>;
  handleAnswer: (quiz: Quiz, answer: string) => void;
  resetQuiz: () => void;
}

export default function useQuizState(): QuizState {
  const [score, setScore] = useLocalStorage<number>("quizScore", 0);
  const [completedArray, setCompletedArray] = useLocalStorage<string[]>(
    "completedQuizzes",
    []
  );
  const completed = new Set(completedArray); // Convert array to Set
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const handleAnswer = useCallback(
    (quiz: Quiz, answer: string) => {
      if (!completed.has(quiz.question)) {
        if (quiz.answer === answer) {
          setScore((prevScore: number) => prevScore + 1);
          setFeedback((prevFeedback: Record<string, string>) => ({
            ...prevFeedback,
            [quiz.question]: "🎉 Correct! Great job!",
          }));
        } else {
          setFeedback((prevFeedback: Record<string, string>) => ({
            ...prevFeedback,
            [quiz.question]: "❌ Oops! Try again next time.",
          }));
        }
        setCompletedArray((prev) => [...prev, quiz.question]);
      }
    },
    [completed, setScore, setCompletedArray]
  );

  const resetQuiz = useCallback(() => {
    setScore(0);
    setCompletedArray([]);
    setFeedback({});
  }, [setScore, setCompletedArray]);

  return { score, completed, feedback, handleAnswer, resetQuiz };
}
