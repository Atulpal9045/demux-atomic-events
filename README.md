Listen atomicassets NFT events on web framework for [Node.js](http://nodejs.org).

```js
const { Watcher } = require("demux-atomic-events");

const blockNumber = 0
const nodeEosEndpoint = process.env.NODE_EOS_ENDPOINT
const whitelistPostApi = process.env.APPLICATION_POST_API
const maxStateHistoryLength = 300

Watcher(
  blockNumber, 
  nodeEosEndpoint,
  300, 
  whitelistPostApi
);
```

## Installation

```console
$ npm install demux-atomic-events
```

## Features

  * Listening Antelope blockchain based chain atomicassets NFT events
  * Using EOS/demax-js for listening on chain events
  * Callback api call to every event listen 

## Docs & Community

  * [demux-js](https://github.com/EOSIO/demux-js) original documentation for demux

## Example

[example](https://github.com/Atulpal9045/demux-atomic-events/example.js) to listen events on your server.


clone above example:

```console
$ git clone https://github.com/Atulpal9045/demux-atomic-events
$ cd /demux-atomic-events/examples
```

  Install dependencies:

```console
$ npm install
```

  Start the server:

```console
$ npm start
```

  View the website at: http://localhost:3000

After running it will generate cofig file in the root directory - 
```
demux-atomic-config.json
```

## People

The original author of this is [Atul Pal](https://github.com/Atulpal9045)




