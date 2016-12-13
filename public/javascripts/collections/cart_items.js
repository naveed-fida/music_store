var CartItems = Backbone.Collection.extend({
  addItem: function(item) {
    var existing = this.get(item.get('id'));

    if (existing) {
      existing.set('quantity', existing.get('quantity') + 1);
    } else {
      existing = item.clone();      
      existing.set('quantity', 1);
      this.add(existing);
    }

    this.update();
    this.trigger('cart_updated');
  },

  destroy: function(idx) {
    this.remove(idx);
    this.update();
  },

  update: function() {
    this.setTotal().setQuantity().updateStorage();
  },

  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);

    return this;
  },

  getQuantity: function() { return this.quantity; },

  setTotal: function() {
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.price * b.quantity;
    }, 0);

    return this;
  },

  getTotal: function() { return this.total; },

  updateStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.toJSON()));
  },

  readStorage: function() {
    var stored_cart = JSON.parse(localStorage.getItem('cart'));
    this.reset(stored_cart);
    this.setTotal().setQuantity();
  },

  initialize: function() {
    this.readStorage();
    this.on('destroy', this.destroy);
  }
});