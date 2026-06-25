import { render, screen } from '@testing-library/react';
import { PlaceholderPage } from './PlaceholderPage';

describe('PlaceholderPage Component', () => {
  it('renders the title passed via props', () => {
    // 1. Render the component in our JSDOM environment
    render(<PlaceholderPage title="Test Title 123" />);
    
    // 2. Query the virtual DOM for our text
    const heading = screen.getByText('Test Title 123');
    
    // 3. Assert that it exists
    expect(heading).toBeInTheDocument();
  });
});