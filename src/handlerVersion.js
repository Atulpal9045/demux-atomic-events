const { Api, JsonRpc, Serialize } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const fetch = require("isomorphic-fetch");
const {
  getTypesFromAbi,
  createInitialTypes,
  hexToUint8Array,
  SerialBuffer,
} = require("eosjs/dist/eosjs-serialize");

function parseTokenString(tokenString) {
  const [amountString, symbol] = tokenString.split(" ");
  const amount = parseFloat(amountString);
  return { amount, symbol };
}

async function updateTransferData(state, payload, blockInfo, context) {
  if (payload.transactionId) {
    let actionData = await getInlineFunctions(
      payload.transactionId,
      state.endpoint
    );
    state.data = actionData.data;
    state.action = actionData.action;
    state.indexState = blockInfo;
  }
  context.stateCopy = JSON.parse(JSON.stringify(payload.data)); // Deep copy state to de-reference
}

async function getInlineFunctions(trxId, endPoint) {
  const actions = await getTransactions(trxId, endPoint);
  return actions;
}

const updaters = [
  {
    actionType: "atomicassets::transfer",
    apply: updateTransferData,
  },
  {
    actionType: "atomicassets::mintasset",
    apply: updateTransferData,
  },
  {
    actionType: "atomicassets::burnasset",
    apply: updateTransferData,
  },
];

function logUpdate(payload, blockInfo, context) {
  console.info("State updated:\n", payload); //JSON.stringify(context.stateCopy, null, 2), )
}

const effects = [
  // {
  //   actionType: 'atomicassets::transfer',
  //   run: logUpdate,
  // },
];

const deferredEffects = [
  {
    actionType: "atomicassets::transfer",
    run: logUpdate,
  },
];

const handlerVersion = {
  versionName: "v1",
  updaters,
  effects,
};

module.exports = { handlerVersion };
async function getTransactions(trxId, endPoint) {
  try {
    const api = new Api({
      rpc: new JsonRpc(endPoint, { fetch }),
      signatureProvider: new JsSignatureProvider([]),
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
    const abi = await api.getAbi("atomicassets");

    const builtinTypes = createInitialTypes();
    const types = getTypesFromAbi(builtinTypes, abi);
    const transaction = await api.rpc.history_get_transaction(trxId);

    for (let action of transaction.traces) {
      let actionDetail = action.act;
      if (
        actionDetail.name == "logmint" ||
        actionDetail.name == "logburnasset" ||
        actionDetail.name == "logtransfer"
      ) {
        // console.log(acts.act);
        const hexData = actionDetail.hex_data;
        // console.log('hexdata', hexData)
        const parseData = hexToUint8Array(hexData);

        const buffer = new SerialBuffer({
          textDecoder: new TextDecoder(),
          textEncoder: new TextEncoder(),
        });
        // console.log('buffer', data)
        buffer.pushArray(parseData);

        const actionType = types.get(actionDetail.name);
        // console.log('buffer--data', transferType)

        const data = actionType.deserialize(buffer);
        return { data, action: actionDetail.name };
      }
    }
    return {};
  } catch (err) {
    console.log("error in getting ytansacton", err);
  }
}
