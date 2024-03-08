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

/**
 * Composant Formulaires
 * @component
 */
const Forms = () => {
	// État local pour stocker les données du formulaire
	const [formData, setFormData] = useState({
		lastName: '',
		firstName: '',
		email: '',
		birthday: '',
		city: '',
		addressCode: '',
	});

	// État local pour gérer les erreurs de validation du formulaire
	const [error, setError] = useState({
		lastName: false,
		firstName: false,
		email: false,
		birthday: false,
		city: false,
		addressCode: false,
	});

	// État local pour afficher les messages de succès
	const [successMessage, setSuccessMessage] = useState(false);

	// État local pour afficher les messages d'erreur
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	/**
	 * Fonction de gestion du changement de champ de saisie
	 * @param {Object} e - Événement de changement
	 */
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

	/**
	 * Fonction de soumission du formulaire
	 * @param {Object} e - Événement de soumission du formulaire
	 */
	const handleSubmit = (e) => {
		e.preventDefault();

		if (Object.values(formData).some((value) => value.trim() === '')) {
			setErrorMessage('Veuillez remplir tous les champs.');
			setOpenSnackbar(true);
			return;
		}

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

	/**
	 * Fonction de fermeture du Snackbar de succès
	 * @param {Object} event - Événement
	 * @param {string} reason - Raison de la fermeture
	 */
	const handleSuccessSnackbarClose = (event, reason) => {
		setSuccessMessage(false);
	};

	/**
	 * Fonction de fermeture du Snackbar d'erreur
	 * @param {Object} event - Événement
	 * @param {string} reason - Raison de la fermeture
	 */
	const handleErrorSnackbarClose = (event, reason) => {
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
							name='firstName'
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

			<Snackbar
				open={successMessage}
				autoHideDuration={6000}
				onClose={handleSuccessSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				data-testid='success-snackbar'>
				<Alert
					role='alert'
					data-testid='success-alert'
					onClose={handleSuccessSnackbarClose}
					severity='success'>
					Formulaire envoyé avec succès
				</Alert>
			</Snackbar>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleErrorSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				data-testid='error-snackbar'>
				<Alert
					role='alert'
					data-testid='error-alert'
					onClose={handleErrorSnackbarClose}
					severity='error'>
					{errorMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Forms;
