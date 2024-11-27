import React from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";

const FormContainer = ({
  question,
  options,
  selectedOptions,
  onOptionToggle,
  onNext,
  onBack,
  isLastQuestion,
  isFirstQuestion,
}) => {
  return (
    <Box>
      {/* Question */}
      <Typography variant="h6" gutterBottom>
        {question}
      </Typography>

      {/* Options */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            clickable
            color={selectedOptions.includes(option) ? "primary" : "default"}
            onClick={() => onOptionToggle(option)}
          />
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Stack direction="row" justifyContent="space-between" marginTop={3}>
        {/* Back Button */}
        <Button
          variant="outlined"
          color="primary"
          disabled={isFirstQuestion}
          onClick={onBack}
        >
          Back
        </Button>

        {/* Next/Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </Stack>
    </Box>
  );
};

export default FormContainer;
