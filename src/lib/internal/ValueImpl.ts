import {PseudonymImpl} from "./PseudonymImpl";
import {ECPoint} from "./ECPoint";
import {Domain} from "../Domain";
import {Pseudonym} from "../Pseudonym";
import {PseudonymInTransit} from "../PseudonymInTransit";
import {Value} from "../Value";
import {EHealthProblem} from "../EHealthProblem";
import {Buffer} from 'buffer';

export class ValueImpl extends PseudonymImpl implements Value {

  constructor(ecPoint: ECPoint, domain: Domain) {
    super(ecPoint, domain);
  }

  asBytes(): Uint8Array {
    const x = this._ecPoint.x.toArrayLike(Buffer, 'be');
    const valueLengthPos = x.length - this._domain.bufferSize - 1;
    const valueLength = x[valueLengthPos];
    const startPosition = valueLengthPos - valueLength;
    const target = Buffer.alloc(valueLength);
    x.copy(target, 0, startPosition, startPosition + valueLength);
    return new Uint8Array(target);
  }

  asString(): string {

    return new TextDecoder().decode(this.asBytes());
  }

  asPseudonym(): Pseudonym {
    return this;
  }

  pseudonymize(): Promise<PseudonymInTransit | EHealthProblem> {
    const random = this._domain.createRandom();
    const blindedValue = new PseudonymImpl(this._ecPoint.multiply(random), this._domain);
    const payload = this._domain.createPayloadString(blindedValue);

    return this._domain.pseudonymisationClient.pseudonymize(this._domain.key, payload)
    .then(rawResponse => this._domain.pseudonymInTransitFactory.fromRawResponse(rawResponse, random));
  }

}