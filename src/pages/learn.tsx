import React, { useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "../services/data";
import QuizProgress from "../components/QuizProgress";
import QuizCard from "../components/QuizCard";
import { LiveAnnouncer } from "../components/LiveAnnouncer";
import { useQuizState } from "../hooks/useQuizState";

export default function Learn() {
  const { score, completed, feedback, progress, handleAnswer, resetQuiz } =
    useQuizState(quizData);

  const currentScore = useMemo(
    () => `${score}/${quizData.length}`,
    [score, quizData.length]
  );

  const latestFeedback = useMemo(
    () => Object.values(feedback).slice(-1)[0] || "",
    [feedback]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        padding: { xs: 2, md: 4 },
        gap: 4,
        position: "relative",
      }}>
      <LiveAnnouncer message={latestFeedback} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          🚀 Quiz Time!
        </Typography>
        <QuizProgress currentScore={currentScore} progress={progress} />
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, mb: 4 }}
          onClick={resetQuiz}
          aria-label="Reset quiz and clear progress">
          Reset Quiz
        </Button>
      </motion.div>

      <AnimatePresence initial={false}>
        {quizData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <Typography variant="h4" component="p">
              No quizzes available! 🧐
            </Typography>
          </motion.div>
        ) : (
          quizData.map((quiz, index) => (
            <QuizCard
              key={quiz.question}
              quiz={quiz}
              index={index}
              completed={completed}
              feedback={feedback[quiz.question]}
              handleAnswer={handleAnswer}
            />
          ))
        )}
      </AnimatePresence>
    </Box>
  );
}
