const { Watcher } = require("./src/watcher");
const {
  ObjectActionHandler,
  getStateHistory,
} = require("./src/ObjectActionHandler");

/* add watcher to listen all events */
module.exports = { Watcher };

/* handle the event's state on each event listen */
module.exports = { ObjectActionHandler };

/* Getting whole stateHistory for your project */
module.exports = { getStateHistory };
