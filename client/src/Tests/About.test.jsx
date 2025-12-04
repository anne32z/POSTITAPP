import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../Components/About.jsx';

describe("About Component", () => {

  it("should render heading", () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("should contain text 'about'", () => {
    render(<About />);
    const text = screen.queryByText(/about/i);
    expect(text).toBeInTheDocument();
  });

  it("should render the image with correct alt and class", () => {
    render(<About />);
    const image = screen.queryByAltText('devimage');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('userImage');
  });
});
