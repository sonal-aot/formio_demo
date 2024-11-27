import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import theme from "./theme";
import LoadingScreen from "./components/LoadingScreen";
import FormContainer from "./components/FormContainer";

const App = () => {
  const [questions, setQuestions] = useState([]); // All questions from the API
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    error: null,
  });
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected options for all questions

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/data");
        setQuestions(response.data.questions); // Assuming API returns the `questions` array
        setLoadingState({ isLoading: false, error: null });
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoadingState({
          isLoading: false,
          error: "Failed to load questions. Please try again later.",
        });
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionToggle = (option) => {
    const questionKey = `question-${currentQuestionIndex}`;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionKey]: prev[questionKey]?.includes(option)
        ? prev[questionKey].filter((opt) => opt !== option)
        : [...(prev[questionKey] || []), option],
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit(); // Submit all answers at the end
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting selected answers:", selectedAnswers);

    try {
      const response = await axios.post("http://localhost:4000/submit", selectedAnswers);
      console.log("Submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  if (loadingState.isLoading) {
    return <LoadingScreen />;
  }

  if (loadingState.error) {
    return <div>{loadingState.error}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box padding={2}>
          <FormContainer
            question={questions[currentQuestionIndex]?.question}
            options={questions[currentQuestionIndex]?.options || []}
            selectedOptions={selectedAnswers[`question-${currentQuestionIndex}`] || []}
            onOptionToggle={handleOptionToggle}
            onNext={handleNext}
            onBack={handleBack}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            isFirstQuestion={currentQuestionIndex === 0}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
