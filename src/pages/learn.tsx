import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "../services/data";
import QuizProgress from "../components/QuizProgress";
import useQuizState from "../hooks/useQuizState";
import QuizCard from "../components/QuizCard";

export default function Learn() {
  const { score, completed, feedback, handleAnswer, resetQuiz } =
    useQuizState();
  const currentScore = `${score}/${quizData.length}`;
  const progress = (completed.size / quizData.length) * 100;

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
