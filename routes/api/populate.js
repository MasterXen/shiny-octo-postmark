var _ = require('underscore'),
  request = require('request'),
  keystone = require('keystone');

var Fence = keystone.list('Geofence');

var MASHERY_API_KEY = "3kvmawf6w6z9y4zwqdzd63rm";
var MASHERY_BBY_STORE_API_ENDPOINT = "http://api.remix.bestbuy.com/v1/stores(region='TX')?format=json&apiKey=" + MASHERY_API_KEY + "&page=";


exports = module.exports = function(req, res) {

  var PAGE = 1;

  while (PAGE < 6) {
    console.warn("STARTING PAGE " + PAGE);
    request(MASHERY_BBY_STORE_API_ENDPOINT + PAGE, transformStoresToModels);
    PAGE++;
  }

  // Create a FIRST geofence that has a harcoded lat/long for testing
  var h = new Fence.model({
    name: "Macy's - North Central Mall",
    retailer: "Macy's",
    isInactive: false,
    latitude: '30.3557437',
    longitude: '-97.7239443',
    discountPct: Math.floor(Math.random()*(30-10+1)+10)
  });

  h.save(function (error) {
    if (error) throw new Error("Unable to save: " + error);
  });

  // Create a SECOND geofence that has a harcoded lat/long for testing
  var j = new Fence.model({
    name: "Macy's - Bee Cave",
    retailer: "Macy's",
    isInactive: false,
    latitude: '30.3557437',
    longitude: '-97.7129443',
    discountPct: Math.floor(Math.random()*(30-10+1)+10)
  });

  j.save(function (error) {
    if (error) throw new Error("Unable to save: " + error);
  });

  res.send("Ok");

  function transformStoresToModels(error, response, body) {
      if (error || response.statusCode != 200) {
        console.error(response.statusCode + " - HTTP Exception (PAGE#" + PAGE + ")");
      }

      results = JSON.parse(body);

      if (results == null || results.stores == null) {
        throw new Error("Unable to fetch store details (PAGE#" + PAGE + ")");
      }

      _.each(results.stores, function(store) {

        var o = new Fence.model({
          name: "Macy's - " + (store.name).replace('Best Buy Mobile - ', ''),
          retailer: "Macy's",
          storeId: store.storeId,
          isInactive: false,
          latitude: store.lat,
          longitude: store.lng,
          country: store.country,
          address: store.address,
          postalCode: store.postalCode,
          phone: store.phone,
          discountPct: Math.floor(Math.random()*(30-10+1)+10)
        });

        o.save(function (error) {
          if (error) throw new Error("Unable to save: " + error);
        });

      });
  }
};
