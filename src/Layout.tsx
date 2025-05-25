import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main id="main" className="flex-grow">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;