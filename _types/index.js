'use strict';

var Joi = require('joi');

module.exports = {
  'string,null': Joi.string().allow(null),
  'object,null': Joi.object().allow(null),
};
