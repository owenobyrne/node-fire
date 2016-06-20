var requestify = require('requestify');
var sha256 = require('sha256');

var baseURL = "https://api.paywithfire.com/business";
var CLIENT_ID = "";
var CLIENT_KEY = "";
var REFRESH_TOKEN = "";
var ACCESS_TOKEN = "";

exports.initialize = function(clientId, clientKey, refreshToken) {
	CLIENT_ID = clientId;
	CLIENT_KEY = clientKey;
	REFRESH_TOKEN = refreshToken;

};

exports.login = function(next) {

	var nonce = new Date().getTime();

    var toHash = nonce + CLIENT_KEY;
    var secret = sha256(toHash);        
      
    var request = {
    		clientId: CLIENT_ID,
    		refreshToken: REFRESH_TOKEN,
    		nonce: nonce,
    		grantType: "AccessToken",
    		clientSecret: secret
    };
    
    requestify.request(baseURL + "/v1/apps/accesstokens", {
            method: "POST",
            body: request,
            dataType: "json"
    })
	.then(function(response) {
		var body = JSON.parse(response.body);
		ACCESS_TOKEN = body.accessToken;
		next(null, body);
	});
    
};  

exports.accounts = function(next) {
	requestify.request(baseURL + "/v1/accounts", {
		method: "GET",
		headers: { 
			'Authorization': 'Bearer ' + ACCESS_TOKEN
		},
	    dataType: "json"
	})
	.then(function(response) {
		var body = JSON.parse(response.body);
		next(null, body.accounts);
	});
};

exports.transactionsForAccount = function(account, paging, next) {
	requestify.request(baseURL + "/v1/accounts/" + account + "/transactions", {
		method: "GET",
		params: {
			limit: paging.limit,
			offset: paging.offset
		},
		headers: { 
			'Authorization': 'Bearer ' + ACCESS_TOKEN
		},
	    dataType: "json"
	})
	.then(function(response) {
		var body = JSON.parse(response.body);
		next(null, body);
	})
	.fail(function(response) {
		console.log(response);
	});
};

exports.filterTransactionsForAccount = function(account, keyword, dateRange, paging, next) {
	requestify.request(baseURL + "/v1/accounts/" + account + "/transactions/filter", {
		method: "GET",
		params: {
			limit: paging.limit,
			offset: paging.offset,
			dateRangeFrom: dateRange.from || 0,
			dateRangeTo: dateRange.to || new Date().getTime(),
			searchKeyword: keyword || ""
		},
		headers: { 
			'Authorization': 'Bearer ' + ACCESS_TOKEN
		},
	    dataType: "json"
	})
	.then(function(response) {
		var body = JSON.parse(response.body);
		next(null, body);
	})
	.fail(function(response) {
		console.log(response);
	});
};


