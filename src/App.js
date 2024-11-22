import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import { 
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Chip
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    }
  },
});

function App() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:4000/data')
      .then((response) => {
        const { question, options } = response.data;
        setQuestion(question);
        setOptions(options);
        const initialSelected = options.reduce((acc, option) => {
          acc[option] = false;
          return acc;
        }, {});
        setSelectedOptions(initialSelected);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load form data');
        setIsLoading(false);
      });
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const selectedHobbies = Object.entries(selectedOptions)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    setSubmitStatus('submitting');
    
    axios
      .post('http://localhost:4000/data', { selectedHobbies })
      .then((response) => {
        console.log('Submitted successfully:', response.data);
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus(null), 3000);
      })
      .catch((error) => {
        console.error('Error submitting:', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 3000);
      });
  };

  if (isLoading) {
    return (
      <Container>
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box className="form-container">
          <Paper className="form-paper">
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              align="center" 
              color="primary"
              className="form-title"
            >
              Form Demo
            </Typography>
            
            {error && (
              <Alert severity="error" className="error-alert">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Typography 
                variant="h6" 
                gutterBottom 
                className="question-text"
              >
                {question}
              </Typography>

              <Box className="options-container">
                {options.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    onClick={() => handleOptionClick(option)}
                    className={`option-chip ${selectedOptions[option] ? 'selected' : ''}`}
                  />
                ))}
              </Box>

              <Stack spacing={2}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  disabled={submitStatus === 'submitting'}
                  className="submit-button"
                >
                  {submitStatus === 'submitting' ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Submit'
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <Alert severity="success" className="status-alert">
                    Form submitted successfully!
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert severity="error" className="status-alert">
                    Failed to submit form. Please try again.
                  </Alert>
                )}
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;