import { render, screen } from '@testing-library/react';
import Input from './';

it('Render Input component', () => {
	render(<Input label="Input label" onChange={(e) => {}} />);
	const inputLabel = screen.getByText(/Input label/i);
	expect(inputLabel).toBeInTheDocument();
});
