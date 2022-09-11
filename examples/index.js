/**
 * We are creating this example file to listen the atomic-assets log events using demux.
 * For listen the live event you have to whitelist your api endpoint to get the values in request.
 *
 * In this example we are setting up a express to whitelist the post api to get event data.
 *
 * 1. install express setup this project
 * 2. create a server and post api where you want to listen all the atomic-assets events
 * 3. you have to create a watcher to watch for your ip to atomicassets contract on Antelope.io based chains.
 * 4. After listening events all the block and event info will be get from request in that api.
 * 5. Add demux-atomic-config file into gitignore file before pushing to github.
 */

const { Watcher, getStateHistory } = require("demux-atomic-events");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/*", function (req, res) {
  res.send("Listening express server!!");
});

/* express server to listen event for this post */

app.post("/data", function (req, res) {
  // use this data to store all event informations
  console.log(req.body);
});

app.listen(3000);

/* create watcher instance to start listing */

Watcher(
  // example block number to listen
  0,
  // wax mainnet endpoint to listen
  process.env.NODE_EOS_ENDPOINT,
  // stateHistory Length to set
  300,
  // api whitelist to get information
  process.env.APPLICATION_POST_API
);

/* For get all the event history data for your project */

const history = getStateHistory();

console.log("history", history);
