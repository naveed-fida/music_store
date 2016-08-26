var fs = require('fs');
var path = require('path');

module.exports =  (function() {
  var file_path = path.resolve(path.dirname(__dirname), 'data/albums.json'),
      albums = JSON.parse(fs.readFileSync(file_path, 'utf8'));

  function writeAlbums(data) {
    fs.writeFileSync(file_path, JSON.stringify(data), 'utf8');
  }

  var Albums = {
    set: function(data) {
      albums = {
        last_id: this.getLastID() + 1,
        data: data
      }

      writeAlbums(albums);
    },

    get: function() {
      return albums.data;
    },

    getLastID: function() {
      return albums.last_id;
    }
  }
  return Albums;
})();