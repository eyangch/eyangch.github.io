import React from 'react';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import Courses from './pages/Courses.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout.tsx';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/courses" element={<Courses />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;