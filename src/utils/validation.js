export const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    return age;
};

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

export const isFrenchPostalCodeValid = (postalCode) => {
	// Validation du format du code postal français (5 chiffres)
	const frenchPostalCodeRegex = /^[0-9]{5}$/;

	return frenchPostalCodeRegex.test(postalCode); // Retourne true si le code postal est valide
};

export const isLastNameAndFirstNameValid = (name) => {
	// Validation du nom/prenom : permet les lettres, accents, tréma, tiret, espace
	const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ \-'’]+$/;

	return nameRegex.test(name); // Retourne true si le nom/prénom est valide
};

export const isEmailValid = (email) => {
    // Validation de l'email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email); // Retourne true si l'email est valide
}


export const isButtonDisabled = (formData, error) => {
	return Object.values(formData).some((value) => value.trim() === '') || Object.values(error).some((value) => value); // Retourne true si un champ est vide ou si un champ est en erreur
};