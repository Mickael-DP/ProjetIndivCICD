import {
	isDateOfBirthValid,
	calculateAge,
	isFrenchPostalCodeValid,
	isLastNameAndFirstNameValid,
	isEmailValid,
} from './validation';

describe('isDateOfBirthValid', () => {
	it('calculates age correctly', () => {
		const birthdate = '01/01/2000';
		const currentDate = new Date('01/01/2024');

		// Modification du calcul de l'âge attendu
		const birthYear = new Date(birthdate).getFullYear();
		const currentYear = currentDate.getFullYear();
		const expectedAge = currentYear - birthYear;

		// Appel de la fonction et comparaison avec l'âge attendu
		const result = calculateAge(birthdate);

		expect(result).toEqual(expectedAge);
	});

	it('validate correctly and return true', () => {
		// Choisir une date de naissance qui rend l'utilisateur majeur
		const birthdate = '01/01/2000';

		const result = isDateOfBirthValid(birthdate);

		expect(result).toBe(true);
	});

	it('invalidate due to age less than 18 and return false', () => {
		// Choisir une date de naissance qui rend l'utilisateur mineur
		const birthdate = '01/01/2010';

		const result = isDateOfBirthValid(birthdate);

		expect(result).toBe(false);
	});
});

// Test pour les formats dans mon formulaire

describe('isFrenchPostalCodeValid', () => {
	it('validate correctly and return true', () => {
		// Choisir un code postal français valide
		const postalCode = '75000';

		const result = isFrenchPostalCodeValid(postalCode);

		expect(result).toBe(true);
	});

	it('invalidate due to incorrect format and return false', () => {
		// Choisir un code postal français invalide
		const postalCode = '7500';

		const result = isFrenchPostalCodeValid(postalCode);

		expect(result).toBe(false);
	});
});

describe('isLastNameAndFirstNameValid', () => {
	it('validate correctly and return true', () => {
		// Choisir un nom/prénom valide
		const name = 'Jean';

		const result = isLastNameAndFirstNameValid(name);

		expect(result).toBe(true);
	});

	it('invalidate due to incorrect format and return false', () => {
		// Choisir un nom/prénom invalide
		const name = 'Jean123';

		const result = isLastNameAndFirstNameValid(name);

		expect(result).toBe(false);
	});
});

describe('isEmailValid', () => {
	it('validate correctly and return true', () => {
		// Choisir un email valide
		const email = 'test@gmail.com';

		const result = isEmailValid(email);

		expect(result).toBe(true);
	});
});
