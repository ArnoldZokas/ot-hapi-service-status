'use strict';

var expect = require('expect.js'),
    plugin = require('../index.js');

describe('plugin option validation', function() {
    describe('given null monitors', function() {
        it('should return error', function () {
            plugin.register(null, { monitors: null }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "monitors" fails because ["monitors" must be an array]');
            });
        });
    });

    describe('given invalid monitors', function() {
        it('should return error', function () {
            plugin.register(null, { monitors: '' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "monitors" fails because ["monitors" must be an array]');
            });
        });
    });

    describe('given invalid metadata', function() {
        it('should return error', function () {
            plugin.register(null, { monitors: [function() {}], metadata: '' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "metadata" fails because ["metadata" must be an object]');
            });
        });
    });
});