import { render, screen } from '@testing-library/react';
import Forms from './Forms';

// test desactivation du bouton si les champs sont vides

test('should disable the button if the fields are empty', () => {
    render(<Forms />);
    const button = screen.getByRole('button', { name: /envoyer/i });
    expect(button).toBeDisabled();
});

// Test de sauvegarde dans le local storage

test('should save the form data in the local storage', () => {
    render(<Forms />);
    const lastNameInput = screen.getByTestId('lastName');
    const firstNameInput = screen.getByTestId('firstName');
    const emailInput = screen.getByTestId('email');
    const birthdayInput = screen.getByTestId('birthday');
    const cityInput = screen.getByTestId('city');
    const addressCodeInput = screen.getByTestId('addressCode');
    const button = screen.getByRole('button', { name: /envoyer/i });

    const lastName = 'Dalle';
    const firstName = 'Mickael';
    const email = 'micka@gmail.com';
    const birthday = '02/02/1994';
    const city = 'Grasse';
    const addressCode = '06130';

    lastNameInput.value = lastName;
    firstNameInput.value = firstName;
    emailInput.value = email;
    birthdayInput.value = birthday;
    cityInput.value = city;
    addressCodeInput.value = addressCode;

    button.click();

    const form = {
        lastName,
        firstName,
        email,
        birthday,
        city,
        addressCode,
    };

    const formInLocalStorage = JSON.parse(localStorage.getItem('form'));

    expect(formInLocalStorage).toEqual(form);
});
