// src/hooks/useQuizState.ts
import { useState, useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { useSound } from "./useSound";
import type { Quiz } from "../services/data";

export const useQuizState = (quizData: Quiz[]) => {
  const { playSound } = useSound();
  const [score, setScore] = useLocalStorage<number>("quizScore", 0);
  const [completedArray, setCompletedArray] = useLocalStorage<string[]>(
    "completedQuizzes",
    []
  );
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const completed = useMemo(() => new Set(completedArray), [completedArray]);

  const progress = useMemo(
    () => (completed.size / quizData.length) * 100,
    [completed.size, quizData.length]
  );

  const handleAnswer = useCallback(
    (quiz: Quiz, answer: string) => {
      if (!completed.has(quiz.question)) {
        const isCorrect = quiz.answer === answer;

        setScore((prev) => (isCorrect ? prev + 1 : prev));
        setFeedback((prev) => ({
          ...prev,
          [quiz.question]: isCorrect
            ? "🎉 Correct! Great job!"
            : "❌ Oops! Try again next time.",
        }));
        setCompletedArray((prev) => [...prev, quiz.question]);

        playSound(isCorrect ? "correct" : "incorrect");
      }
    },
    [completed, setScore, setCompletedArray, playSound]
  );

  const resetQuiz = useCallback(() => {
    setScore(0);
    setCompletedArray([]);
    setFeedback({});
    playSound("click");
  }, [setScore, setCompletedArray, playSound]);

  return {
    score,
    completed,
    feedback,
    progress,
    handleAnswer,
    resetQuiz,
  };
};