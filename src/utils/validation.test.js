import {
	isDateOfBirthValid,
	calculateAge,
	isFrenchPostalCodeValid,
	isLastNameAndFirstNameValid,
	isEmailValid,
} from './validation';

/**
 * Effectue des tests unitaires pour la fonction isDateOfBirthValid.
 * @test {isDateOfBirthValid}
 */
describe('isDateOfBirthValid', () => {
	/**
	 * Valide correctement et retourne true.
	 * @test {isDateOfBirthValid}
	 */
	it('validate correctly and return true', () => {
		const birthdate = '01/01/2000';

		const result = isDateOfBirthValid(birthdate);

		expect(result).toBe(true);
	});

	/**
	 * Calcule l'âge correctement.
	 * @test {isDateOfBirthValid}
	 * @test {calculateAge}
	 */
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

	/**
	 * Valide correctement et retourne true.
	 * @test {isDateOfBirthValid}
	 */
	it('validate correctly and return true', () => {
		// Choisir une date de naissance qui rend l'utilisateur majeur
		const birthdate = '01/01/2000';

		const result = isDateOfBirthValid(birthdate);

		expect(result).toBe(true);
	});

	/**
	 * Invalide en raison d'un âge inférieur à 18 ans et retourne false.
	 * @test {isDateOfBirthValid}
	 */
	it('invalidate due to age less than 18 and return false', () => {
		// Choisir une date de naissance qui rend l'utilisateur mineur
		const birthdate = '01/01/2010';

		const result = isDateOfBirthValid(birthdate);

		expect(result).toBe(false);
	});
});

/**
 * Effectue des tests unitaires pour la fonction isFrenchPostalCodeValid.
 * @test {isFrenchPostalCodeValid}
 */
describe('isFrenchPostalCodeValid', () => {
	/**
	 * Valide correctement et retourne true.
	 * @test {isFrenchPostalCodeValid}
	 */
	it('validate correctly and return true', () => {
		// Choisir un code postal français valide
		const postalCode = '75000';

		const result = isFrenchPostalCodeValid(postalCode);

		expect(result).toBe(true);
	});

	/**
	 * Invalide en raison d'un format incorrect et retourne false.
	 * @test {isFrenchPostalCodeValid}
	 */
	it('invalidate due to incorrect format and return false', () => {
		// Choisir un code postal français invalide
		const postalCode = '7500';

		const result = isFrenchPostalCodeValid(postalCode);

		expect(result).toBe(false);
	});
});

/**
 * Effectue des tests unitaires pour la fonction isLastNameAndFirstNameValid.
 * @test {isLastNameAndFirstNameValid}
 */
describe('isLastNameAndFirstNameValid', () => {
	/**
	 * Valide correctement et retourne true.
	 * @test {isLastNameAndFirstNameValid}
	 */
	it('validate correctly and return true', () => {
		// Choisir un nom/prénom valide
		const name = 'Jean';

		const result = isLastNameAndFirstNameValid(name);

		expect(result).toBe(true);
	});

	/**
	 * Invalide en raison d'un format incorrect et retourne false.
	 * @test {isLastNameAndFirstNameValid}
	 */
	it('invalidate due to incorrect format and return false', () => {
		// Choisir un nom/prénom invalide
		const name = 'Jean123';

		const result = isLastNameAndFirstNameValid(name);

		expect(result).toBe(false);
	});
});

/**
 * Effectue des tests unitaires pour la fonction isEmailValid.
 * @test {isEmailValid}
 */
describe('isEmailValid', () => {
	/**
	 * Valide correctement et retourne true.
	 * @test {isEmailValid}
	 */
	it('validate correctly and return true', () => {
		// Choisir un email valide
		const email = 'test@gmail.com';

		const result = isEmailValid(email);

		expect(result).toBe(true);
	});
});
