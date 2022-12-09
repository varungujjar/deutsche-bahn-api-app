import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Journeys from '../pages/Journeys';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Journeys />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
