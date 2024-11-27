import React from 'react';
import { Box, Chip } from '@mui/material';

const OptionsList = ({ options, selectedOptions, onOptionToggle }) => (
  <Box display="flex" flexWrap="wrap" gap={1}>
    {options.map((option) => (
      <Chip
        key={option}
        label={option}
        onClick={() => onOptionToggle(option)}
        color={selectedOptions[option] ? 'primary' : 'default'}
        clickable
        className={`option-chip ${selectedOptions[option] ? 'selected' : ''}`}
      />
    ))}
  </Box>
);

export default OptionsList;
