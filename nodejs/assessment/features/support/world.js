var zombie = require('zombie');
function World(callback) {
  this.browser = new zombie(); // this.browser will be available in step definitions

  this.visit = function (url, callback) {
    this.browser.visit(url, callback);
  };

  callback(); // tell Cucumber we're finished and to use 'this' as the world instance
}
module.exports.World = World;