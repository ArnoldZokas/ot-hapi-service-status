# ot-hapi-service-status
> Service Status plugin for Hapi

[![Build Status](https://semaphoreci.com/api/v1/projects/cc93e0df-4124-4a48-914a-4a83e42c4aeb/386191/shields_badge.svg)](https://semaphoreci.com/ArnoldZokas/ot-hapi-service-status) [![Dependency Status](https://david-dm.org/ArnoldZokas/ot-hapi-service-status.svg)](https://david-dm.org/ArnoldZokas/ot-hapi-service-status) [![NPM version](https://badge.fury.io/js/ot-hapi-service-status.svg)](http://badge.fury.io/js/ot-hapi-service-status)

[![NPM](https://nodei.co/npm/ot-hapi-service-status.png?downloads=true&stars=true)](https://nodei.co/npm/ot-hapi-service-status)

## Overview
Defines `/service-status` endpoint:
```
GET /service-status
Host: yourhost.com

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
cache-control: no-cache

{
  status: "ok",
  version: "1.0.164",
  sha: "2c199e4e45ed09a84356412243e676998986b0e1",
  env: "prod",
  monitors: [
    {
      status: "healthy",
      name: "your custom monitor"
    }
  ]
}
```

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
        options: {
            metadata: {
                version: require('./package.json').version,
                env: process.env.NODE_ENV || 'local'
            },
            monitors: [
                function(req, reply, done) {
                    done(null, {
                        status: 'healthy', // status of 'healty' indicates monitor is healthy, any other value indicates monitor failure and will cause the top-level status to change to 'faulting'
                        name: 'monitor 1', // optional name, useful for differentiating between monitors
                        myField1: true,    // arbitraty fields, usefull for surfacing
                        myField2: false    // additional diagnostic information
                    });
                },
                function(req, reply, done) {
                    done(null, {
                        status: 'cannot connect to internal service',
                        name: 'monitor 2',
                        err: {}
                    });
                }
            ]        
        }
    }
], function(err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.start();
});
```

## Configuration
- **metadata** - (optional) a set of additional fields to inject into each service-status response
- **monitors** - a list of monitoring functions, with the following signature `function(req, reply, done)`
    - **req** - Hapi request object
    - **reply** - Hapi reply object
    - **done** - callback, with the following signature `function(err, data)`

## Release History
- **v1.0.4** (2016-04-07)
    - updated dependencies
- **v1.0.3** (2015-11-20)
    - updated dependencies
- **v1.0.2** (2015-07-13)
    - updated dependencies
- **v1.0.1** (2015-06-06)
    - housekeeping
- **v1.0.0** (2015-05-13)
    - housekeeping
- **v0.1.4** (2015-05-12)
    - improved compatibility with ot-hapi-request-metrics package
- **v0.1.3** (2015-05-12)
    - updated dependencies
- **v0.1.2** (2015-05-06)
    - updated dependencies
- **v0.1.1** (2015-04-27)
    - updated dependencies
- **v0.1.0** (2015-03-31)
    - initial release
