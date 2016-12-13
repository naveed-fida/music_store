var App = {
  templates: JST,
  $el: $('main'),

  indexView: function() {
    this.index_view = new IndexView();
    this.renderAlbums();
    this.createCart();
    this.bindEvents();
  },

  renderAlbums: function() {
    this.albums.forEach(this.renderAlbumView);
  },

  newAlbum: function() {
    new NewAlbumView();
    this.createCart();
  },

  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart
    });
  },

  renderAlbumView: function(album) {
    new AlbumView({
      model: album
    });
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.index_view, "add_album", this.newAlbum);
    this.on('add_to_cart', this.cart.addItem.bind(this.cart));
  }
};

Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
})