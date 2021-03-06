var _ = require('underscore'),
  keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Users
 * =====
 */

var Fence = new keystone.List('Geofence');

Fence.add({
  name: { type: Types.Text, required: true, index: true },
  retailer: { type: Types.Text, initial: true, required: true, index: true },
  isInactive: { type: Types.Boolean, initial: true, required: false },
  isTeaser: { type: Types.Boolean, initial: true, required: false },
  latitude: { type: Types.Number, initial: true, required: true},
  longitude: { type: Types.Number, initial: true, required: true},
  discountPct: { type: Types.Number, initial: true, required: true, index: true }
});

/**
 * Registration
 */

Fence.defaultColumns = 'name, retailer, latitude, longitude, discountPct';
Fence.register();
