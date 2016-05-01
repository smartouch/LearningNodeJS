/**
 * New node file
 */

var accounts = [
             {"username": "olivier", "password": "pwd", "uid":"1"},
             {"username": "valerie", "password": "pwd", "uid":"2"},
             {"username": "lize", "password": "pwd", "uid":"3"},
             {"username": "kaylie", "password": "pwd", "uid":"4"} ];

module.exports = 
{
  // This is the function which will be called in the main file, which is server.js
  // The parameters 'name' and 'surname' will be provided inside the function
  // when the function is called in the main file.
  // Example: concatenameNames('John,'Doe');
  getAccounts: function () 
  {
     return accounts;
  },

  getAccountID: function(username, password)
  {
	// Iterate over the list of accounts and try to find an entry matching the username
	for (var i in accounts) {
		if ((accounts[i].username === username) && (accounts[i].password === password)) {
				return accounts[i].uid;
		}
	}  
	return null;
  }
  
};

