'use strict';

var async = require('async'),
    Hoek  = require('hoek'),
    joi   = require('joi');

var all = function(collection, predicate) {
    for (var i = 0; i < collection.length; i++) {
        if (predicate(collection[i]) === false) {
            return false;
        }
    }
    return true;
};

exports.register = function (plugin, options, next) {
    var validation = joi.validate(options, require('./schema'));
    if(validation.error) {
        return next(validation.error);
    }

    plugin.route([
        {
            method: 'GET',
            path: '/service-status',
            handler: function (req, reply) {
                var monitors = [];
                options.monitors.forEach(function(monitor) {
                    monitors.push(function(done) {
                        monitor(req, reply, done);
                    });
                });

                async.parallel(monitors, function (err, results) {
                    var response = {
                        status: all(results, function (result) { return result.status === 'healthy'; }) ? 'ok' : 'faulting'
                    };
                    response = Hoek.applyToDefaults(response, options.metadata || {});
                    response.monitors = results;

                    reply(response)
                        .type('application/json')
                        .code(200);
                });
            },
            config: {
                auth: false,
                description: 'service-status',
                tags: ['non-cacheable']
            }
        }
    ]);

    next();
};