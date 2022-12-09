import { render, screen } from '@testing-library/react';
import Checkbox from './';

it('Render Checkbox component', () => {
	render(<Checkbox label="Test Checkbox" onChange={(e) => {}} />);
	const buttonLabel = screen.getByText(/Test Checkbox/i);
	expect(buttonLabel).toBeInTheDocument();
});
