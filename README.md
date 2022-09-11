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

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

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

  The quickest way to get started with demux-atomic-events is to check given [example](https://github.com/Atulpal9045/demux-atomic-events/example.js) to listen events on your server.


  Clone example the app:

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

The original author of Express is [Atul Pal](https://github.com/Atulpal9045)




