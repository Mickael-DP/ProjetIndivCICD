/**
 * Calcule l'âge à partir de la date de naissance.
 * @param {string} birthdate - La date de naissance au format JJ/MM/AAAA.
 * @returns {number} L'âge calculé.
 */
export const calculateAge = (birthdate) => {
	const birthDate = new Date(birthdate);
	const currentDate = new Date();

	const age = currentDate.getFullYear() - birthDate.getFullYear();

	return age;
};

/**
 * Vérifie si la date de naissance est valide (format et âge).
 * @param {string} dateOfBirth - La date de naissance au format JJ/MM/AAAA.
 * @returns {boolean} true si la date de naissance est valide, sinon false.
 */
export const isDateOfBirthValid = (dateOfBirth) => {
	// Validation du format de la date (JJ/MM/AAAA)
	const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

	if (!dateRegex.test(dateOfBirth)) {
		return false; // Format de date incorrect
	}

	// Validation de l'âge (doit être au moins -18 ans)
	const age = calculateAge(dateOfBirth);

	if (age < 18) {
		return false; // Moins de 18 ans
	}

	return true; // La date de naissance est valide
};

/**
 * Vérifie si le code postal français est valide (5 chiffres).
 * @param {string} postalCode - Le code postal à vérifier.
 * @returns {boolean} true si le code postal est valide, sinon false.
 */
export const isFrenchPostalCodeValid = (postalCode) => {
	// Validation du format du code postal français (5 chiffres)
	const frenchPostalCodeRegex = /^[0-9]{5}$/;

	return frenchPostalCodeRegex.test(postalCode); // Retourne true si le code postal est valide
};

/**
 * Vérifie si le nom et le prénom sont valides (lettres, accents, tréma, tiret, espace).
 * @param {string} name - Le nom ou le prénom à vérifier.
 * @returns {boolean} true si le nom ou le prénom est valide, sinon false.
 */
export const isLastNameAndFirstNameValid = (name) => {
	// Validation du nom/prenom : permet les lettres, accents, tréma, tiret, espace
	const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ \-'’]+$/;

	return nameRegex.test(name); // Retourne true si le nom/prénom est valide
};

/**
 * Vérifie si l'email est valide.
 * @param {string} email - L'email à vérifier.
 * @returns {boolean} true si l'email est valide, sinon false.
 */
export const isEmailValid = (email) => {
	// Validation de l'email
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	return emailRegex.test(email); // Retourne true si l'email est valide
};

/**
 * Vérifie si le bouton doit être désactivé en fonction des données du formulaire et des erreurs.
 * @param {Object} formData - Les données du formulaire.
 * @param {Object} error - Les erreurs de validation.
 * @returns {boolean} true si le bouton doit être désactivé, sinon false.
 */
export const isButtonDisabled = (formData, error) => {
	return (
		Object.values(formData).some((value) => value.trim() === '') ||
		Object.values(error).some((value) => value)
	); // Retourne true si un champ est vide ou si un champ est en erreur
};
