import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ submitStatus }) => (
  <Button
    type="submit"
    variant="contained"
    size="medium"
    disabled={submitStatus === 'submitting'}
    className="submit-button"
  >
    {submitStatus === 'submitting' ? (
      <CircularProgress size={24} color="inherit" />
    ) : (
      'Next'
    )}
  </Button>
);

export default SubmitButton;
