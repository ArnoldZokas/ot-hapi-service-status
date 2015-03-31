# ot-hapi-service-status
> Service Status plugin for Hapi

[![Build Status](https://semaphoreci.com/api/v1/projects/cc93e0df-4124-4a48-914a-4a83e42c4aeb/386191/badge.svg)](https://semaphoreci.com/ArnoldZokas/ot-hapi-service-status)[![Dependency Status](https://david-dm.org/ArnoldZokas/ot-hapi-service-status.svg)](https://david-dm.org/ArnoldZokas/ot-hapi-service-status) [![NPM version](https://badge.fury.io/js/ot-hapi-service-status.svg)](http://badge.fury.io/js/ot-hapi-service-status)

[![NPM](https://nodei.co/npm/ot-hapi-service-status.png?downloads=true&stars=true)](https://nodei.co/npm/ot-hapi-service-status)

## Usage
```
$ npm i ot-hapi-service-status --save
```

```
var server = new (require('hapi').Server)();
server.connection({ port: 3000 });

server.register([
    {
        register: require('ot-hapi-service-status'),
        metadata: {
            version: require('./package.json').version,
            env: process.env.NODE_ENV || 'local'
        },
        monitors: [
            function(req, reply, done) {
                // check mongodb is reachable
                TODO
            },
            function(req, reply, done) {
                // check redis is reachable
                TODO
            }
        ]
    }
], function (err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.start();
});
```

## Configuration
- **monitors** -
- **metadata** - (optional)

## Release History
- **v0.1.0** (2015-xx-xx)
 - initial release
