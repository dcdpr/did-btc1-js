import { SchnorrKeyPair } from '@did-btc1/keypair';
import { Btc1Identifier } from '../../../method/src/index.js';
import { SchnorrMultikey } from '../../src/index.js';

const securedDocument = {
  '@context' : [
    'https://w3id.org/security/v2',
    'https://w3id.org/zcap/v1',
    'https://w3id.org/json-ld-patch/v1'
  ],
  patch : [
    {
      op    : 'add',
      path  : '/service/3',
      value : {
        id              : 'did:btc1:k1qgpzs6takyvuhv3dy8epaqhwee6eamxttprpn4k48ft4xyvw5sp3mvqqavunt#service-0',
        type            : 'SingletonBeacon',
        serviceEndpoint : 'bitcoin:bcrt1p8x86wve7hzfanwyh9dlz8vn0g0gk79ws3cezp575zjphdg9yje6qc9ty2s'
      }
    }
  ],
  sourceHash      : 'CZUjMz1QEq5byF8YqTrvynjaZfHD1Btcwfjm2egv8vE7',
  targetHash      : 'CC8r8FCvwLN4ENSe66GYnMttJ5bhihdZhimAypSBrW78',
  targetVersionId : 2,
  proof           : {
    type               : 'DataIntegrityProof',
    cryptosuite        : 'bip340-jcs-2025',
    verificationMethod : 'did:btc1:k1qgpzs6takyvuhv3dy8epaqhwee6eamxttprpn4k48ft4xyvw5sp3mvqqavunt#initialKey',
    proofPurpose       : 'capabilityInvocation',
    capability         : 'urn:zcap:root:did%3Abtc1%3Ak1qgpzs6takyvuhv3dy8epaqhwee6eamxttprpn4k48ft4xyvw5sp3mvqqavunt',
    capabilityAction   : 'Write',
    '@context'           : [
      'https://w3id.org/security/v2',
      'https://w3id.org/zcap/v1',
      'https://w3id.org/json-ld-patch/v1'
    ],
    proofValue : 'z26AjeGdvzhfdjuMVXfrXtF36GL6xsZ49khdr2HKobbeS8kcm9XHf9rMXGUjteKzAMAQECTTZhA54VkSfeipwafVv'
  }
};

const id = '#initialKey';
const controller = 'did:btc1:k1qgpzs6takyvuhv3dy8epaqhwee6eamxttprpn4k48ft4xyvw5sp3mvqqavunt';
const components = Btc1Identifier.decode(controller);
console.log('components:', components);
const keys = new SchnorrKeyPair({ publicKey: components.genesisBytes });
const diProof = Multikey.initialize({ id, controller, keyPair })
  .toCryptosuite('bip340-jcs-2025')
  .toDataIntegrityProof();
const document = await JSON.canonicalization.canonicalize(securedDocument);
const verifiedProof = await diProof.verifyProof({ document, expectedPurpose: 'capabilityInvocation' });
console.log('verifiedProof', verifiedProof);