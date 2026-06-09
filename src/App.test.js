import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the shopping cart app', () => {
  const { getByText } = render(<App />);
  expect(getByText(/all rights reserved/i)).toBeInTheDocument();
});
