var CartView = Backbone.View.extend({
  template: App.templates.cart,
  events: {
    'click tr a': 'destroy'
  },

  destroy: function(e) {
    e.preventDefault();
    var $td = $(e.target).closest('tr'),
        idx = +$td.attr('data-id');
    this.collection.trigger('destroy', idx);
  },

  render: function() {
    this.setElement($('#cart')[0]);
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      quantity: this.collection.getQuantity(),
      total: this.collection.getTotal()
    }));
  },

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'cart_updated destroy', this.render);
  }
});