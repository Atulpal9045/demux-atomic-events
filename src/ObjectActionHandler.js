const { default: axios } = require("axios");
const { AbstractActionHandler, Block, HandlerVersion } = require("demux");
const config = require("../demux-atomic-config.json");
let state = {
  endpoint: config.endPoint,
  indexState: {
    blockNumber: 0,
    blockHash: "",
    isReplay: false,
    handlerVersionName: "v1",
  },
  action: "",
  data: {},
};

const stateHistory = {};
const stateHistoryMaxLength = config.maxStateHistoryLength;

class ObjectActionHandler extends AbstractActionHandler {
  async handleWithState(handle) {
    await handle(state);
    const { blockNumber } = state.indexState;
    stateHistory[blockNumber] = JSON.parse(JSON.stringify(state));
    if (
      blockNumber > stateHistoryMaxLength &&
      stateHistory[blockNumber - stateHistoryMaxLength]
    ) {
      delete stateHistory[blockNumber - stateHistoryMaxLength];
    }
  }

  async loadIndexState() {
    return state.indexState;
  }

  async updateIndexState(stateObj, block, isReplay, handlerVersionName) {
    stateObj.indexState.blockNumber = block.blockInfo.blockNumber;
    stateObj.indexState.blockHash = block.blockInfo.blockHash;
    stateObj.indexState.isReplay = isReplay;
    stateObj.indexState.handlerVersionName = handlerVersionName;
    axios.post(config.whitelist, stateObj);
  }

  async rollbackTo(blockNumber) {
    const latestBlockNumber = state.indexState.blockNumber;
    const toDelete = [...Array(latestBlockNumber - blockNumber).keys()].map(
      (n) => n + blockNumber + 1
    );
    for (const n of toDelete) {
      delete stateHistory[n];
    }
    state = stateHistory[blockNumber];
  }
  async setup() {}
}

const getStateHistory = () => {
  return stateHistory;
};
module.exports = { ObjectActionHandler, getStateHistory };
