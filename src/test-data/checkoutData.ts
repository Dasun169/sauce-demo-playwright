export const checkoutData = {
    validUser1: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
    },
    validUser2: {
        firstName: 'Jane',
        lastName: 'Smith',
        postalCode: '98765'
    },
    validUser3: {
        firstName: 'Alice',
        lastName: 'Wonderland',
        postalCode: '11111'
    },
    validUserCancel: {
        firstName: 'Cancel',
        lastName: 'User',
        postalCode: '00000'
    },
    invalidUsers: {
        allEmpty: {
            firstName: '',
            lastName: '',
            postalCode: '',
            errorMessage: 'Error: First Name is required'
        },
        firstNameEmpty: {
            firstName: '',
            lastName: 'Doe',
            postalCode: '12345',
            errorMessage: 'Error: First Name is required'
        },
        lastNameEmpty: {
            firstName: 'John',
            lastName: '',
            postalCode: '12345',
            errorMessage: 'Error: Last Name is required'
        },
        postalCodeEmpty: {
            firstName: 'John',
            lastName: 'Doe',
            postalCode: '',
            errorMessage: 'Error: Postal Code is required'
        }
    }
};
