import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface QuizCardProps {
  quiz: {
    question: string;
    answer: string;
    options: string[];
  };
  index: number;
  completed: Set<string>;
  feedback?: string;
  handleAnswer: (quiz: any, answer: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  index,
  completed,
  feedback,
  handleAnswer,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    style={{ width: "100%", maxWidth: 600 }}>
    <Box
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: completed.has(quiz.question)
          ? feedback?.includes("Correct")
            ? "rgba(102, 187, 106, 0.15)" // Soft green for correct
            : "rgba(239, 83, 80, 0.15)" // Soft red for incorrect
          : "background.paper",
        border: `2px solid ${
          completed.has(quiz.question)
            ? feedback?.includes("Correct")
              ? "#66bb6a" // Green border for correct
              : "#ef5350" // Red border for incorrect
            : "transparent"
        }`,
        transition: "all 0.3s ease",
      }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          color: "text.primary",
          fontWeight: 700,
          fontSize: "1.5rem",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}>
        {quiz.question}
        {completed.has(quiz.question) &&
          (feedback?.includes("Correct") ? (
            <CheckCircleIcon sx={{ color: "#66bb6a", fontSize: 32 }} />
          ) : (
            <CancelIcon sx={{ color: "#ef5350", fontSize: 32 }} />
          ))}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
        }}>
        {quiz.options.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswer(quiz, option)}
            disabled={completed.has(quiz.question)}
            variant="contained"
            color={
              completed.has(quiz.question)
                ? quiz.answer === option
                  ? "success"
                  : "error"
                : "primary"
            }
            sx={{
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: 1.1,
              borderRadius: 2,
              transform: "scale(1)",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 3,
              },
              "&:disabled": {
                opacity: 0.9,
                ...(quiz.answer === option && {
                  border: "2px solid #66bb6a",
                  backgroundColor: "rgba(102, 187, 106, 0.1)",
                }),
                ...(quiz.answer !== option && {
                  border: "2px solid #ef5350",
                  backgroundColor: "rgba(239, 83, 80, 0.1)",
                }),
              },
            }}>
            {option}
          </Button>
        ))}
      </Box>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <Typography
            sx={{
              mt: 2,
              px: 2,
              py: 1,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: feedback.includes("Correct")
                ? "rgba(102, 187, 106, 0.2)"
                : "rgba(239, 83, 80, 0.2)",
              color: feedback.includes("Correct") ? "#2e7d32" : "#c62828",
              fontWeight: 700,
            }}>
            {feedback.includes("Correct") ? (
              <CheckCircleIcon sx={{ fontSize: 24 }} />
            ) : (
              <CancelIcon sx={{ fontSize: 24 }} />
            )}
            {feedback}
          </Typography>
        </motion.div>
      )}
    </Box>
  </motion.div>
);

export default QuizCard;
