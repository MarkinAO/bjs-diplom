'use strict'
// Выход из личного кабинета
let userExit = new LogoutButton();

userExit.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }    
    })
};

// Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success) {        
        ProfileWidget.showProfile(response.data);
    }
});

// Получение текущих курсов валюты
let currentExchangeRate = new RatesBoard;

currentExchangeRate.getCurrentExchangeRate = function () {
    ApiConnector.getStocks((response) => {        
        if (response.success) {
            currentExchangeRate.clearTable();
            currentExchangeRate.fillTable(response.data);
        }
    });
}

currentExchangeRate.getCurrentExchangeRate();
setInterval(() => currentExchangeRate.getCurrentExchangeRate(), 60000);

// Операции с деньгами
let moneyTransactions = new MoneyManager();

moneyTransactions.addMoneyCallback = function (data) {    
    ApiConnector.addMoney(data, (response) => {        
        if (response.success) {
            ProfileWidget.showProfile(response.data);         
        }

        let message = response.error || 'Баланс успешно пополнен';
        moneyTransactions.setMessage(response.success, message);
    });
}

moneyTransactions.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => { 
        console.log(response);       
        if (response.success) {
            ProfileWidget.showProfile(response.data);           
        } 
        let message = response.error || 'Валюты успешно конвертированы';
        moneyTransactions.setMessage(response.success, message);
    });
}

moneyTransactions.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => { 
        if (response.success) {
            ProfileWidget.showProfile(response.data);         
        } 
        let message = response.error || 'Средства успешно переведены';
        moneyTransactions.setMessage(response.success, message);
    });
}

// Работа с избранным
let workingFavorites = new FavoritesWidget;

ApiConnector.getFavorites((response) => {
    if (response.success) {
        workingFavorites.clearTable();
        workingFavorites.fillTable(response.data);
        moneyTransactions.updateUsersList(response.data);
    }
});

workingFavorites.addUserCallback = function(data) {    
    ApiConnector.addUserToFavorites(data, (response) => {
        console.log(response);
        if (response.success) {
            workingFavorites.clearTable();
            workingFavorites.fillTable(response.data);
            moneyTransactions.updateUsersList(response.data);     
        } 
        let message = response.error || 'Пользователь успешно добавлен';
        workingFavorites.setMessage(response.success, message);
    });
}

workingFavorites.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        console.log(response);
        if (response.success) {
            workingFavorites.clearTable();
            workingFavorites.fillTable(response.data);
            moneyTransactions.updateUsersList(response.data);        
        } 
        let message = response.error || 'Пользователь успешно удалён';
        workingFavorites.setMessage(response.success, message);
    });
}