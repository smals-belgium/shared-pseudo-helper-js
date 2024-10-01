import {ec} from "elliptic";
import {v4 as uuidv4} from 'uuid';
import {PseudonymisationClient} from "../PseudonymisationClient";
import BN from "bn.js";
import {Pseudonym} from "../Pseudonym";
import {PseudonymPayload} from "./PseudonymPayload";
import {Domain} from "../Domain";
import {PseudonymFactoryImpl} from "./PseudonymFactoryImpl";
import {PseudonymInTransitFactoryImpl} from "./PseudonymInTransitFactoryImpl";
import {ValueFactoryImpl} from "./ValueFactoryImpl";

export class DomainImpl implements Domain {

  private readonly _key: string;
  private readonly _crv: string;
  private readonly _ec: ec;
  private readonly _audience: string;
  private readonly _bufferSize: number;
  private readonly _pseudonymisationClient: PseudonymisationClient;
  private readonly _valueFactory: ValueFactoryImpl;
  private readonly _pseudonymFactory: PseudonymFactoryImpl;
  private readonly _pseudonymInTransitFactory: PseudonymInTransitFactoryImpl;


  constructor(key: string,
              crv: string,
              ec: ec,
              audience: string,
              bufferSize: number,
              pseudonymisationClient: PseudonymisationClient) {
    this._key = key;
    this._crv = crv;
    this._ec = ec;
    this._audience = audience;
    this._bufferSize = bufferSize;
    this._pseudonymisationClient = pseudonymisationClient;
    this._valueFactory = new ValueFactoryImpl(this);
    this._pseudonymFactory = new PseudonymFactoryImpl(this);
    this._pseudonymInTransitFactory = new PseudonymInTransitFactoryImpl(this);
  }

  createRandom(): BN {
    const minValue = new BN(1);
    const maxValue: BN = this._ec.curve.p;
    const bitLength = maxValue.toString(2).length;

    const byteLength = Math.ceil((bitLength / 8));

    const buffer = new Uint8Array(byteLength);

    crypto.getRandomValues(buffer);

    let randomValue = new BN(0);
    for (let i = 0; i < byteLength; i++) {
      randomValue = randomValue.shln(8).or(new BN(buffer[i]));
    }

    return randomValue.mod(maxValue).add(minValue);
  }

  computeY(xCoordinate: BN): BN {
    const a = this._ec.curve.a;
    const b = this._ec.curve.b;
    const x = xCoordinate.toRed(this._ec.curve.red);
    const y2 = (x.redSqr().redIAdd(a)).redMul(x).redIAdd(b);
    const yCoordinate = y2.redSqrt();
    const point = this._ec.curve.point(xCoordinate, yCoordinate);
    if (this._ec.curve.validate(point)) {
      return point.getY();
    } else {
      return undefined;
    }
  }

  createPayloadString(pseudonym: Pseudonym, transitInfo?: string): string {

    return JSON.stringify(this.createPayload(pseudonym, transitInfo));
  }

  createPayload(pseudonym: Pseudonym, transitInfo?: string): PseudonymPayload {
    const pseudonymPayload = new PseudonymPayload();
    pseudonymPayload.id = uuidv4();
    pseudonymPayload.crv = this._crv;
    pseudonymPayload.x = pseudonym.x();
    pseudonymPayload.y = pseudonym.y();
    if (transitInfo != null) {
      pseudonymPayload.transitInfo = transitInfo;
    }

    return pseudonymPayload;
  }

  get crv(): string {
    return this._crv;
  }

  get key(): string {
    return this._key;
  }

  get ec(): ec {
    return this._ec;
  }

  get audience(): string {
    return this._audience;
  }

  get bufferSize(): number {
    return this._bufferSize;
  }

  get pseudonymisationClient(): PseudonymisationClient {
    return this._pseudonymisationClient;
  }

  get valueFactory(): ValueFactoryImpl {
    return this._valueFactory;
  }

  get pseudonymFactory(): PseudonymFactoryImpl {
    return this._pseudonymFactory;
  }

  get pseudonymInTransitFactory(): PseudonymInTransitFactoryImpl {
    return this._pseudonymInTransitFactory;
  }
}