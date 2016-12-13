var IndexView = Backbone.View.extend({
  template: App.templates.index,
  attributes: {
    id: 'index'
  },

  events: {
    'click #new': 'addAlbum'
  },

  addAlbum: function(e) {
    e.preventDefault();
    this.trigger("add_album");
  },

  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },

  initialize: function() {
    this.render();
  }
})