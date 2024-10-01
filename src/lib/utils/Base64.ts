import BN from 'bn.js';
import {Buffer} from 'buffer';

export class Base64 {

  static encodeFromBN(bn: BN): string {
    const bytes = bn.toArrayLike(Buffer, 'be', 66);
    return Buffer.from(bytes).toString('base64');
  }

  static decodeToBN(base64: string): BN {
    const bytes = Buffer.from(base64, 'base64').valueOf();
    return new BN(bytes);
  }

  static urlEncode(bytes: Uint8Array): string {
    let b64 = Buffer.from(bytes).toString('base64');
    return b64.split('=')[0].replaceAll('+', '-').replaceAll('/', '_');
  }

  static urlDecode(base64: String): Uint8Array {
    base64 = base64.replaceAll('-', '+').replaceAll('_', '/');
    return Buffer.from(base64, 'base64').valueOf();
  }
}