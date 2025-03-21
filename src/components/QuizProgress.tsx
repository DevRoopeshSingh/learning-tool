import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

interface QuizProgressProps {
  progress: number;
  currentScore: string;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  progress,
  currentScore,
}) => (
  <Box sx={{ width: "100%", mb: 4 }}>
    <LinearProgress variant="determinate" value={progress} />
    <Typography variant="h6" sx={{ mt: 1 }}>
      Score: {currentScore}
    </Typography>
  </Box>
);

export default QuizProgress;
