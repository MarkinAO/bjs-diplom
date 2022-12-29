'use strict'
let form = new UserForm();

form.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if (response.success === true) {
            location.reload();
        } else {
            let message = response.error;
            form.setLoginErrorMessage(message);
        }
    });
}

form.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {        
        if (response.success === true) {
            location.reload();
        } else {
            let message = response.error;
            form.setRegisterErrorMessage(message);
        }
    });
}