var fire = require("./../index");
var credentials = require("./config").credentials;

fire.initialize(credentials.clientId, credentials.clientKey, credentials.refreshToken);

fire.login(function(err, app) {
	fire.accounts(function(err, accounts) {
		//console.log(accounts);
		
//		fire.transactionsForAccount(accounts[0].ican, { offset: 0, limit: 25 }, function(err, transactions) {
//			console.log(transactions);
//		});
//		
		fire.filterTransactionsForAccount(
				accounts[0].ican, 
				"",
				{ from: 1459465200000, to: 1466463599999 },
				{ offset: 0, limit: 25 }, 
				function(err, transactions) {
			
					console.log(transactions);
		});

		fire.filterTransactionsForAccount(
				accounts[0].ican, 
				"Testing",
				{},
				{ offset: 0, limit: 25 }, 
				function(err, transactions) {
			
					console.log(transactions);
		});

	});
});
