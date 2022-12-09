import { render, screen } from '@testing-library/react';
import Button from './';

it('Render Button component', () => {
	render(<Button type="button">Button Label</Button>);
	const buttonLabel = screen.getByText(/Button Label/i);
	expect(buttonLabel).toBeInTheDocument();
});
