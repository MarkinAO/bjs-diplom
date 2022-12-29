'use strict'
// Выход из личного кабинета
let userExit = new LogoutButton();

userExit.action = function() {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
        }    
    })
};

// Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success === true) {        
        ProfileWidget.showProfile(response.data);
    }
});

// Получение текущих курсов валюты
let currentExchangeRate = new RatesBoard;

currentExchangeRate.getCurrentExchangeRate = function () {
    ApiConnector.getStocks((response) => {        
        if (response.success === true) {
            currentExchangeRate.clearTable();
            currentExchangeRate.fillTable(response.data);
        }
    });
}

currentExchangeRate.getCurrentExchangeRate();
setInterval(currentExchangeRate.getCurrentExchangeRate(), 60000);

// Операции с деньгами
let moneyTransactions = new MoneyManager();

moneyTransactions.addMoneyCallback = function (data) {
    let message;
    ApiConnector.addMoney(data, (response) => {        
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            message = 'Баланс успешно пополнен';            
        } else {
            message = response.error;
        }
        moneyTransactions.setMessage(response.success, message);
    });
}

moneyTransactions.conversionMoneyCallback = function (data) {
    let message;
    ApiConnector.convertMoney(data, (response) => { 
        console.log(response);       
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            message = 'Валюты успешно конвертированы';            
        } else {
            message = response.error;
        }
        moneyTransactions.setMessage(response.success, message);
    });
}

moneyTransactions.sendMoneyCallback = function (data) {
    let message;
    ApiConnector.transferMoney(data, (response) => { 
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            message = 'Средства успешно переведены';            
        } else {
            message = response.error;
        }
        moneyTransactions.setMessage(response.success, message);
    });
}

// Работа с избранным
let workingFavorites = new FavoritesWidget;

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        workingFavorites.clearTable();
        workingFavorites.fillTable(response.data);
        moneyTransactions.updateUsersList(response.data);
    }
});

workingFavorites.addUserCallback = function(data) {
    let message;
    ApiConnector.addUserToFavorites(data, (response) => {
        console.log(response);
        if (response.success === true) {
            workingFavorites.clearTable();
            workingFavorites.fillTable(response.data);
            moneyTransactions.updateUsersList(response.data);
            message = 'Пользователь успешно добавлен';            
        } else {
            message = response.error;
        }
        workingFavorites.setMessage(response.success, message);
    });
}

workingFavorites.removeUserCallback = function(data) {
    let message;
    ApiConnector.removeUserFromFavorites(data, (response) => {
        console.log(response);
        if (response.success === true) {
            workingFavorites.clearTable();
            workingFavorites.fillTable(response.data);
            moneyTransactions.updateUsersList(response.data);
            message = 'Пользователь успешно удалён';            
        } else {
            message = response.error;
        }
        workingFavorites.setMessage(response.success, message);
    });
}
// console.log(response);