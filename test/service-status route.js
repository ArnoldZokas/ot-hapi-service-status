'use strict';

var diff   = require('deep-diff'),
    expect = require('expect.js'),
    plugin = require('../index.js');

describe('service-status route', function () {
    describe('given 2 healthy monitors', function () {
        var contentType,
            payload,
            statusCode;

        before(function (done) {
            var server = {
                route: function (routes) {
                    var req = {};
                    var reply = function (value) {
                        payload = value;
                        return {
                            type: function (type) {
                                contentType = type;
                                return {
                                    code: function (code) { statusCode = code; }
                                };
                            }
                        };
                    };

                    routes[0].handler(req, reply);
                }
            };

            plugin.register(server, {
                metadata: {
                    test: true
                },
                monitors: [
                    function (req, reply, next) {
                        next(null, {
                            status: 'healthy'
                        });
                    },
                    function (req, reply, next) {
                        next(null, {
                            status: 'healthy'
                        });
                    }
                ]
            }, done);
        });

        it('should return status code 200', function () {
            expect(statusCode).to.equal(200);
        });

        it('should return content-type application/json', function () {
            expect(contentType).to.equal('application/json');
        });

        it('should return payload with overall status ok', function () {
            expect(diff(payload, {
                status: 'ok',
                test: true,
                monitors: [
                    { status: 'healthy' },
                    { status: 'healthy' }
                ]
            })).to.equal(undefined);
        });
    });

    describe('given 1 healthy, 1 failing monitor', function () {
        var contentType,
            payload,
            statusCode;

        before(function (done) {
            var server = {
                route: function (routes) {
                    var req = {};
                    var reply = function (value) {
                        payload = value;
                        return {
                            type: function (type) {
                                contentType = type;
                                return {
                                    code: function (code) { statusCode = code; }
                                };
                            }
                        };
                    };

                    routes[0].handler(req, reply);
                }
            };

            plugin.register(server, {
                metadata: {
                    test: true
                },
                monitors: [
                    function (req, reply, next) {
                        next(null, {
                            status: 'healthy'
                        });
                    },
                    function (req, reply, next) {
                        next(null, {
                            status: 'failing'
                        });
                    }
                ]
            }, done);
        });

        it('should return status code 200', function () {
            expect(statusCode).to.equal(200);
        });

        it('should return content-type application/json', function () {
            expect(contentType).to.equal('application/json');
        });

        it('should return payload with overall status faulting', function () {
            expect(diff(payload, {
                status: 'faulting',
                test: true,
                monitors: [
                    { status: 'healthy' },
                    { status: 'failing' }
                ]
            })).to.equal(undefined);
        });
    });
});
