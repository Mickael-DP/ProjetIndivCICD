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
		adreesCode: '',
	});

	const [error, setError] = useState({
		lastName: false,
		firstName: false,
		email: false,
		birthday: false,
		city: false,
		adreesCode: false,
	});

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

		setError({
			...error,
			[e.target.name]: e.target.value.trim() === '',
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isDateOfBirthValid(formData.birthday)) {
			setErrorMessage(
				"La date de naissance n'est pas valide. Assurez-vous d'avoir au moins 18 ans."
			);
			// Logique de validation de la date de naissance, afficher le toaster d'erreur si la date n'est pas valide
			setOpenSnackbar(true);
			return;
		}

		if (!isFrenchPostalCodeValid(formData.adreesCode)) {
			// Logique de validation du code postal français
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
			// Logique de validation du nom et prénom
			setErrorMessage(
				'Le nom et le prénom ne doivent contenir que des lettres.'
			);
			setOpenSnackbar(true);
			return;
		}

		if (!isEmailValid(formData.email)) {
			// Logique de validation du mail
			setErrorMessage("L'email n'est pas valide");
			setOpenSnackbar(true);
			return;
		}

		localStorage.setItem('formData', JSON.stringify(formData));
		console.log('Données du formulaire:', formData);

		setFormData({
			lastName: '',
			firstName: '',
			email: '',
			birthday: '',
			city: '',
			adreesCode: '',
		});
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbar(false);
	};

	return (
		<Container maxWidth='md'>
			<Typography
				variant='h4'
				align='center'
				gutterBottom>
				Mon Formulaire
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					spacing={2}>
					<Grid
						item
						xs={12}
						sm={6}>
						<TextField
                            data-testid="lastName"
							fullWidth
							label='Nom'
							name='lastName'
							placeholder='Nom'
							value={formData.lastName}
							onChange={handleChange}
							error={error.lastName}
							required
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}>
						<TextField
                            data-testid="firstName"
							fullWidth
							label='Prenom'
							name='firstName'
							placeholder='Prénom'
							value={formData.firstName}
							onChange={handleChange}
							error={error.firstName}
							required
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
                            data-testid="email"
							fullWidth
							type='text'
							label='Email'
							name='email'
							placeholder='Email'
							value={formData.email}
							onChange={handleChange}
							error={!isEmailValid(formData.email)}
							required
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
                            data-testid="birthday"
							fullWidth
							label='Date de naissance'
							name='birthday'
							placeholder='JJ/MM/AAAA'
							value={formData.birthday}
							onChange={handleChange}
							required
							error={!isDateOfBirthValid(formData.birthday)}
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
                            data-testid="city"
							fullWidth
							label='Ville'
							name='city'
							placeholder='Ville'
							value={formData.city}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextField
                            data-testid="addressCode"
							fullWidth
							label='Code postal'
							name='adreesCode'
							placeholder='Code postal'
							value={formData.adreesCode}
							onChange={handleChange}
							required
							error={!isFrenchPostalCodeValid(formData.adreesCode)}
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<Button
                            name="submit"
							type='submit'
							variant='contained'
							color='primary'
							disabled={isButtonDisabled(formData, error)}>
							Envoyer
						</Button>
					</Grid>
				</Grid>
			</form>

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
