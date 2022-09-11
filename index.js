const { BaseActionWatcher } = require("demux");
const { NodeosActionReader } = require("demux-eos");
const { handlerVersion } = require("./src/handlerVersion");
const {
  ObjectActionHandler,
  getStateHistory,
} = require("./src/ObjectActionHandler");
const fs = require("fs");

const Watcher = (blockNumber, endPoint, maxStateHistoryLength, whitelist) => {
  fs.writeFileSync(
    "demux-atomic-config.json",
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

/* export all the Watcher, stateHistory functions */
module.exports = { Watcher, ObjectActionHandler, getStateHistory };
