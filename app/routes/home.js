import Ember from 'ember';

export default Ember.Route.extend({
  filterText: '',

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('filterText', this.get('filterText'));
  },

  queryParams: {
    filter: {
      refreshModel: true
    }
  },

  beforeModel: function(transition) {
    this.set('filterText', transition.queryParams.filter);
  },

  model: function(params) {
    var ep = 'http://localhost:4200/api/rentals';
    if(params.filter) {
      ep = 'http://localhost:4200/api/rentals/city='+params.filter;
    }

    var results = [];

    $.ajax({
      url: ep,
      type: 'GET',
      accepts: 'application/json',
      success: function(data) {
        if(data.rentals) {
          data.rentals.forEach(function(deal) {
            results.addObject(deal);
          });
        } else if(data.data === 'no records found'){
          console.log('No results found');
        } else {
          data.data.forEach(function(deal) {
            results.addObject(deal);
          });
        }
      },

      error: function() {
        console.log('DEBUG: GET Deals Failed');
      },async:false
    });
    return results;
  }

});
