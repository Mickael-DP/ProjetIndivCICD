import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Forms from './Forms';

describe('Forms component', () => {
	test('disables the submit button when fields are empty', () => {
		render(<Forms />);
		const submitButton = screen.getByTestId('submit');
		expect(submitButton).toBeDisabled();
	});

	// Tester la sauvegarde des données utilisateur dans le localStorage lors d'une soumission réussie
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

	// Test du toast de succes après une soumission réussie

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

	// Tester que les champs sont vidé après une soumission réussie

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

	// Tester que le toast d'erreur et les erreurs correspondantes en rouge

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
});
