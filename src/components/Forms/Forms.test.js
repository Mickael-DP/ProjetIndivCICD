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
		fireEvent.change(inputs[3], { target: { value: '23/08/1993' } });
		fireEvent.change(inputs[4], { target: { value: 'Antibes' } });
		fireEvent.change(inputs[5], { target: { value: '06600' } });

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
				birthday: '23/08/1993',
				city: 'Antibes',
				addressCode: '06600',
			})
		);

		// Nettoyer le localStorage après le test pour éviter les interférences entre les tests
		localStorage.clear();
	});

});
