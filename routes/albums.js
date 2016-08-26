var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Albums = require(path.resolve(path.dirname(__dirname), 'my_modules/albums.js'))

module.exports = function(router) {
  router.get('/albums/new', function(req, res, next) {
    res.render('new');
  });

  router.post('/albums', function(req, res) {
    var album = req.body;
    var albums = Albums.get();

    album.id = Albums.getLastID() + 1;
    albums.push(album);
    Albums.set(albums);
    res.json(album);
  });

  router.put('/albums', function(req, res) {
    var upd_album = req.body,
        albums = Albums.get(),
        old_album = _(albums).findWhere({id: body.id});

    _(old_album).extend(upd_album);
    Albums.set(albums);
    res.json(old_album);
  });

  router.delete('/albums', function() {
    var id = req.body.id;
    var albums = _(Albums.get()).reject(function(album) {
      return album.id = id;
    });

    Albums.set(albums);
    res.status(200).end();
  })
};