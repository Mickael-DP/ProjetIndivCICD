import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Forms from './components/Forms/Forms';

function App() {
	let [usersCount, setUsersCount] = useState(0);

	useEffect(() => {
		const port = process.env.REACT_APP_SERVER_PORT;
		console.log('port:', port);
		async function countUsers() {
			try {
				const api = axios.create({
					baseURL: `http://localhost:${port}`,
				});
				const response = await api.get(`/users`);
				setUsersCount(response.data.utilisateurs.length);
			} catch (error) {
				console.error(error);
			}
		}
		countUsers();
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Users manager: {usersCount}</h1>
				<p>{usersCount} users(s) already registered</p>
				<Forms />
			</header>
		</div>
	);
}

export default App;
