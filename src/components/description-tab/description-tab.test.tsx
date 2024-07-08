import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DescriptionTab from './description-tab';

describe('DescriptionTab', () => {
  it('renders the description text', () => {
    const description = 'This is a test description.';

    render(<DescriptionTab description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
