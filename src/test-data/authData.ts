export const authData = {
    validUser: {
        userName: 'standard_user',
        password: 'secret_sauce',
    },
    problemUser: {
        userName: 'problem_user',
        password: 'secret_sauce',
    },
    performanceGlitchUser: {
        userName: 'performance_glitch_user',
        password: 'secret_sauce',
    },
    lockedOutUser: {
        userName: 'locked_out_user',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Sorry, this user has been locked out.'
    },
    invalidCredentials: {
        userName: 'wrong_user',
        password: 'wrong_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    },
    emptyUserName: {
        userName: '',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username is required'
    },
    emptyPassword: {
        userName: 'standard_user',
        password: '',
        errorMessage: 'Epic sadface: Password is required'
    },
    emptyFields: {
        userName: '',
        password: '',
        errorMessage: 'Epic sadface: Username is required'
    }
};
