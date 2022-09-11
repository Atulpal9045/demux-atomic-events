const { BaseActionWatcher } = require("demux");
const { NodeosActionReader } = require("demux-eos");
const { handlerVersion } = require("./handlerVersion");
const { ObjectActionHandler } = require("./ObjectActionHandler");
const fs = require("fs");

const Watcher = (blockNumber, endPoint, maxStateHistoryLength, whitelist) => {
  //setting config
  fs.writeFileSync(
    "Config.json",
    JSON.stringify({ blockNumber, endPoint, maxStateHistoryLength, whitelist })
  );
  const actionHandler = new ObjectActionHandler([handlerVersion]);
  const actionReader = new NodeosActionReader({
    startAtBlock: blockNumber,
    onlyIrreversible: false,
    nodeosEndpoint: endPoint,
  });
  const actionWatcher = new BaseActionWatcher(actionReader, actionHandler, 125);
  actionWatcher.watch();
};

module.exports = { Watcher };
