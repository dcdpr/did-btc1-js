import { DidBtcr2 } from "../../../src/did-btcr2.js";

const resolution = await DidBtcr2.resolve("did:btcr2:k1qqpkyr20hr2ugzcdctulmprrdkz5slj3an64l0x4encgc6kpfz7g5dsaaw53r");
console.log(resolution);