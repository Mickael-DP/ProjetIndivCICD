/**
 * Importation de React depuis la bibliothèque 'react'.
 * Importation des fonctions fireEvent, render, screen et waitFor depuis la bibliothèque '@testing-library/react'.
 * Importation du composant Forms depuis './Forms'.
 * @module
 * @name React
 * @name fireEvent
 * @name render
 * @name screen
 * @name waitFor
 * @name Forms
 */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Forms from './Forms';

/**
 * Description des tests pour le composant Forms.
 * @test {Forms}
 */

describe('Forms component', () => {
	/**
	 * Teste la désactivation du bouton de soumission lorsque les champs sont vides.
	 * @test {Forms}
	 */

	test('disables the submit button when fields are empty', () => {
		render(<Forms />);
		const submitButton = screen.getByTestId('submit');
		expect(submitButton).toBeDisabled();
	});

	/**
	 * Teste la sauvegarde des données utilisateur dans le localStorage lors d'une soumission réussie.
	 * @test {Forms}
	 */
	test('should save user data to localStorage on successful submission', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs valides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur de soumission réussie
		await screen.findByText('Formulaire envoyé avec succès');

		// Vérifier que les données ont été sauvegardées dans le localStorage
		const userData = localStorage.getItem('formData');
		expect(userData).not.toBeNull();

		const parsedData = JSON.parse(userData);
		expect(parsedData).toEqual(
			expect.objectContaining({
				firstName: 'Dupont',
				lastName: 'Jean',
				email: 'email@example.com',
				birthday: '02/02/1994',
				city: 'Grasse',
				addressCode: '06130',
			})
		);

		// Nettoyer le localStorage après le test pour éviter les interférences entre les tests
		localStorage.clear();
	});

	/**
	 * Teste l'affichage d'un toast de succès après une soumission réussie.
	 * @test {Forms}
	 */
	test('should display a success toast on successful submission', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs valides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur de soumission réussie
		await screen.findByText('Formulaire envoyé avec succès');
	});

	/**
	 * Teste la réinitialisation des champs après une soumission réussie.
	 * @test {Forms}
	 */
	test('should clear the fields on successful submission', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs valides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur de soumission réussie
		await screen.findByText('Formulaire envoyé avec succès');

		// Vérifier que les champs sont vides
		const emptyInputs = screen.getAllByDisplayValue('');
		expect(emptyInputs).toHaveLength(6);
	});

	/**
	 * Teste l'affichage d'un toast d'erreur et des erreurs correspondantes en rouge.
	 * @test {Forms}
	 */
	test('should display an error toast and corresponding errors in red', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs invalides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: '123' } });
		fireEvent.change(inputs[1], { target: { value: '456' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur d'erreur
		await screen.findByText(
			'Le nom et le prénom ne doivent contenir que des lettres.'
		);

		// Vérifier que l'alerte est affichée en rouge lorsqu'une erreur est présente
		const errorAlert = screen.getByTestId('error-alert');
		expect(errorAlert).toHaveStyle('background-color: #fdeded');
	});

	/**
	 * Teste l'affichage d'un toast d'erreur lorsqu'un champ est vide.
	 * @test {Forms}
	 */
	test('should display an error toast when a field is empty', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs valides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: ' ' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur d'erreur
		await screen.findByText('Veuillez remplir tous les champs.');

		// Vérifier que l'alerte est affichée en rouge lorsqu'une erreur est présente
		const errorAlert = screen.getByTestId('error-alert');
		expect(errorAlert).toHaveStyle('background-color: #fdeded');
	});

	/**
	 * Teste l'affichage d'un toast d'erreur lorsque le nom ou le prénom contient autre chose que des lettres.
	 * @test {Forms}
	 */
	test('should display an error toast when a name or surname contains non-letters', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs invalides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: '123' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur d'erreur
		await screen.findByText(
			'Le nom et le prénom ne doivent contenir que des lettres.'
		);

		// Vérifier que l'alerte est affichée en rouge lorsqu'une erreur est présente
		const errorAlert = screen.getByTestId('error-alert');
		expect(errorAlert).toHaveStyle('background-color: #fdeded');
	});

	/**
	 * Teste l'affichage d'un toast d'erreur lorsque le code postal n'est pas au format français.
	 * @test {Forms}
	 */ /**
	 * Teste l'affichage d'un toast d'erreur lorsque le code postal n'est pas au format français.
	 * @test {Forms}
	 */
	test('should display an error toast when a postal code is not in French format', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs invalides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: 'B6130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur d'erreur
		await screen.findByText(
			'Le code postal doit être au format français (5 chiffres).'
		);

		// Vérifier que l'alerte est affichée en rouge lorsqu'une erreur est présente
		const errorAlert = screen.getByTestId('error-alert');
		expect(errorAlert).toHaveStyle('background-color: #fdeded');
	});

	/**
	 * Teste l'affichage d'un toast d'erreur lorsque l'email n'est pas valide.
	 * @test {Forms}
	 */
	test('should display an error toast when an email is not valid', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs invalides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'efzf' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur d'erreur
		await screen.findByText("L'email n'est pas valide");

		// Vérifier que l'alerte est affichée en rouge lorsqu'une erreur est présente
		const errorAlert = screen.getByTestId('error-alert');
		expect(errorAlert).toHaveStyle('background-color: #fdeded');
	});

	/**
	 * Teste l'affichage d'un toast d'erreur lorsque la date de naissance n'est pas valide.
	 * @test {Forms}
	 */
	test('should display an error toast when a date of birth is not valid', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs invalides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/2022' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur d'erreur
		await screen.findByText(
			"La date de naissance n'est pas valide. Assurez-vous d'avoir au moins 18 ans."
		);

		// Vérifier que l'alerte est affichée en rouge lorsqu'une erreur est présente
		const errorAlert = screen.getByTestId('error-alert');
		expect(errorAlert).toHaveStyle('background-color: #fdeded');
	});

	/**
	 * Teste la fonctionnalité de la snackbar de succès.
	 * @test {Forms}
	 */
	test('should function success snackbar', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs valides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur de soumission réussie
		await screen.findByText('Formulaire envoyé avec succès');

		// Vérifier que la snackbar de succès est affichée
		const successSnackbar = screen.getByTestId('success-snackbar');
		expect(successSnackbar).toBeInTheDocument();
	});

	/**
	 * Teste la fonctionnalité de la snackbar d'erreur.
	 * @test {Forms}
	 */
	test('should function error snackbar', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs invalides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: '123' } });
		fireEvent.change(inputs[1], { target: { value: '456' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Attendre un indicateur d'erreur
		await screen.findByText(
			'Le nom et le prénom ne doivent contenir que des lettres.'
		);

		// Vérifier que la snackbar d'erreur est affichée
		const errorSnackbar = screen.getByTestId('error-snackbar');
		expect(errorSnackbar).toBeInTheDocument();
	});

	/**
	 * Teste la fermeture de la snackbar d'erreur lorsqu'elle est appelée avec une raison valide.
	 * @test {Forms}
	 */
	test('should close the error snackbar when called with a valid reason', () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs invalides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: '123' } });
		fireEvent.change(inputs[1], { target: { value: '456' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Simuler l'ouverture du snackbar d'erreur
		fireEvent.change(screen.getByTestId('error-snackbar'), {
			target: { open: true },
		});

		// Vérifier que le snackbar d'erreur est ouvert
		expect(screen.getByTestId('error-snackbar')).toBeInTheDocument(
			'open',
			'true'
		);

		// Appeler la fonction handleErrorSnackbarClose avec une raison valide
		fireEvent.click(screen.getByTitle('Close').firstChild);

		// Vérifier que le snackbar d'erreur est fermé
		expect(screen.getByTestId('error-alert')).toBeInTheDocument(
			'open',
			'false'
		);
	});

	/**
	 * Teste la fermeture de la snackbar de succès lorsqu'elle est appelée avec une raison valide.
	 * @test {Forms}
	 */
	test('should close the success snackbar when called with a valid reason', () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs valides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Simuler l'ouverture du snackbar de succès
		fireEvent.change(screen.getByTestId('success-snackbar'), {
			target: { open: true },
		});

		// Vérifier que le snackbar de succès est ouvert
		expect(screen.getByTestId('success-snackbar')).toBeInTheDocument(
			'open',
			'true'
		);

		// Appeler la fonction handleSuccessSnackbarClose avec une raison valide
		fireEvent.click(screen.getByTitle('Close').firstChild);

		// Vérifier que le snackbar de succès est fermé
		expect(screen.getByTestId('success-alert')).toBeInTheDocument(
			'open',
			'false'
		);
	});

	/**
	 * Teste la fermeture intentionnelle de la snackbar de succès par l'utilisateur.
	 * @test {Forms}
	 */
	test('should close the success snackbar when intentionally closed by the user', async () => {
		render(<Forms />);

		// Remplir tous les champs du formulaire avec des valeurs valides
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'Jean' } });
		fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
		fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
		fireEvent.change(inputs[3], { target: { value: '02/02/1994' } });
		fireEvent.change(inputs[4], { target: { value: 'Grasse' } });
		fireEvent.change(inputs[5], { target: { value: '06130' } });

		// Soumettre le formulaire
		fireEvent.submit(screen.getByText('Envoyer'));

		// Ouvrir le Snackbar de succès en le rendant visible
		fireEvent.change(screen.getByTestId('success-snackbar'), {
			target: { open: true },
		});

		// Vérifier que le Snackbar de succès est ouvert
		expect(screen.getByTestId('success-snackbar')).toBeInTheDocument();

		// Fermer le Snackbar de succès en simulant un clic sur le bouton de fermeture
		fireEvent.click(screen.getByTitle('Close').firstChild);

		// Vérifier que le Snackbar de succès n'est plus dans le DOM
		await waitFor(() => {
			expect(screen.queryByTestId('success-snackbar')).toBeNull();
		});
	});
});
