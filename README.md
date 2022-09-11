Listen atomicassets NFT events on web framework for [Node.js](http://nodejs.org).

```js
const blockNumber = 0
const nodeEosEndpoint = "https://wax.greymass.com"
const whitelistPostApi = "http://127.0.0.1:3000/data" 
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

## People

The original author of this is [Atul Pal](https://github.com/Atulpal9045)




