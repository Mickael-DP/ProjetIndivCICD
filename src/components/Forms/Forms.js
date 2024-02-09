import React, { useState } from 'react';
import {
	Button,
	TextField,
	Container,
	Grid,
	Typography,
	Snackbar,
	Alert,
} from '@mui/material';
import {
	isDateOfBirthValid,
	isEmailValid,
	isFrenchPostalCodeValid,
	isLastNameAndFirstNameValid,
	isButtonDisabled,
} from '../../utils/validation';

const Forms = () => {
	const [formData, setFormData] = useState({
		lastName: '',
		firstName: '',
		email: '',
		birthday: '',
		city: '',
		addressCode: '',
	});

	const [error, setError] = useState({
		lastName: false,
		firstName: false,
		email: false,
		birthday: false,
		city: false,
		addressCode: false,
	});

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		setError({
			...error,
			[name]: value.trim() === '',
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isDateOfBirthValid(formData.birthday)) {
			setErrorMessage(
				"La date de naissance n'est pas valide. Assurez-vous d'avoir au moins 18 ans."
			);
			setOpenSnackbar(true);
			return;
		}

		if (!isFrenchPostalCodeValid(formData.addressCode)) {
			setErrorMessage(
				'Le code postal doit être au format français (5 chiffres).'
			);
			setOpenSnackbar(true);
			return;
		}

		if (
			!isLastNameAndFirstNameValid(formData.lastName) ||
			!isLastNameAndFirstNameValid(formData.firstName)
		) {
			setErrorMessage(
				'Le nom et le prénom ne doivent contenir que des lettres.'
			);
			setOpenSnackbar(true);
			return;
		}

		if (!isEmailValid(formData.email)) {
			setErrorMessage("L'email n'est pas valide");
			setOpenSnackbar(true);
			return;
		}

		localStorage.setItem('formData', JSON.stringify(formData));
		console.log('Données du formulaire:', formData);

		setSuccessMessage('Formulaire envoyé');
		setFormData({
			lastName: '',
			firstName: '',
			email: '',
			birthday: '',
			city: '',
			addressCode: '',
		});
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbar(false);
	};

	const handleSuccessSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSuccessMessage(false);
	};

	return (
		<Container maxWidth='md'>
			<Typography
				variant='h4'
				align='center'
				gutterBottom>
				Mon Formulaire
			</Typography>
			<form
				onSubmit={handleSubmit}
				data-testid='form'>
				<Grid
					container
					spacing={2}>
					<Grid
						item
						xs={12}
						sm={6}>
						<TextField
							data-testid='lastName'
							fullWidth
							label='Nom'
							placeholder='Nom'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							error={error.lastName}
							required
							aria-label='Nom'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}>
						<TextField
							data-testid='firstName'
							fullWidth
							label='Prénom'
							placeholder='Prénom'
							name='firstName' // Ajout de l'attribut name
							value={formData.firstName}
							onChange={handleChange}
							error={error.firstName}
							required
							aria-label='Prénom'
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
							data-testid='email'
							fullWidth
							type='text'
							label='Email'
							placeholder='Email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							error={!isEmailValid(formData.email)}
							required
							aria-label='Email'
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
							data-testid='birthday'
							fullWidth
							label='Date de naissance'
							placeholder='JJ/MM/AAAA'
							name='birthday'
							value={formData.birthday}
							onChange={handleChange}
							required
							error={!isDateOfBirthValid(formData.birthday)}
							aria-label='Date de naissance'
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
							data-testid='city'
							fullWidth
							label='Ville'
							placeholder='Ville'
							name='city'
							value={formData.city}
							onChange={handleChange}
							required
							aria-label='Ville'
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
							data-testid='addressCode'
							fullWidth
							label='Code postal'
							placeholder='Code postal'
							name='addressCode'
							value={formData.addressCode}
							onChange={handleChange}
							required
							error={!isFrenchPostalCodeValid(formData.addressCode)}
							aria-label='Code postal'
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<Button
							data-testid='submit'
							name='submit'
							type='submit'
							variant='contained'
							color='primary'
							disabled={isButtonDisabled(formData, error)}>
							Envoyer
						</Button>
					</Grid>
				</Grid>
			</form>

			{/* Snackbar de succès */}
			<Snackbar
				open={successMessage}
				autoHideDuration={6000}
				onClose={handleSuccessSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				data-testid='success-snackbar'>
				<Alert
					data-testid='success-alert'
					onClose={handleSuccessSnackbarClose}
					severity='success'>
					Formulaire envoyé avec succès
				</Alert>
			</Snackbar>

			{/* Snackbar d'erreur */}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='error'>
					{errorMessage || 'Veuillez remplir les champs obligatoires.'}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Forms;
