'use strict';

var joi = require('joi');

module.exports = {
    monitors: joi.array().required(),
    metadata: joi.object()
};
