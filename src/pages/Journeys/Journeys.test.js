import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

import serviceApi from '../../service/axios';
import { locationResponse, journeysResponse } from './__mockResponse__';
import Journeys from './';

jest.mock('../../service/axios');
jest.setTimeout(6000);

beforeEach(() => {
	jest.clearAllMocks();
});

it('Test Journeys page with search query', async () => {
	const user = userEvent.setup();
	render(<Journeys />);

	/* Enters the origin name and selects the second element from the locations list*/
	serviceApi.get.mockResolvedValueOnce(locationResponse);

	const inputFrom = screen.getByLabelText('From');
	const fromDropdown = screen.getByTestId('from-dropdown');

	expect(fromDropdown).not.toBeVisible();
	await user.type(inputFrom, 'Munich');
	expect(fromDropdown).toBeVisible();
	expect(fromDropdown).toHaveTextContent(/Loading.../i);
	await waitFor(() => {
		expect(fromDropdown).toHaveTextContent(/Munich/i);
	});
	expect(serviceApi.get).toHaveBeenCalledTimes(1);
	const selectfirstItem = screen.getAllByTestId('from-row');
	await user.click(selectfirstItem[0]);
	expect(fromDropdown).not.toBeVisible();

	/* Enters the destination name and selects the second element from the locations list*/
	serviceApi.get.mockResolvedValueOnce(locationResponse);

	const inputTo = screen.getByLabelText('To');
	const toDropdown = screen.getByTestId('to-dropdown');

	expect(toDropdown).not.toBeVisible();
	await user.type(inputTo, 'Berlin');
	expect(toDropdown).toBeVisible();
	expect(toDropdown).toHaveTextContent(/Loading.../i);
	await waitFor(() => {
		expect(toDropdown).toHaveTextContent(/Berlin/i);
	});
	expect(serviceApi.get).toHaveBeenCalledTimes(2);
	const selectSecondItem = screen.getAllByTestId('to-row');
	await user.click(selectSecondItem[1]);
	expect(toDropdown).not.toBeVisible();

	/* Check if Depart By is the initial label of the Date & Time Picker */
	const inputDateTime = screen.getByLabelText('Depart by');

	/* On click lets check if the Date & Time Picker selection dropdown is visible */
	const datetimeDropdown = screen.getByTestId('datetime-dropdown');
	expect(datetimeDropdown).not.toBeVisible();
	fireEvent.click(inputDateTime);
	expect(datetimeDropdown).toBeVisible();

	/* Allow user to change the mode from Depart to Arrive and validate the change */
	const checkboxDepart = screen.getByRole('radio', { name: 'Depart By' });
	expect(checkboxDepart).toBeChecked;

	const checkboxArrive = screen.getByRole('radio', { name: 'Arrive By' });
	expect(checkboxArrive).not.toBeChecked;
	fireEvent.click(checkboxArrive);
	expect(checkboxArrive).toBeChecked;

	/* Check if mode is Arrive By and if the current date & time are visible in the input */
	const inputDateTimeArrive = screen.getByLabelText('Arrive by');
	expect(inputDateTimeArrive.value).toBe(moment(new Date()).format('DD MMM, HH:' + '00'));

	/* Dismiss the Date & Time Picker and check if the dropdown is now hidden */
	const buttonCloseDateTime = screen.getByRole('button', { name: 'Done' });
	fireEvent.click(buttonCloseDateTime);
	expect(datetimeDropdown).not.toBeVisible();

	/* Lets  Submit the search query and wait for results */
	serviceApi.get.mockResolvedValueOnce(journeysResponse);

	const buttonSubmit = screen.getByRole('button', { type: 'submit' });
	user.click(buttonSubmit);

	await waitFor(() => {
		const loadingJourneys = screen.getByTestId('journeys-loading');
		expect(loadingJourneys).toBeInTheDocument();
	});
	expect(serviceApi.get).toHaveBeenCalledTimes(3);

	await waitFor(() => {
		const resultsJourneys = screen.getByTestId('journeys-results');
		expect(resultsJourneys).toBeInTheDocument();
	});
});
