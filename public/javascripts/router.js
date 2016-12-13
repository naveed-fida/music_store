var router = new (Backbone.Router.extend({
  routes: {
    'albums/new': 'newAlbum'
  },

  index: function() {
    App.indexView();
  },

  newAlbum: function() {
    App.newAlbum();
  },

  initialize: function() {
    this.route(/^\/?$/, 'index', this.index);
  }
}))();

Backbone.history.start({
  pushState: true
});

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
});