# node-fire



---------


How to use it?
---------------

````javascript

var fireAPI = require("fire");

fire.initialize("XXXX-XXXX-XXXX-XXXX");

// returns a list of addresses matching a term.
fire.XSXSXSX({searchTerm: "SW11 3LJ"}, function(err, data) {
	if (err) { console.log(err.description); return false; }
	console.log(data);
});

// Returns the full address details based on the Id.
fire.VSBDVBASD({id: "GBR|23926131"}, function(err, data) {
	if (err) { console.log(err.description); return false; }
	console.log(data);
});
````

Installation
============

Via [npm][]:

     $ npm install fire
	
Or to install as a submodule of your project

	$ git submodule add http://github.com/owenobyrne/node-fire.git fire
	$ git submodule update --init
	
[npm]: https://github.com/isaacs/npm

