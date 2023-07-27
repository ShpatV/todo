import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateTask from './CreateTask';

test('renders CreateTask component correctly', () => {
  render(<CreateTask />);
  const submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
});
