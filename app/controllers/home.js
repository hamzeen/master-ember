import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['filter'],
  localTime: new Date().toLocaleTimeString(),

  init: function() {
    this.updateTime(); // start time ticker.
  },

  updateTime: function() {
    var _this = this;

    // Update the time every second.
    Ember.run.later(function() {
        _this.set('localTime', new Date().toLocaleTimeString());
        _this.updateTime();
    }, 1000);
  },

  onFilterTextChange: function() {
    Ember.run.debounce(this, this.applyFilter, 0);
  }.observes('filterText'),

  applyFilter: function() {
    this.set('filter', this.get('filterText'));
    console.log('filter set: ' + this.get('filter'));
  },

  filteredResults: function() {
    var filter = this.get('filter');
    return this.get('model');

    /*return this.get('model').filter(function(item) {
      return item.attributes.city.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });*/
  }.property('filter'),
});
