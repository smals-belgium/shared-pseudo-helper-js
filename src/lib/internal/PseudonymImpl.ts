import {PointImpl} from "./PointImpl";
import {ECPoint} from "./ECPoint";
import {Domain} from "../Domain";
import {Base64} from "../utils/Base64";
import BN from "bn.js";
import {Pseudonym} from "../Pseudonym";
import {Buffer} from 'buffer';

export class PseudonymImpl extends PointImpl implements Pseudonym {

  constructor(ecPoint: ECPoint, domain: Domain) {
    super(ecPoint, domain);
  }

  x(): string {
    return Base64.encodeFromBN(this._ecPoint.x);
  }

  y(): string {
    return Base64.encodeFromBN(this._ecPoint.y);
  }

  sec1(): string {

    let xBytes = this._ecPoint.x.toArrayLike(Buffer, 'be');
    let yBytes = this._ecPoint.y.toArrayLike(Buffer, 'be');

    const out = new Uint8Array(1 + 66 + 66);

    out[0] = 4;
    out.set(xBytes, 1 + 66 - xBytes.length);
    out.set(yBytes, 1 + 66 + 66 - yBytes.length);

    return Base64.urlEncode(out);
  }

  sec1Compressed(): string {

    let xBytes = this._ecPoint.x.toArrayLike(Buffer, 'be');
    let yBytes = this._ecPoint.y.toArrayLike(Buffer, 'be');

    const out = new Uint8Array(1 + 66);

    out[0] = 2 + (yBytes[yBytes.length - 1] & 1);
    out.set(xBytes, 1 + 66 - xBytes.length);

    return Base64.urlEncode(out);
  }

  multiply(scalar: BN): PseudonymImpl {
    return new PseudonymImpl(this._ecPoint.multiply(scalar), this.domain);
  }

  multiplyByModInverse(scalar: BN): PseudonymImpl {
    return this.multiply(scalar.invm(this._ecPoint.ec.curve.n));
  }
}