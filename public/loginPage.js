'use strict'
let form = new UserForm();

form.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            form.setLoginErrorMessage(response.error);
        }
    });
}

form.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {        
        if (response.success) {
            location.reload();
        } else {
            form.setRegisterErrorMessage(response.error);
        }
    });
}