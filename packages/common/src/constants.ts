export const ID_PLACEHOLDER_VALUE = 'did:btc1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
export const OP_RETURN = 0x6a;
export const OP_PUSH32 = 0x20;
export const VALID_HRP = ['k', 'x'];
export const MULTIBASE_URI_PREFIX = 'urn:mb:';
export const INITIAL_BLOCK_REWARD = 50;
export const HALVING_INTERVAL = 150;
export const COINBASE_MATURITY_DELAY = 100;
export const POLAR_BOB_CLIENT_CONFIG = {
  username           : 'polaruser',
  password           : 'polarpass',
  host               : 'http://127.0.0.1:18443',
  allowDefaultWallet : true,
  version            : '28.1.0'
};
export const POLAR_ALICE_CLIENT_CONFIG = {
  username           : 'polaruser',
  password           : 'polarpass',
  host               : 'http://127.0.0.1:18444',
  allowDefaultWallet : true,
  version            : '28.1.0'
};
export const DEFAULT_REST_CONFIG = { host: 'http://localhost:3000' };
export const DEFAULT_RPC_CONFIG = POLAR_BOB_CLIENT_CONFIG;
export const DEFAULT_BLOCK_CONFIRMATIONS = 7;

export const W3C_DID_V1 = 'https://www.w3.org/ns/did/v1';
export const W3C_DID_V1_1 =  'https://www.w3.org/TR/did-1.1';
export const W3C_DATA_INTEGRITY_V1 = 'https://w3id.org/security/data-integrity/v1';
export const W3C_DATA_INTEGRITY_V2 = 'https://w3id.org/security/data-integrity/v2';
export const W3C_SECURITY_V2 = 'https://w3id.org/security/v2';
export const BTC1_METHOD_CONTEXT = 'https://did-btc1/TBD/context';
export const BTC1_DID_DOCUMENT_V1 = 'https://jintekc.github.io/did-btc1-js/ns/did-document/v1';
export const W3C_ZCAP_V1 = 'https://w3id.org/zcap/v1';
export const W3C_JSONLD_PATCH_V1 = 'https://w3id.org/json-ld-patch/v1';
export const W3C_MULTIKEY_V1 = 'https://w3id.org/security/multikey/v1';
export const W3C_DID_RESOLUTION_V1 = 'https://w3id.org/did-resolution/v1';
export const CONTEXT_URL_MAP = {
  w3c : {
    did           : {
      v1   : 'https://www.w3.org/ns/did/v1',
      v1_1 : 'https://www.w3.org/TR/did-1.1',
    },
    didresolution : {
      v1 : 'https://w3id.org/did-resolution/v1',
    },
    security : {
      v2 : 'https://w3id.org/security/v2',
    },
    dataintegrity : {
      v1 : 'https://w3id.org/security/data-integrity/v1',
      v2 : 'https://w3id.org/security/data-integrity/v2',
    },
    zcap          : {
      v1 : 'https://w3id.org/zcap/v1',
    },
    jsonldpatch   : {
      v1 : 'https://w3id.org/json-ld-patch/v1',
    },
    multikey      : {
      v1 : 'https://w3id.org/security/multikey/v1',
    },
  },
  btc1 : {
    diddocument : {
      v1 : 'https://dcdpr.github.io/did-btc1-js/ns/did-document/v1',
    },
    method : {
      v1 : 'https://did-btc1/TBD/context'
    },
  },

};

export const BTC1_DID_DOCUMENT_CONTEXT = [
  CONTEXT_URL_MAP.w3c.did.v1_1,
  CONTEXT_URL_MAP.btc1.method.v1,
];

export const BTC1_MULTIKEY_CONTEXT = [
  CONTEXT_URL_MAP.w3c.did.v1,
  CONTEXT_URL_MAP.w3c.multikey.v1
];

export const BTC1_DID_UPDATE_PAYLOAD_CONTEXT = [
  CONTEXT_URL_MAP.w3c.security.v2,
  CONTEXT_URL_MAP.w3c.zcap.v1,
  CONTEXT_URL_MAP.w3c.jsonldpatch.v1,
];